import React from 'react';
import Timeline from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';
import { parseISO } from 'date-fns';

function EventTimeline({ events }) {
  const items = events.map(e => ({
    id: e.id,
    group: 1,
    title: e.title,
    start_time: parseISO(e.startDate),
    end_time: parseISO(e.endDate),
  }));
  const groups = [{ id: 1, title: 'Events' }];

  return (
    <div style={{ height: '300px' }}>
      <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={new Date(Math.min(...items.map(i => i.start_time)))}
        defaultTimeEnd={new Date(Math.max(...items.map(i => i.end_time)))}
      />
    </div>
  );
}

export default EventTimeline;