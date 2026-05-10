import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import EventsPage from '../pages/EventsPage';
import EventDetailPage from '../pages/EventDetailPage';
import CreateEventPage from '../pages/CreateEventPage';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<EventsPage />} />
        <Route path="events/create" element={<CreateEventPage />} />
        <Route path="events/:id" element={<EventDetailPage />} />
      </Route>
    </Routes>
  );
}
