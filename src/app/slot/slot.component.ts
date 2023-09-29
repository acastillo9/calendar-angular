import { Component, Input } from '@angular/core';
import { Event } from '../types';

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.scss']
})
export class SlotComponent {
  @Input()
  value: number | undefined;

  @Input()
  disabled: boolean = false;

  @Input()
  events: Event[] = [];
}
