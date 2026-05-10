import { NavLink, Outlet } from 'react-router-dom';

const navLinkClass = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-semibold transition ${
    isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
  }`;

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Gestion d’événements</p>
            <h1 className="mt-1 text-2xl font-semibold text-slate-900">Event Manager</h1>
          </div>

          <nav className="flex flex-wrap gap-3">
            <NavLink to="/" className={navLinkClass} end>
              Événements
            </NavLink>
            <NavLink to="/events/create" className={navLinkClass}>
              Créer un événement
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <Outlet />
      </main>
    </div>
  );
}
