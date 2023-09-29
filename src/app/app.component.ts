import { Component, OnInit, computed, signal } from '@angular/core';
import { getDaysInMonth, getFirstDayInMonth, positiveMod } from 'src/utils';
import { Event, EventsPerMonth, Slot } from './types';
import { EventsService } from './events.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'calendar-angular';

  month: number = new Date().getMonth();
  year: number = new Date().getFullYear();
  monthLabels: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  daysInMonth: number | undefined;
  firstDayInMonth: number | undefined;
  lastDayPreviousMonth: number | undefined;
  weeksPerMonth: number | undefined;
  table: Slot[][] = [];
  events = signal<Event[]>([]);  
  eventsPerDay = computed(() => this.events()
    .reduce<EventsPerMonth>((acc, cur: Event) => ({ 
      ...acc, 
      [cur.startDate.getDate()]: acc[cur.startDate.getDate()] ? [...acc[cur.startDate.getDate()], cur] : [cur]
    }), {}));
  isOpenAddEventModal: boolean = false;

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.eventsService.events$.subscribe((newEvents) => {
      this.events.set(newEvents[this.month]);
    });
    this.initCalendar();
  }

  prevMonth() {
    this.month = this.moveMonth(-1);
    this.year = this.month === 11 ? this.year - 1 : this.year;
    this.initCalendar();
  }

  nextMonth() {
    this.month = this.moveMonth(1);
    this.year = this.month === 0 ? this.year + 1 : this.year;
    this.initCalendar();
  }

  private initCalendar() {
    this.daysInMonth = getDaysInMonth(this.year, this.month);
    this.firstDayInMonth = getFirstDayInMonth(this.year, this.month);
    this.lastDayPreviousMonth = getDaysInMonth(this.year, this.month - 1);
    this.weeksPerMonth = Math.ceil((this.firstDayInMonth + this.daysInMonth) / 7);
    this.table = this.populateTable(this.weeksPerMonth, this.firstDayInMonth, this.daysInMonth, this.lastDayPreviousMonth);
    this.eventsService.getEventsPerMonth(this.month).subscribe((events) => {
      this.events.set(events);
    });
  }

  private moveMonth(count: number) {
    return positiveMod(this.month + count, this.monthLabels.length);
  }

  private populateTable(weeksPerMonth: number, firstDayInMonth: number, daysInMonth: number, lastDayPreviousMonth: number) {
    const table: Slot[][] = [];
    for (let i = 0; i < weeksPerMonth!; i++) {
      const week: Slot[] = [];
      for (let j = 0; j < 7; j++) {
        let slot: Slot = {
          day: 0,
          disabled: false
        };
        if (firstDayInMonth! <= (j + (i * 7)) && daysInMonth! >= ((j + (i * 7)) - firstDayInMonth!) + 1) {
          slot.day = ((j + (i * 7)) - firstDayInMonth!) + 1;
        } else if (daysInMonth! >= ((j + (i * 7)) - firstDayInMonth!) + 1) {
          slot.day = lastDayPreviousMonth! - firstDayInMonth! + j + 1;
          slot.disabled = true;
        } else {
          slot.day = ((j + (i * 7)) - daysInMonth! - firstDayInMonth!) + 1;
          slot.disabled = true;
        }
        week.push(slot);
      }
      table.push(week);
    }
    return table;
  }
}
