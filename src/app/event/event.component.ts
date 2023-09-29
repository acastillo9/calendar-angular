import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent {
  @Input()
  title: string | undefined;

  @Input()
  startDate: Date | undefined;
  
  @Input()
  endDate: Date | undefined;
}
