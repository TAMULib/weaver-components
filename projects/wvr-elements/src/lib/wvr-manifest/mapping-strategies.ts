import { MappingStrategy } from './mapping-strategy';

const none: MappingStrategy = {
  map: data => data
};

const weaver: MappingStrategy = {
  map: data => data.payload[Object.keys(data.payload)[0]]
};

const jsonparse: MappingStrategy = {
  map: data => JSON.parse(data)
};

export {
  none,
  weaver,
  jsonparse
};
