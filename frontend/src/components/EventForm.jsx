import React, { useState, useEffect } from 'react';
import { XIcon } from 'lucide-react';

export default function EventForm({ types, initialData, onSubmit, onCancel }) {
  const [title, setTitle] = useState('');
  const [type, setType]   = useState(types[0]);
  const [start, setStart] = useState('');
  const [end, setEnd]     = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setType(initialData.type);
      setStart(initialData.startDate.slice(0,10));
      setEnd(initialData.endDate.slice(0,10));
    } else {
      setTitle(''); setType(types[0]); setStart(''); setEnd('');
    }
  }, [initialData, types]);

  function handle(e) {
    e.preventDefault();
    if (!title) return alert('Title is required');
    if (new Date(start) > new Date(end))
      return alert('Start date must be before end date');
    onSubmit({ title, type, startDate: start, endDate: end });
  }

  return (
    <form
      onSubmit={handle}
      className="bg-white p-6 mb-8 rounded-lg shadow-lg relative"
    >
      {initialData && (
        <button
          type="button"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={onCancel}
        >
          <XIcon size={20}/>
        </button>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          className="border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
          placeholder="Event Title"
          value={title} onChange={e=>setTitle(e.target.value)}
        />
        <select
          className="border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
          value={type} onChange={e=>setType(e.target.value)}
        >
          {types.map(t=>(
            <option key={t}>{t}</option>
          ))}
        </select>
        <input
          type="date"
          className="border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
          value={start} onChange={e=>setStart(e.target.value)}
        />
        <input
          type="date"
          className="border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
          value={end} onChange={e=>setEnd(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        {initialData ? 'Update Event' : 'Create Event'}
      </button>
    </form>
  );
}
