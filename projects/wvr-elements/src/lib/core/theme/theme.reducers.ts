import { createReducer, on } from '@ngrx/store';
import { ThemeVariants } from '../../shared/theme';
import * as DefaultDarkTheme from '../../shared/theme/default-dark-theme.json';
import * as DefaultTheme from '../../shared/theme/default-theme.json';
import * as ThemeActions from './theme.actions';

const defaultTheme: ThemeVariants = DefaultTheme;
const defaultDarkTheme: ThemeVariants = DefaultDarkTheme;

const unwrap = (theme: any): ThemeVariants => theme.default;

export interface State {
  themes: { [name: string]: ThemeVariants };
}

export const initialState: State = {
  themes: {
    default: unwrap(defaultTheme),
    defaultDark: unwrap(defaultDarkTheme)
  }
};

export const reducer = createReducer(
  initialState,
  on(ThemeActions.add, (state, { name, theme }) => {
    const themes = { ...state.themes };
    themes[name] = theme;

    return {
      ...state,
      themes
    };
  })
);
