import { Link } from 'react-router-dom';

const formatDate = (value) =>
  new Date(value).toLocaleString('fr-FR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

export default function EventCard({ event }) {
  const full = event.remaining_capacity === 0;

  return (
    <article className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">
      <div className="flex items-start gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{formatDate(event.starts_at)}</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">{event.title}</h2>
          <p className="mt-2 text-sm text-slate-600">{event.location}</p>
        </div>
        {full && <span className="ml-auto rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-rose-700">Complet</span>}
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-600">{event.description}</p>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
        <span>
          {event.remaining_capacity} {event.remaining_capacity === 1 ? 'place restante' : 'places restantes'}
        </span>
        <span>{event.capacity} places totales</span>
      </div>

      <Link
        to={`/events/${event.id}`}
        className="mt-6 inline-flex items-center rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
      >
        Voir l'événement
      </Link>
    </article>
  );
}
