import { Injectable } from '@angular/core';
import { Event, EventsPerMonth } from './types';
import { Observable, Subject } from 'rxjs';

const EVENTS_MOCKS: EventsPerMonth = {
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

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  events$: Subject<EventsPerMonth> = new Subject();

  constructor() { }

  addEvent(event: Event) {
    const eventMonth = event.startDate.getMonth();
    EVENTS_MOCKS[eventMonth] = EVENTS_MOCKS[eventMonth] 
      ? [...EVENTS_MOCKS[eventMonth], event] 
      : [event];
    this.events$.next(EVENTS_MOCKS);
  }

  getEventsPerMonth(month: number) {
    return new Observable<Event[]>((subscriber) => {
      subscriber.next(EVENTS_MOCKS[month] || []);
      subscriber.complete();
    })
  }
}
