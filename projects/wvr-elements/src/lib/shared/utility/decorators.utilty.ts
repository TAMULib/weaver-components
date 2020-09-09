const debounce = (delay = 300): MethodDecorator => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
  const timeoutKey = Symbol();
  const original = descriptor.value;
  descriptor.value = (...args) => {
    // tslint:disable-next-line:no-invalid-this
    clearTimeout(this[timeoutKey]);
    // tslint:disable-next-line:no-invalid-this
    this[timeoutKey] = setTimeout(() => original.apply(this, args), delay);
  };

  return descriptor;
};

export {
  debounce
};
