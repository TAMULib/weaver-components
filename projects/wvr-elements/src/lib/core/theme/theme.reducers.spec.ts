import { ThemeVariants } from '../../shared/theme';
import * as fromThemeActions from './theme.actions';
import * as fromThemeReducers from './theme.reducers';

describe(' Theme Reducers', () => {

  const state =  {
    "themes":{
      "appleTheme":{
        "primary":{"baseColor":"yellow"}, "primaryAccent":{"baseColor":"yellow"}, "primaryNeutral":{"baseColor":"yellow"},
        "secondary":{"baseColor":"yellow"}, "secondaryAccent":{"baseColor":"yellow"}, "secondaryNeutral":{"baseColor":"yellow"},
        "success":{"baseColor":"yellow"}, "danger":{"baseColor":"yellow"},"warning":{"baseColor":"yellow"}, "info":{"baseColor":"yellow"},
        "light":{"baseColor":"yellow"}, "dark":{"baseColor":"yellow"}
      },
      "ballTheme":{
        "primary":{"baseColor":"yellow"}, "primaryAccent":{"baseColor":"yellow"}, "primaryNeutral":{"baseColor":"yellow"},
        "secondary":{"baseColor":"yellow"}, "secondaryAccent":{"baseColor":"yellow"}, "secondaryNeutral":{"baseColor":"yellow"},
        "success":{"baseColor":"yellow"}, "danger":{"baseColor":"yellow"},"warning":{"baseColor":"yellow"}, "info":{"baseColor":"yellow"},
        "light":{"baseColor":"yellow"}, "dark":{"baseColor":"yellow"}
      }
    },
    "currentTheme":"ballTheme"
  }

  it('should return the initial state', () => {
    const { initialState } = fromThemeReducers;
    const action = {} as any;
    expect(fromThemeReducers.reducer(undefined, action))
    .toBe(initialState);
  });

  const name = 'appleTheme';
  const theme: ThemeVariants = {
    "primary":{"baseColor":"yellow"}, "primaryAccent":{"baseColor":"yellow"}, "primaryNeutral":{"baseColor":"yellow"},
    "secondary":{"baseColor":"yellow"}, "secondaryAccent":{"baseColor":"yellow"}, "secondaryNeutral":{"baseColor":"yellow"},
    "success":{"baseColor":"yellow"}, "danger":{"baseColor":"yellow"},"warning":{"baseColor":"yellow"}, "info":{"baseColor":"yellow"},
    "light":{"baseColor":"yellow"}, "dark":{"baseColor":"yellow"}
  };

  it('should add theme', () => {
    const reducerThemesObj = fromThemeReducers.reducer(state, fromThemeActions.add( {name, theme})).themes;
    const actionObj = fromThemeActions.add( {name, theme});
    Object.keys(reducerThemesObj).forEach(key => {
      if(key === name) {
        expect(JSON.stringify( reducerThemesObj[key]) === JSON.stringify(actionObj.theme))
          .toBe(true);
      }
    });
  });

  it(' should select a theme', () => {
    expect( fromThemeActions.select({name}).name === fromThemeReducers.reducer(state, fromThemeActions.select({name})).currentTheme )
      .toBe(true);
  });

});
