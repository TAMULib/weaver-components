import { ThemeVariants } from '../../shared/theme';
import * as fromThemeActions from './theme.actions';
import * as fromThemeReducers from './theme.reducers';

describe(' Theme Reducers', () => {

  const state =  {
    "themes":{
      "appleTheme":{
        "primary":{"baseColor":"red"}, "secondary":{"baseColor":"maroon"}, "success":{"baseColor":"apple"},
        "danger":{"baseColor":"grey"},"warning":{"baseColor":"pumpkin"}, "info":{"baseColor":"apple"},
        "light":{"baseColor":"tomato"}, "dark":{"baseColor":"yellow"}, "accent":{"baseColor":"tomato"}
      },
      "ballTheme":{
        "primary":{"baseColor":"blue"}, "secondary":{"baseColor":"blue"}, "success":{"baseColor":"blue"},
        "danger":{"baseColor":"blue"},"warning":{"baseColor":"blue"}, "info":{"baseColor":"blue"},
        "light":{"baseColor":"blue"}, "dark":{"baseColor":"blue"}, "accent":{"baseColor":"blue"}
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
    "primary":{"baseColor":"yellow"}, "secondary":{"baseColor":"yellow"}, "success":{"baseColor":"yellow"},
    "danger":{"baseColor":"yellow"},"warning":{"baseColor":"yellow"}, "info":{"baseColor":"yellow"},
    "light":{"baseColor":"yellow"}, "dark":{"baseColor":"yellow"}, "accent":{"baseColor":"yellow"}
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
    expect( JSON.stringify( fromThemeActions.select({name}).name ) ===
    JSON.stringify( fromThemeReducers.reducer(state, fromThemeActions.select({name})).currentTheme ))
      .toBe(true);
  });

});
