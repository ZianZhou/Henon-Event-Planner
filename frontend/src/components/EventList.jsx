// src/components/EventList.jsx
import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { PencilIcon, Trash2Icon, GripVerticalIcon } from 'lucide-react';

export default function EventList({ events, onEdit, onDelete, onReorder }) {
  const handleDragEnd = ({ source, destination }) => {
    if (!destination || source.index === destination.index) return;
    const updated = Array.from(events);
    const [moved] = updated.splice(source.index, 1);
    updated.splice(destination.index, 0, moved);
    onReorder(updated);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="EVENT_LIST">
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="bg-white rounded-lg shadow-lg divide-y divide-gray-200"
          >
            {events.map((e, idx) => (
              <Draggable key={e.id.toString()} draggableId={e.id.toString()} index={idx}>
                {(prov, snapshot) => (
                  <li
                    ref={prov.innerRef}
                    {...prov.draggableProps}
                    {...prov.dragHandleProps}
                    className={`flex items-center justify-between p-4 ${
                      snapshot.isDragging ? 'bg-gray-100' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <GripVerticalIcon className="h-5 w-5 text-gray-400 cursor-move" />
                      <div>
                        <h3 className="font-semibold text-lg">{e.title}</h3>
                        <p className="text-sm text-gray-500">
                          {e.startDate} – {e.endDate} · <span className="font-medium">{e.type}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button onClick={() => onEdit(e)}>
                        <PencilIcon className="h-5 w-5 text-blue-500 hover:text-blue-700" />
                      </button>
                      <button onClick={() => onDelete(e.id)}>
                        <Trash2Icon className="h-5 w-5 text-red-500 hover:text-red-700" />
                      </button>
                    </div>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
