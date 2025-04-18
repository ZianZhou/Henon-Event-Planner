import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function EventList({ events, onEdit, onDelete, onReorder }) {
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(events);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    onReorder(reordered);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="event-list">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {events.map((e, idx) => (
              <Draggable key={e.id} draggableId={e.id.toString()} index={idx}>
                {(prov) => (
                  <li ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps} className="border p-2 mb-2 rounded">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-bold">{e.title}</div>
                        <div>{e.startDate} - {e.endDate} | {e.type}</div>
                      </div>
                      <div className="space-x-2">
                        <button onClick={() => onEdit(e)}>Edit</button>
                        <button onClick={() => onDelete(e.id)}>Delete</button>
                      </div>
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

export default EventList;