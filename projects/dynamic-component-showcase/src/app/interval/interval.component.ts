import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'interval',
    template: '<h2>{{count}}</h2>'
})
export class IntervalComponent implements OnInit {
    count: number = 0;
    @Input() increase: number = 1;
    @Input() timer: number = 2000;

    constructor() {
    }

    ngOnInit(): void {
        console.log(this.timer, this.increase);
        setInterval(() => this.count+= this.increase, this.timer);
    }
}