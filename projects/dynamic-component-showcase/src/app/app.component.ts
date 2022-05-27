import { FirstToggleComponent, SecondToggleComponent } from './toggle/toggle.component';
import { EventComponent } from './event/event.component';
import { IntervalComponent } from './interval/interval.component';
import { CounterComponent } from './counter/counter.component';
import { DynamicComponent } from './../../../dynamic-component/src/lib/dynamic-component.component';
import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('counter', {read: DynamicComponent, static: true}) counter?: DynamicComponent;
  @ViewChild('interval', {read: DynamicComponent, static: true}) interval?: DynamicComponent;
  @ViewChild('event', {read: DynamicComponent, static: true}) event?: DynamicComponent;
  @ViewChild('toggle', {read: DynamicComponent, static: true}) toggle?: DynamicComponent;

  ngAfterViewInit() {

  }

  ngOnInit() {
    this.loadCounter();
    this.loadInterval();
    this.loadEvent();
    this.loadToggle();
  }

  private loadCounter() {
    this.counter?.load(CounterComponent);
  }

  private loadInterval() {
    this.interval?.load(IntervalComponent, {
      parameters: {
        increase: 5,
        timer: 100
      }
    });
  }

  private loadEvent() {
    this.event?.load(EventComponent, {
      outputs: {
        output: {
          next: message => console.log(`RECEIVED MESSAGE: ${message}`)
        }
      }
    });
  }

  private loadToggle() {
    const toggles = [FirstToggleComponent, SecondToggleComponent];
    let selectedIndex = 0;
    setInterval(() => {
      selectedIndex = selectedIndex >= toggles.length - 1 ? 0 : selectedIndex + 1;
      this.toggle?.load(toggles[selectedIndex]);
    }, 1500);
  }
}
