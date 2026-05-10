import apiClient from './client';

export const fetchEvents = async () => {
  const response = await apiClient.get('/api/events');
  return response.data.data;
};

export const fetchEvent = async (id) => {
  const response = await apiClient.get(`/api/events/${id}`);
  return response.data.data;
};

export const createEvent = async (eventData) => {
  const response = await apiClient.post('/api/events', eventData);
  return response.data.data;
};

export const registerParticipant = async (eventId, participant) => {
  const response = await apiClient.post(`/api/events/${eventId}/register`, participant);
  return response.data;
};

export const fetchRegistrations = async (eventId) => {
  const response = await apiClient.get(`/api/events/${eventId}/registrations`);
  return response.data.data;
};

export const deleteRegistration = async (registrationId) => {
  await apiClient.delete(`/api/registrations/${registrationId}`);
};
