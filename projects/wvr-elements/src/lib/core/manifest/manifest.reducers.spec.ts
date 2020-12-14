import { Manifest } from './manifest';
import { ManifestEntry } from './manifest-entry';
import * as fromManifestReducers from './manifest.reducers';
import * as fromManifestActions from './manifest.actions';

describe('ManifestReducer', () => {
  describe('undefined action', () => {
    it('should return the initial state', () => {
      const { initialState } = fromManifestReducers;
      const action = {} as any;
      const state = fromManifestReducers.reducer(undefined, action);

      expect(state)
      .toBe(initialState);
    });

    describe('selectManifestByName', () => {
      it('should select manifest by name', () => {
        const manifest1: Manifest = {
          name: 'Manifest One',
          baseUrl: 'http://www.google.com',
          entries: []
        };

        expect(fromManifestReducers.selectManifestByName(manifest1))
        .toEqual(manifest1.name);
      });
    });
  });

});
