import { ChangeDetectorRef, Component, ComponentRef, EventEmitter, HostBinding, Injector, NgModuleRef, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'dynamic-component',
  templateUrl: 'dynamic-component.component.html',
})
export class DynamicComponent implements OnInit {
  @ViewChild('root', { read: ViewContainerRef, static: true }) viewContainerRef?: ViewContainerRef;

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {}

  load<T>(component: Type<T>, options?: {
    index?: number;
    injector?: Injector;
    ngModuleRef?: NgModuleRef<unknown>;
    projectableNodes?: Node[][];
    parameters?: ComponentParameters;
    outputs?: ComponentOutputs;
  }): ComponentRef<T> {
    if (!this.viewContainerRef) throw Error(`viewContainerRef don't exists...`);
    this.viewContainerRef.clear();
    const createdComponent = this.viewContainerRef.createComponent(component, options);

    this.handleParameters(createdComponent, options?.parameters);
    this.handleOutputs(createdComponent, options?.outputs);
    this.changeDetectorRef.detectChanges();
    return createdComponent;
  }

  private handleParameters(component: ComponentRef<any>, parameters?: ComponentParameters) {
    if (!parameters) return;
    Object.keys(parameters)
      .forEach(key => {
        (component.instance as any)[key] = parameters[key]
      });
  }
  
  private handleOutputs(component: ComponentRef<any>, outputs?: ComponentOutputs) {
    if (!outputs) return;
    Object.keys(outputs)
      .forEach(key => {
        if (!((component.instance as any)[key] != null && (component.instance as any)[key] instanceof EventEmitter)) return;
        const event = outputs[key];
        (component.instance as any)[key].subscribe(event.next, event.error, event.complete)
      })
  }
}

export interface ComponentParameters {
  [key: string]: any
}

export interface ComponentOutputs {
  [key: string]: {
    next?: (object: any) => void,
    error?: (error: any) => void,
    complete?: () => void
  }
}
