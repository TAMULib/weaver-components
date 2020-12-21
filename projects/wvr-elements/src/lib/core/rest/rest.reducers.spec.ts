import * as fromRestActions from './rest.actions';
import { Request } from './request';
import * as fromRestReducers from './rest.reducers';

describe(' Rest Reducer', () => {
  const request: Request = {"url":"https://api-dev.library.tamu.edu/directory-service/ldap/all-sorted","method":"GET","options":{}};
  const restRequestActionObj =  {
    "request":{
      "url":"https://api-dev.library.tamu.edu/directory-service/ldap/all-sorted",
      "method":"GET",
      "options":{}
    },
    "type":"[REST] Request"
  };

  const responseObj = {
    Object: [{name: "a response"}],
    type: '[REST] Request Success'
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

  it("should have the request success action type as '[REST] Request Success' ", () => {
    expect(JSON.stringify( fromRestActions.requestSuccess.type) === JSON.stringify('[REST] Request Success') )
    .toBe(true);
  });

  it('should have a response ', () => {
    const reducerObj = {};
    expect( JSON.stringify( fromRestReducers.reducer( fromRestReducers.initialState, responseObj)) === JSON.stringify(reducerObj))
    .toBe(true);
    });

  });
