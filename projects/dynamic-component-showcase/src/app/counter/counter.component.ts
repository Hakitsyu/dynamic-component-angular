import { Component } from '@angular/core';

@Component({
    selector: 'counter',
    template: '<h2>{{count}}</h2><button (click)="increaseCount()">Increase</button>'
})
export class CounterComponent {
    count: number = 0;

    increaseCount() {
        this.count++;
    }
}