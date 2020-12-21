import * as fromRestActions from './rest.actions';
import { Request } from './request';
import * as fromRestReducers from './rest.reducers';

describe(' Rest Reducer', () => {

  const restRequestActionObj =  {
    "request":{
      "url":"https://api-dev.library.tamu.edu/directory-service/ldap/all-sorted",
      "method":"GET",
      "options":{}
    },
    "type":"[REST] Request"
  };

  it('should return the initial state', () => {
    const { initialState } = fromRestReducers;
    const action = {} as any;
    expect(fromRestReducers.reducer(undefined, action))
    .toBe(initialState);
  });

  it('should have rest request action as ', () => {
    const reducerObj = {
      "request":{
        "url":"https://api-dev.library.tamu.edu/directory-service/ldap/all-sorted",
        "method":"GET",
        "options":{}
      }
    };
    expect( JSON.stringify( fromRestReducers.reducer(fromRestReducers.initialState, restRequestActionObj ) ) === JSON.stringify(reducerObj))
    .toBe(true);
  });

});
