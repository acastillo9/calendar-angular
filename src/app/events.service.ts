import { Injectable } from '@angular/core';
import { Event, EventsPerMonth } from './types';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  events: EventsPerMonth = {
    8: [
      {
        title: 'meeting',
        startDate: new Date('2023-09-27 08:00'),
        endDate: new Date('2023-09-27 10:00'),
      },
      {
        title: 'meeting',
        startDate: new Date('2023-09-27 14:00'),
        endDate: new Date('2023-09-27 15:00'),
      }
    ]
  }

  constructor() { }

  addEvent(event: Event) {
    const eventMonth = event.startDate.getMonth();
    this.events[eventMonth] = this.events[eventMonth] 
      ? [...this.events[eventMonth], event] 
      : [event];
  }

  getEventsPerMonth(month: number) {
    return this.events[month] || [];
  }
}
