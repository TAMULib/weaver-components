import { Injector } from '@angular/core';
import { MemoizedSelector, select, Selector, Store } from '@ngrx/store';
import { WvrLibModule } from '../../wvr-lib.module';
import { WvrBaseComponent } from '../wvr-base.component';

// tslint:disable-next-line:only-arrow-functions
function debounce(delay = 300): MethodDecorator {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {

    const timeoutKey = Symbol();
    const original = descriptor.value;
    // tslint:disable-next-line:typedef
    descriptor.value = function(...args) {
      // tslint:disable-next-line:no-invalid-this
      clearTimeout(this[timeoutKey]);
      // tslint:disable-next-line:no-invalid-this
      this[timeoutKey] = setTimeout(() => original.apply(this, args), delay);
    };

    return descriptor;
  };
}

export interface SelectOptions {
  selector: MemoizedSelector<any, any>;
}

let injector: Injector;
const initiliaizeInjector = (inj: Injector) => {
  injector = inj;
};

// tslint:disable-next-line:only-arrow-functions
function WvrSelect<T, V>(option: SelectOptions): PropertyDecorator {
  return (target: any, propertyKey: string) => {
    const store = injector
    .get(Store);
    const selector = option.selector;
    target[propertyKey] = store
      .pipe(selector(selector));
  };
}

export {
  debounce,
  WvrSelect,
  initiliaizeInjector
};
