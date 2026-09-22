import Image from "next/image";
import {
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-pink-100 bg-gradient-to-b from-white to-[#FFF4F9]">
      <div className="mx-auto max-w-7xl px-6 py-10">

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">

          {/* Logo */}
          <div>
            <Image
              src="/images/logo.png"
              alt="Happy Carnevale"
              width={180}
              height={70}
              className="w-44 h-auto"
              priority
            />

            <p className="mt-4 max-w-xs text-gray-600 leading-7">
              Radām neaizmirstamus svētkus bērniem visā Latvijā.
            </p>
          </div>

          {/* Kontakti */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Kontakti
            </h3>

            <div className="mt-4 space-y-3">

              <a
                href="tel:+37126126313"
                className="flex items-center gap-3 text-gray-600 transition hover:text-pink-500"
              >
                <FaPhoneAlt className="text-pink-500 text-sm" />
                <span>+371 26 126 313</span>
              </a>

              <a
                href="mailto:carnevalehappy@gmail.com"
                className="flex items-center gap-3 text-gray-600 transition hover:text-pink-500"
              >
                <FaEnvelope className="text-pink-500 text-sm" />
                <span>carnevalehappy@gmail.com</span>
              </a>

              <div className="flex items-center gap-3 text-gray-600">
                <FaMapMarkerAlt className="text-pink-500 text-sm" />
                <span>Stabu iela 90, Rīga</span>
              </div>

            </div>
          </div>

          {/* Sociālie tīkli */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Seko mums
            </h3>

            <div className="mt-4 flex gap-3">

              <a
                href="https://www.instagram.com/burbulites_burbuli/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-pink-200 bg-white text-pink-500 transition-all duration-300 hover:bg-pink-500 hover:text-white hover:shadow-md"
              >
                <FaInstagram size={19} />
              </a>

              <a
                href="https://www.facebook.com/Burbulitesburbuli"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-pink-200 bg-white text-pink-500 transition-all duration-300 hover:bg-pink-500 hover:text-white hover:shadow-md"
              >
                <FaFacebookF size={17} />
              </a>

              <a
                href="https://www.tiktok.com/@burbulitesburbuli"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-pink-200 bg-white text-pink-500 transition-all duration-300 hover:bg-pink-500 hover:text-white hover:shadow-md"
              >
                <FaTiktok size={17} />
              </a>

            </div>
          </div>

        </div>

        {/* Apakšējā līnija */}
        <div className="mt-8 border-t border-pink-100 pt-4">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Happy Carnevale. Visas tiesības aizsargātas.
          </p>
        </div>

      </div>
    </footer>
  );
}