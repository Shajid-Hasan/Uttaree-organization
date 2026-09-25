export default function CommitteeList({ project, note }) {
  const named = (project.committees || []).filter((item) => item.director || item.assistantDirector);
  const current = named.find((item) => item.current) || named[0];
  const previous = named.filter((item) => item !== current);

  return (
    <section>
      <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">This year's committee</h2>
      <span className="mt-3 block h-px w-8 bg-primary" />
      <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">{note}</p>
      {!current && (
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
          Names for {project.established} are added when the project director and assistant director are confirmed.
        </p>
      )}
      {current && (
        <div className="mt-6 grid gap-6 border-t border-sand sm:grid-cols-2">
          <Role label="Project director" name={current.director} year={current.year} />
          <Role label="Assistant director" name={current.assistantDirector} year={current.year} />
        </div>
      )}
      {previous.length > 0 && (
        <ul className="mt-6 border-t border-sand">
          {previous.map((item) => (
            <li key={item.year} className="grid gap-1 border-b border-sand py-3 text-sm sm:grid-cols-3 sm:items-baseline">
              <span className="font-medium text-ink">{item.year}</span>
              <span className="text-muted">{item.director ? `Director · ${item.director}` : ''}</span>
              <span className="text-muted">{item.assistantDirector ? `Assistant · ${item.assistantDirector}` : ''}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function Role({ label, name, year }) {
  if (!name) return null;
  return (
    <div className="border-b border-sand py-3">
      <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-muted">{label} · {year}</p>
      <p className="mt-2 font-display text-2xl font-medium tracking-tight">{name}</p>
    </div>
  );
}
