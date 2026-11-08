import { useTr } from "@/context/LangContext";

type SubmitSectionProps = {
  loading: boolean;
  error?: string;
};

export default function SubmitSection({
  loading,
  error,
}: SubmitSectionProps) {
  const t = useTr();
  return (
    <div className="space-y-6">
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-pink-500 py-5 text-xl font-bold text-white transition hover:bg-pink-600 disabled:opacity-50"
      >
        {loading
          ? t({ lv: "Nosūta rezervāciju...", ru: "Отправка бронирования...", en: "Sending booking..." })
          : t({ lv: "Nosūtīt rezervācijas pieprasījumu", ru: "Отправить запрос на бронирование", en: "Send booking request" })}
      </button>

      {error && (
        <p className="rounded-2xl border border-red-200 bg-red-50 p-5 text-center font-semibold text-red-600">
          {error}
        </p>
      )}

      <p className="text-center text-sm text-gray-500">
        {t({ lv: "Pēc rezervācijas pieprasījuma saņemšanas mēs sazināsimies ar Jums, lai precizētu pasākuma detaļas un apstiprinātu rezervāciju.", ru: "Получив запрос на бронирование, мы свяжемся с вами, чтобы уточнить детали мероприятия и подтвердить бронь.", en: "Once we receive your request we'll contact you to go over the event details and confirm the booking." })}
      </p>
    </div>
  );
}