import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { PencilIcon, Trash2Icon, GripVerticalIcon } from 'lucide-react';

export default function EventList({ events, onEdit, onDelete, onReorder }) {
  const dragEnd = ({ source, destination }) => {
    if (!destination) return;
    const arr = Array.from(events);
    const [m] = arr.splice(source.index,1);
    arr.splice(destination.index,0,m);
    onReorder(arr);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <DragDropContext onDragEnd={dragEnd}>
        <Droppable droppableId="list">
          {(prov) => (
            <ul ref={prov.innerRef} {...prov.droppableProps}>
              {events.map((e,i) => (
                <Draggable key={e.id} draggableId={''+e.id} index={i}>
                  {(p) => (
                    <li
                      ref={p.innerRef}
                      {...p.draggableProps}
                      className="flex items-center justify-between p-4 border-b last:border-0 hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-3">
                        <GripVerticalIcon {...p.dragHandleProps} className="text-gray-400"/>
                        <div>
                          <h3 className="font-semibold text-lg">{e.title}</h3>
                          <p className="text-sm text-gray-500">
                            {e.startDate} → {e.endDate} · <span className="font-medium">{e.type}</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button onClick={()=>onEdit(e)} className="text-blue-500 hover:text-blue-700">
                          <PencilIcon size={18}/>
                        </button>
                        <button onClick={()=>onDelete(e.id)} className="text-red-500 hover:text-red-700">
                          <Trash2Icon size={18}/>
                        </button>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {prov.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
