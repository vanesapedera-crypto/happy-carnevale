interface NotConfiguredProps {
  missing: string[];
}

/** Rāda, kuri iestatījumi vēl trūkst (tikai nosaukumus, nekad vērtības). */
export default function NotConfigured({ missing }: NotConfiguredProps) {
  return (
    <div className="rounded-xl bg-amber-50 px-4 py-4 text-sm text-amber-900">
      <p className="font-semibold">Admin panelis vēl nav iestatīts.</p>
      <p className="mt-2">Trūkst šādu vides mainīgo:</p>
      <ul className="mt-2 list-disc space-y-1 pl-5 font-mono text-xs">
        {missing.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <p className="mt-3">Iestatīšanas soļi ir failā docs/admin-panelis.md.</p>
    </div>
  );
}
