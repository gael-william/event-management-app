import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEvent, fetchRegistrations, registerParticipant } from '../api/events';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';

const formatDate = (value) =>
  new Date(value).toLocaleString('fr-FR', {
    dateStyle: 'long',
    timeStyle: 'short',
  });

export default function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [form, setForm] = useState({ name: '', email: '' });

  const loadEvent = async () => {
    try {
      const [eventData, registrationsData] = await Promise.all([
        fetchEvent(id),
        fetchRegistrations(id),
      ]);
      setEvent(eventData);
      setRegistrations(registrationsData);
    } catch (error) {
      setServerError('Impossible de charger les détails de l’événement.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvent();
  }, [id]);

  const handleSubmit = async (eventSubmit) => {
    eventSubmit.preventDefault();

    setSaving(true);
    setServerError('');
    setValidationErrors({});
    setSuccessMessage('');

    try {
      await registerParticipant(id, form);
      setSuccessMessage('Votre inscription a bien été enregistrée.');
      setForm({ name: '', email: '' });
      await loadEvent();
    } catch (error) {
      const response = error?.response;

      if (response?.status === 409 || response?.status === 422) {
        setServerError(response.data.message ?? 'Impossible de valider la demande.');
      } else if (response?.status === 400) {
        setValidationErrors(response.data.errors || {});
      } else {
        setServerError('Erreur réseau. Veuillez réessayer.');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!event) {
    return <ErrorMessage message={serverError || 'Événement introuvable.'} />;
  }

  const isFull = event.remaining_capacity === 0;

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm text-slate-500">Détails de l’événement</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">{event.title}</h2>
            <p className="mt-4 max-w-3xl text-slate-700">{event.description}</p>
          </div>
          <div className="space-y-2 rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700">
            <div>
              <span className="font-semibold text-slate-900">Date</span>
              <p>{formatDate(event.starts_at)}</p>
            </div>
            <div>
              <span className="font-semibold text-slate-900">Lieu</span>
              <p>{event.location}</p>
            </div>
            <div>
              <span className="font-semibold text-slate-900">Places restantes</span>
              <p>{event.remaining_capacity} / {event.capacity}</p>
            </div>
            {isFull && <div className="rounded-2xl bg-rose-100 px-3 py-2 text-sm text-rose-700">Événement complet</div>}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl font-semibold text-slate-900">Inscription</h3>
            <span className="text-sm text-slate-500">{registrations.length} inscrits</span>
          </div>
          <p className="mt-2 text-sm text-slate-600">Complétez le formulaire ci-dessous pour réserver votre place.</p>

          {serverError && <ErrorMessage message={serverError} />}
          {successMessage && (
            <div className="mt-4 rounded-3xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="name">
                Nom complet
              </label>
              <input
                id="name"
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                disabled={isFull || saving}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
              {validationErrors.name && <p className="mt-1 text-sm text-rose-600">{validationErrors.name[0]}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                disabled={isFull || saving}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
              {validationErrors.email && <p className="mt-1 text-sm text-rose-600">{validationErrors.email[0]}</p>}
            </div>

            <button
              type="submit"
              disabled={isFull || saving}
              className="inline-flex h-12 items-center justify-center rounded-2xl bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {isFull ? 'Inscription fermée' : saving ? 'Enregistrement…' : 'S’inscrire'}
            </button>
          </form>
        </div>

        <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">Inscriptions</h3>
          <div className="mt-4 space-y-3">
            {registrations.length === 0 ? (
              <p className="text-sm text-slate-600">Aucune inscription pour le moment.</p>
            ) : (
              registrations.map((registration) => (
                <div key={registration.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <p className="font-medium text-slate-900">{registration.name}</p>
                  <p className="text-sm text-slate-600">{registration.email}</p>
                </div>
              ))
            )}
          </div>
        </aside>
      </section>
    </div>
  );
}
