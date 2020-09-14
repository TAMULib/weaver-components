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

export {
  debounce
};
