import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../api/events';
import ErrorMessage from '../components/ErrorMessage';

export default function CreateEventPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    location: '',
    starts_at: '',
    capacity: '',
    description: '',
  });
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setServerError('');
    setValidationErrors({});

    try {
      const eventData = await createEvent({
        ...form,
        capacity: Number(form.capacity),
      });
      navigate(`/events/${eventData.id}`);
    } catch (error) {
      const response = error?.response;

      if (response?.status === 400) {
        setValidationErrors(response.data.errors || {});
      } else {
        setServerError('Impossible de créer l’événement.');
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <p className="text-sm text-slate-500">Création d’un nouvel événement</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">Ajouter un événement</h2>
          <p className="mt-3 text-sm text-slate-600">Remplissez les informations pour publier un nouvel événement.</p>
        </div>

        {serverError && <ErrorMessage message={serverError} />}

        <form onSubmit={handleSubmit} className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">
              Titre
              <input
                value={form.title}
                onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
            </label>
            {validationErrors.title && <p className="text-sm text-rose-600">{validationErrors.title[0]}</p>}

            <label className="block text-sm font-medium text-slate-700">
              Lieu
              <input
                value={form.location}
                onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value }))}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
            </label>
            {validationErrors.location && <p className="text-sm text-rose-600">{validationErrors.location[0]}</p>}

            <label className="block text-sm font-medium text-slate-700">
              Date et heure
              <input
                type="datetime-local"
                value={form.starts_at}
                onChange={(event) => setForm((prev) => ({ ...prev, starts_at: event.target.value }))}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
            </label>
            {validationErrors.starts_at && <p className="text-sm text-rose-600">{validationErrors.starts_at[0]}</p>}

            <label className="block text-sm font-medium text-slate-700">
              Places
              <input
                type="number"
                min="1"
                value={form.capacity}
                onChange={(event) => setForm((prev) => ({ ...prev, capacity: event.target.value }))}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
            </label>
            {validationErrors.capacity && <p className="text-sm text-rose-600">{validationErrors.capacity[0]}</p>}
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">
              Description
              <textarea
                value={form.description}
                onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
                rows="10"
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
            </label>
            {validationErrors.description && <p className="text-sm text-rose-600">{validationErrors.description[0]}</p>}

            <button
              type="submit"
              disabled={saving}
              className="mt-4 inline-flex h-12 items-center justify-center rounded-2xl bg-slate-900 px-6 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {saving ? 'Création…' : 'Créer l’événement'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
