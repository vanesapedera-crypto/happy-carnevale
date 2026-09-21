type SubmitSectionProps = {
  loading: boolean;
  success: boolean;
};

export default function SubmitSection({
  loading,
  success,
}: SubmitSectionProps) {
  return (
    <div className="space-y-6">
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-pink-500 py-5 text-xl font-bold text-white transition hover:bg-pink-600 disabled:opacity-50"
      >
        {loading
          ? "Nosūta rezervāciju..."
          : "Nosūtīt rezervācijas pieprasījumu"}
      </button>

      {success && (
        <div className="rounded-2xl border border-green-200 bg-green-50 p-5 text-center">
          <p className="font-semibold text-green-700">
            ✅ Rezervācijas pieprasījums veiksmīgi nosūtīts!
          </p>

          <p className="mt-2 text-sm text-gray-600">
            Mēs ar Jums sazināsimies tuvākajā laikā, lai precizētu informāciju un
            apstiprinātu rezervāciju.
          </p>
        </div>
      )}

      <p className="text-center text-sm text-gray-500">
        Pēc rezervācijas pieprasījuma saņemšanas mēs sazināsimies ar Jums, lai
        precizētu pasākuma detaļas un apstiprinātu rezervāciju.
      </p>
    </div>
  );
}