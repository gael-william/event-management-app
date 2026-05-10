import { useEffect, useMemo, useState } from 'react';
import { fetchEvents } from '../api/events';
import EventCard from '../components/EventCard';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import SearchBar from '../components/SearchBar';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents()
      .then(setEvents)
      .catch(() => setError('Impossible de charger les événements.'))
      .finally(() => setLoading(false));
  }, []);

  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return events;
    }

    return events.filter((event) => {
      return (
        event.title.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query)
      );
    });
  }, [events, search]);

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">Liste des événements</p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-900">Tous les événements</h2>
          </div>

          <div className="w-full max-w-md">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Titre, lieu ou description"
            />
          </div>
        </div>
      </section>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <section className="grid gap-6 lg:grid-cols-2">
          {error ? (
            <ErrorMessage message={error} />
          ) : filteredEvents.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-600 shadow-sm">
              Aucun événement ne correspond à votre recherche.
            </div>
          ) : (
            filteredEvents.map((event) => <EventCard key={event.id} event={event} />)
          )}
        </section>
      )}
    </div>
  );
}
