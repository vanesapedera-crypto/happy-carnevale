"use client";

import { useState } from "react";

import ContactSection from "./ContactSection";
import EventSection from "./EventSection";
import AnimatorSection from "./AnimatorSection";
import FacePaintingSection from "./FacePaintingSection";
import SurpriseCharacterSection from "./SupriseCharacterSection";
import AnimatorSelectorModal from "./AnimatorSelectorModal";
import MascotSelectorModal from "./MascotSelectorModal";
import SubmitSection from "./SubmitSection";
import ReservationSuccess from "./ReservationSuccess";
import type { AnimatorCharacter } from "@/data/animatorCharacters";
import {
  PartyPopper,
  Palette,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useLang, useTr } from "@/context/LangContext";

const INITIAL_FORM = {
  pakalpojums: "",

  vards: "",
  telefons: "",
  epasts: "",

  datums: "",
  laiks: "",
  adrese: "",

  berni: "",
  vecums: "",

  tels: "",
  telsImage: "",
  ilgums: "",

  jubilars: "",
  jubilaraVecums: "",

  eksperimenti: false,
  slaims: false,
  burbuli: false,
  darbnica: false,
  led: false,
  folija: false,

  komentars: "",
};

interface ReservationFormProps {
  /** Animatoru tērpi no admin paneļa (vai iebūvētais saraksts). */
  animatorCharacters: AnimatorCharacter[];
}

export default function ReservationForm({
  animatorCharacters,
}: ReservationFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [openAnimatorSelector, setOpenAnimatorSelector] = useState(false);
  const [openMascotSelector, setOpenMascotSelector] = useState(false);

  const [form, setForm] = useState(INITIAL_FORM);
  const lang = useLang();
  const t = useTr();
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value, type } = e.target;

    const fieldMap: Record<string, string> = {
      name: "vards",
      phone: "telefons",
      email: "epasts",

      eventDate: "datums",
      eventTime: "laiks",
      address: "adrese",

      childrenCount: "berni",
      childrenAge: "vecums",

      comment: "komentars",
    };

    const field = fieldMap[name] ?? name;

    setForm((prev) => ({
      ...prev,
      [field]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.pakalpojums) {
      setError(
        t({
          lv: "Lūdzu, izvēlies pakalpojumu (1. solis).",
          ru: "Пожалуйста, выберите услугу (шаг 1).",
          en: "Please choose a service (step 1).",
        })
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...form, lang }),
      });

      if (!response.ok) {
        throw new Error("Neizdevās nosūtīt rezervāciju");
      }

      setSuccess(true);
    } catch (error) {
      console.error(error);
      setError(
        t({
          lv: "Rezervāciju neizdevās nosūtīt. Lūdzu, mēģini vēlreiz vai sazinies ar mums pa tālruni.",
          ru: "Не удалось отправить бронирование. Пожалуйста, попробуйте ещё раз или позвоните нам.",
          en: "We couldn't send your booking. Please try again or give us a call.",
        })
      );
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setForm(INITIAL_FORM);
    setSuccess(false);
    setError("");
  }

  if (success) {
    return (
      <div className="px-6 py-20">
        <ReservationSuccess onReset={resetForm} />
      </div>
    );
  }

    return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-5xl space-y-10 py-20"
      >
      {/* 1. Pakalpojuma izvēle */}

