const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const PUBLIC = path.join(ROOT, "public", "kostimi");
const OUTPUT = path.join(ROOT, "data", "costumes.ts");

const extensions = [".jpg", ".jpeg", ".png", ".webp"];

let costumes = [];

function prettify(name) {
  return name
    .replace(/\.[^/.]+$/, "")
    .replace(/-/g, " ")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

function scan(folder, category = "") {
  const files = fs.readdirSync(folder);

  files.forEach((file) => {
    const full = path.join(folder, file);

    if (fs.statSync(full).isDirectory()) {
      scan(full, file.toLowerCase());
      return;
    }

    const ext = path.extname(file).toLowerCase();

    if (!extensions.includes(ext)) return;

    const filename = path.basename(file, ext);

    costumes.push({
      id: filename.toLowerCase().replace(/\s/g, "-"),
      category,
      title: prettify(filename),
      image: full
        .replace(path.join(ROOT, "public"), "")
        .replace(/\\/g, "/"),
      price: "25 € / līdz 3 diennaktīm",
      size: "",
    });
  });
}

scan(PUBLIC);

costumes.sort((a, b) => a.title.localeCompare(b.title));

const file = `export interface Costume {
  id: string;
  category: string;
  title: string;
  image: string;
  price: string;
  size: string;
}

export const costumes: Costume[] = ${JSON.stringify(costumes, null, 2)};
`;

fs.writeFileSync(OUTPUT, file);

console.log("");
console.log("====================================");
console.log("✔ costumes.ts veiksmīgi izveidots");
console.log("====================================");
console.log("Kopā kostīmi:", costumes.length);
console.log("");