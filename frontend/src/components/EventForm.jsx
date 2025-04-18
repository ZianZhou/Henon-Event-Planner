import React, { useState, useEffect } from 'react';

function EventForm({ types, onSubmit, initialData, onCancel }) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState(types[0] || '');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setType(initialData.type);
      setStartDate(initialData.startDate.slice(0,10));
      setEndDate(initialData.endDate.slice(0,10));
    } else {
      setTitle('');
      setType(types[0] || '');
      setStartDate('');
      setEndDate('');
    }
  }, [initialData, types]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return alert('Title is required');
    onSubmit({ title, type, startDate, endDate });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 border p-4 rounded">
      <div className="flex space-x-2 mb-2">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 flex-grow"
        />
        <select value={type} onChange={(e) => setType(e.target.value)} className="border p-2">
          {types.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <div className="flex space-x-2 mb-2">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2"
        />
      </div>
      <div className="flex space-x-2">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {initialData ? 'Update' : 'Create'}
        </button>
        {initialData && (
          <button type="button" onClick={onCancel} className="px-4 py-2 border rounded">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default EventForm;