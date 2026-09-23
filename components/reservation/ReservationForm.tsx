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
import {
  PartyPopper,
  Palette,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function ReservationForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [openAnimatorSelector, setOpenAnimatorSelector] = useState(false);
  const [openMascotSelector, setOpenMascotSelector] = useState(false);

  const [form, setForm] = useState({
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
    glitter: false,
    baloni: false,
    individuali: false,

    komentars: "",
  });

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

  setLoading(true);

  try {
    const response = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      throw new Error("Neizdevās nosūtīt rezervāciju");
    }

    setSuccess(true);
  } catch (error) {
    console.error(error);
    alert("Kļūda! Rezervāciju neizdevās nosūtīt.");
  } finally {
    setLoading(false);
  }
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
      Izvēlies pakalpojumu
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
        Animatori
      </h3>

      <p className="mt-2 text-gray-500">
        Iemīļoti tēli un aizraujošas programmas
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
        Sejas apgleznošana
      </h3>

      <p className="mt-2 text-gray-500">
        Krāsaini zīmējumi un glitter tetovējumi
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
        Pārsteiguma tēli
      </h3>

      <p className="mt-2 text-gray-500">
        Maskoti un gaisa plūsmas kostīmi
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

        <SubmitSection
          loading={loading}
          success={success}
        />
      </form>
           <AnimatorSelectorModal
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