<section className="space-y-6">

  <div className="flex items-center gap-4">
    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-500 text-lg font-bold text-white">
      1
    </div>

    <h2 className="text-3xl font-black text-slate-800">
      {t({ lv: "Izvēlies pakalpojumu", ru: "Выберите услугу", en: "Choose a service" })}
    </h2>
  </div>

  <div className="grid gap-6 md:grid-cols-3">

    {/* Animatori */}

    <button
      type="button"
      onClick={() =>
        setForm((prev) => ({
          ...prev,
          pakalpojums: "animators",
        }))
      }
      className={`relative rounded-3xl border bg-white p-8 text-center transition-all duration-300

      ${
        form.pakalpojums === "animators"
          ? "border-pink-500 ring-2 ring-pink-200 shadow-xl"
          : "border-gray-200 hover:border-pink-300 hover:shadow-lg"
      }`}
    >
      {form.pakalpojums === "animators" && (
        <CheckCircle2
          size={30}
          className="absolute right-5 top-5 text-pink-500"
        />
      )}

      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-pink-50">
        <PartyPopper
          size={42}
          className="text-pink-500"
        />
      </div>

      <h3 className="text-2xl font-black">
        {t({ lv: "Animatori", ru: "Аниматоры", en: "Entertainers" })}
      </h3>

      <p className="mt-2 text-gray-500">
        {t({ lv: "Iemīļoti tēli un aizraujošas programmas", ru: "Любимые персонажи и увлекательные программы", en: "Favourite characters and exciting programmes" })}
      </p>
    </button>

    {/* Sejas */}

    <button
      type="button"
      onClick={() =>
        setForm((prev) => ({
          ...prev,
          pakalpojums: "sejinas",
        }))
      }
      className={`relative rounded-3xl border bg-white p-8 text-center transition-all duration-300

      ${
        form.pakalpojums === "sejinas"
          ? "border-pink-500 ring-2 ring-pink-200 shadow-xl"
          : "border-gray-200 hover:border-pink-300 hover:shadow-lg"
      }`}
    >
      {form.pakalpojums === "sejinas" && (
        <CheckCircle2
          size={30}
          className="absolute right-5 top-5 text-pink-500"
        />
      )}

      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-pink-50">
        <Palette
          size={42}
          className="text-pink-500"
        />
      </div>

      <h3 className="text-2xl font-black">
        {t({ lv: "Sejas apgleznošana", ru: "Аквагрим", en: "Face painting" })}
      </h3>

      <p className="mt-2 text-gray-500">
        {t({ lv: "Krāsaini zīmējumi un glitter tetovējumi", ru: "Яркие рисунки и глиттер-тату", en: "Colourful designs and glitter tattoos" })}
      </p>
    </button>

    {/* Pārsteiguma tēli */}

    <button
      type="button"
      onClick={() =>
        setForm((prev) => ({
          ...prev,
          pakalpojums: "parsteigums",
        }))
      }
      className={`relative rounded-3xl border bg-white p-8 text-center transition-all duration-300

      ${
        form.pakalpojums === "parsteigums"
          ? "border-pink-500 ring-2 ring-pink-200 shadow-xl"
          : "border-gray-200 hover:border-pink-300 hover:shadow-lg"
      }`}
    >
      {form.pakalpojums === "parsteigums" && (
        <CheckCircle2
          size={30}
          className="absolute right-5 top-5 text-pink-500"
        />
      )}

      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-pink-50">
        <Sparkles
          size={42}
          className="text-pink-500"
        />
      </div>

      <h3 className="text-2xl font-black">
        {t({ lv: "Pārsteiguma tēli", ru: "Персонажи-сюрпризы", en: "Surprise characters" })}
      </h3>

      <p className="mt-2 text-gray-500">
        {t({ lv: "Maskoti un gaisa plūsmas kostīmi", ru: "Ростовые куклы и надувные костюмы", en: "Mascots and inflatable costumes" })}
      </p>
    </button>

  </div>

</section>

        {/* Kontaktinformācija */}
        <ContactSection
          form={{
            name: form.vards,
            phone: form.telefons,
            email: form.epasts,
          }}
          handleChange={handleChange}
        />

        {/* Pasākuma informācija */}
        <EventSection
          form={{
            eventDate: form.datums,
            eventTime: form.laiks,
            address: form.adrese,
            childrenCount: form.berni,
            childrenAge: form.vecums,
            comment: form.komentars,
          }}
          handleChange={handleChange}
        />

        {/* Animators */}
        {form.pakalpojums === "animators" && (
          <AnimatorSection
            characters={animatorCharacters}
            form={form}
            handleChange={handleChange}
            onChooseCharacter={() =>
              setOpenAnimatorSelector(true)
            }
          />
        )}

        {/* Sejas apgleznošana */}
        {form.pakalpojums === "sejinas" && (
          <FacePaintingSection
            form={form}
            handleChange={handleChange}
          />
        )}

        {/* Pārsteiguma tēli */}
        {form.pakalpojums === "parsteigums" && (
          <SurpriseCharacterSection
            form={form}
            onChooseCharacter={() =>
              setOpenMascotSelector(true)
            }
          />
        )}

        <SubmitSection loading={loading} error={error} />
      </form>
           <AnimatorSelectorModal
  characters={animatorCharacters}
  open={openAnimatorSelector}
  onClose={() => setOpenAnimatorSelector(false)}
  onSelect={(character) =>
    setForm((prev) => ({
      ...prev,
      tels: character.name,
      telsImage: character.image,
    }))
  }
/>

      <MascotSelectorModal
  open={openMascotSelector}
  onClose={() => setOpenMascotSelector(false)}
  onSelect={(character) => {
    setForm((prev) => ({
      ...prev,
      tels: character.name,
      telsImage: character.image,
    }));
    setOpenMascotSelector(false);
  }}
/>
    </>
  );
}