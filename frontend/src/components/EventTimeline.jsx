import React from 'react';
import Timeline from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';
import { parseISO } from 'date-fns';

export default function EventTimeline({ events }) {
  if (!events.length) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg text-center text-gray-500">
        No events to display.
      </div>
    );
  }

  const items = events.map(e => ({
    id: e.id,
    group: 1,
    title: e.title,
    start_time: parseISO(e.startDate),
    end_time:   parseISO(e.endDate),
  }));
  const groups = [{ id: 1, title: 'Events' }];

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div style={{ height: '500px' }}>
        <Timeline
          groups={groups}
          items={items}
          defaultTimeStart={items[0].start_time}
          defaultTimeEnd={items[items.length-1].end_time}
          canMove={false}
          canResize={false}
          fullUpdate
          sidebarWidth={150}      
          lineHeight={80}         
          itemHeightRatio={0.8}   
        />
      </div>
    </div>
  );
}
