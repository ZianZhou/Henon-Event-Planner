import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventList from './components/EventList';
import EventTimeline from './components/EventTimeline';
import EventForm from './components/EventForm';

function App() {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState('list');
  const [editingEvent, setEditingEvent] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [filterType, setFilterType] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/events');
      setEvents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (data) => {
    await axios.post('http://localhost:5000/events', data);
    fetchEvents();
  };

  const handleUpdate = async (id, data) => {
    await axios.put(`http://localhost:5000/events/${id}`, data);
    fetchEvents();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/events/${id}`);
    fetchEvents();
  };

  const handleReorder = async (newOrder) => {
    setEvents(newOrder);
    await axios.put('http://localhost:5000/events/reorder', { order: newOrder.map(e => e.id) });
  };

  const filteredEvents = events
    .filter(e => e.title.toLowerCase().includes(filterText.toLowerCase()))
    .filter(e => !filterType || e.type === filterType);

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Event Planner</h1>
        <div>
          <button onClick={() => setView('list')} className="mr-2 px-3 py-1 bg-gray-200 rounded">List View</button>
          <button onClick={() => setView('timeline')} className="px-3 py-1 bg-gray-200 rounded">Timeline View</button>
        </div>
      </header>

      <EventForm
        types={[
          'Merger',
          'Dividends',
          'New Capital',
          'Hire'
        ]}
        onSubmit={editingEvent ? (data) => handleUpdate(editingEvent.id, data) : handleCreate}
        initialData={editingEvent}
        onCancel={() => setEditingEvent(null)}
      />

      <div className="my-4 flex space-x-2">
        <input
          type="text"
          placeholder="Search title..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="border p-2 flex-grow rounded"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Types</option>
          <option value="Merger">Merger</option>
          <option value="Dividends">Dividends</option>
          <option value="New Capital">New Capital</option>
          <option value="Hire">Hire</option>
        </select>
      </div>

      {view === 'list' ? (
        <EventList
          events={filteredEvents}
          onEdit={setEditingEvent}
          onDelete={handleDelete}
          onReorder={handleReorder}
        />
      ) : (
        <EventTimeline events={filteredEvents} />
      )}
    </div>
  );
}

export default App;