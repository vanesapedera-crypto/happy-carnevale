interface FacePaintingSectionProps {
  form: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FacePaintingSection({
  form,
  handleChange,
}: FacePaintingSectionProps) {
  return (
    <div className="rounded-3xl border border-pink-200 bg-pink-50 p-8">
      <h2 className="mb-2 text-2xl font-black">
        🎨 Sejas apgleznošana
      </h2>

      <p className="mb-6 text-gray-600">
        Izvēlieties vēlamo pakalpojuma ilgumu.
      </p>

      <div className="grid gap-6 md:grid-cols-2">

        <label
          className={`cursor-pointer rounded-2xl border-2 p-6 transition ${
            form.programma === "1,5 stundas"
              ? "border-pink-500 bg-white shadow-lg"
              : "border-pink-200 bg-white"
          }`}
        >
          <input
            hidden
            type="radio"
            name="programma"
            value="1,5 stundas"
            checked={form.programma === "1,5 stundas"}
            onChange={handleChange}
          />

          <h3 className="text-2xl font-bold">
            1,5 stundas
          </h3>

          <p className="mt-3 text-gray-500">
            Mazākiem pasākumiem
          </p>

          <p className="mt-5 text-4xl font-black text-pink-500">
            150 €
          </p>
        </label>

        <label
          className={`cursor-pointer rounded-2xl border-2 p-6 transition ${
            form.programma === "2 stundas"
              ? "border-pink-500 bg-white shadow-lg"
              : "border-pink-200 bg-white"
          }`}
        >
          <input
            hidden
            type="radio"
            name="programma"
            value="2 stundas"
            checked={form.programma === "2 stundas"}
            onChange={handleChange}
          />

          <span className="rounded-full bg-pink-500 px-3 py-1 text-xs font-bold text-white">
            Populārākā izvēle
          </span>

          <h3 className="mt-4 text-2xl font-bold">
            2 stundas
          </h3>

          <p className="mt-3 text-gray-500">
            Lielākiem pasākumiem
          </p>

          <p className="mt-5 text-4xl font-black text-pink-500">
            170 €
          </p>
        </label>

      </div>
    </div>
  );
}