import { MemoizedSelector, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

/** Used to delay the repeated execution of the decorated method until the specified time has elapsed. */
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

// tslint:disable-next-line:only-arrow-functions
function WvrSelect<T, V>(option: SelectOptions): PropertyDecorator {
  // tslint:disable-next-line:only-arrow-functions
  // tslint:disable-next-line:typedef
  return function(target: any, propertyKey: string) {
    const getter = function(): Observable<V> {
      // tslint:disable-next-line:no-invalid-this
      return this.store.pipe(
        select(option.selector),
        filter(r => !!r)
      );
    };
    Object.defineProperty(target, propertyKey, {
      get: getter,
      enumerable: true,
      configurable: false
    });
  };
}

export {
  debounce,
  WvrSelect
};
