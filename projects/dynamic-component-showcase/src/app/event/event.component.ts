import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
    selector: 'event',
    template: '<h2>Event component...</h2>'
})
export class EventComponent implements OnInit {
    @Output() output: EventEmitter<string> = new EventEmitter();

    constructor() {}

    ngOnInit(): void {
        setTimeout(() => this.output.emit('EVENT....'), 1500);
    }
}