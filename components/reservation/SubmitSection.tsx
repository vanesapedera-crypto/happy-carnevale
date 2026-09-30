type SubmitSectionProps = {
  loading: boolean;
  error?: string;
};

export default function SubmitSection({
  loading,
  error,
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

      {error && (
        <p className="rounded-2xl border border-red-200 bg-red-50 p-5 text-center font-semibold text-red-600">
          {error}
        </p>
      )}

      <p className="text-center text-sm text-gray-500">
        Pēc rezervācijas pieprasījuma saņemšanas mēs sazināsimies ar Jums, lai
        precizētu pasākuma detaļas un apstiprinātu rezervāciju.
      </p>
    </div>
  );
}