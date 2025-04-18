// src/App.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventList from './components/EventList';
import EventTimeline from './components/EventTimeline';
import EventForm from './components/EventForm';

// Point all axios calls to the Flask backend
axios.defaults.baseURL = 'http://localhost:5000';

export default function App() {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState('list');
  const [editing, setEditing] = useState(null);
  const [q, setQ] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      const { data } = await axios.get('/events');
      setEvents(data);
    } catch (e) {
      console.error(e);
    }
  }

  async function onCreate(d) {
    await axios.post('/events', d);
    fetchEvents();
  }

  async function onUpdate(id, d) {
    await axios.put(`/events/${id}`, d);
    fetchEvents();
  }

  async function onDelete(id) {
    await axios.delete(`/events/${id}`);
    fetchEvents();
  }

  // Updated onReorder: update client state immediately, persist in background
  async function onReorder(updated) {
    setEvents(updated);
    try {
      await axios.put('/events/reorder', {
        order: updated.map(e => e.id),
      });
    } catch (err) {
      console.error('Failed to save new order', err);
    }
  }

  const filtered = events
    .filter(e => e.title.toLowerCase().includes(q.toLowerCase()))
    .filter(e => !typeFilter || e.type === typeFilter);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-6">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-extrabold text-blue-600">Event Planner</h1>
          <nav className="flex items-center space-x-2">
            <button
              className={`px-4 py-1 rounded-lg ${
                view === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-blue-600'
              } shadow`}
              onClick={() => { setView('list'); setEditing(null); }}
            >
              List
            </button>
            <button
              className={`px-4 py-1 rounded-lg ${
                view === 'timeline'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-blue-600'
              } shadow`}
              onClick={() => { setView('timeline'); setEditing(null); }}
            >
              Timeline
            </button>
            <button
              className="px-4 py-1 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
              onClick={() => setEditing(null)}
            >
              New Event
            </button>
          </nav>
        </header>

        <EventForm
          types={['Merger', 'Dividends', 'New Capital', 'Hire']}
          initialData={editing}
          onSubmit={editing ? d => onUpdate(editing.id, d) : onCreate}
          onCancel={() => setEditing(null)}
        />

        <div className="flex space-x-3 mb-6">
          <input
            className="flex-grow border rounded-lg px-3 py-2 shadow-sm"
            placeholder="Search titles..."
            value={q}
            onChange={e => setQ(e.target.value)}
          />
          <select
            className="border rounded-lg px-3 py-2 shadow-sm"
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
          >
            <option value="">All Types</option>
            <option>Merger</option>
            <option>Dividends</option>
            <option>New Capital</option>
            <option>Hire</option>
          </select>
        </div>

        {view === 'list' ? (
          <EventList
            events={filtered}
            onEdit={setEditing}
            onDelete={onDelete}
            onReorder={onReorder}
          />
        ) : (
          <EventTimeline events={filtered} />
        )}
      </div>
    </div>
  );
}
