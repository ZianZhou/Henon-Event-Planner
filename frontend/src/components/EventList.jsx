import React from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PencilIcon, Trash2Icon, GripVerticalIcon } from 'lucide-react';

function SortableItem({ event, onEdit, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: event.id.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999 : undefined
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between p-4 mb-2 border rounded-lg bg-white shadow"
    >
      <div className="flex items-center space-x-3">
        <GripVerticalIcon
          {...attributes}
          {...listeners}
          className="h-5 w-5 text-gray-400 cursor-move"
        />
        <div>
          <h3 className="font-semibold text-lg">{event.title}</h3>
          <p className="text-sm text-gray-500">
            {event.startDate} → {event.endDate} · <span className="font-medium">{event.type}</span>
          </p>
        </div>
      </div>
      <div className="flex space-x-2">
        <button onClick={() => onEdit(event)}>
          <PencilIcon className="h-5 w-5 text-blue-500 hover:text-blue-700" />
        </button>
        <button onClick={() => onDelete(event.id)}>
          <Trash2Icon className="h-5 w-5 text-red-500 hover:text-red-700" />
        </button>
      </div>
    </div>
  );
}

export default function EventList({ events, onEdit, onDelete, onReorder }) {
  const handleDragEnd = (e) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIndex = events.findIndex(ev => ev.id.toString() === active.id);
    const newIndex = events.findIndex(ev => ev.id.toString() === over.id);
    const newOrder = arrayMove(events, oldIndex, newIndex);
    onReorder(newOrder);
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={events.map(ev => ev.id.toString())}
        strategy={verticalListSortingStrategy}
      >
        {events.map(ev => (
          <SortableItem
            key={ev.id.toString()}
            event={ev}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
}
