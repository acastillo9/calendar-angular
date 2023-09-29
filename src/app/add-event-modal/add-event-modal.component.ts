import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EventsService } from '../events.service';
import { Event } from '../types';

@Component({
  selector: 'app-add-event-modal',
  templateUrl: './add-event-modal.component.html',
  styleUrls: ['./add-event-modal.component.scss']
})
export class AddEventModalComponent {
  @Output()
  onClose: EventEmitter<void> = new EventEmitter();

  eventForm = new FormGroup({
    title: new FormControl('', { nonNullable: true }),
    startDate: new FormControl<Date>(new Date(), { nonNullable: true }),
    endDate: new FormControl<Date>(new Date(), { nonNullable: true })
  });

  constructor(private eventsService: EventsService) {}

  saveEvent() {
    if (this.eventForm.valid) {
      const event: Event = {
        title: this.eventForm.get('title')!.value,
        startDate: new Date(this.eventForm.get('startDate')!.value),
        endDate: new Date(this.eventForm.get('endDate')!.value),
      }
      this.eventsService.addEvent(event);
      this.onClose.emit();
    }
  }
}
