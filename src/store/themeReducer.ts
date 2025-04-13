export type ThemeState = {
  theme: 'light' | 'dark';
};

const initialState: ThemeState = {
  theme: 'light',
};

const TOGGLE_THEME = 'TOGGLE_THEME';

export const toggleTheme = () => ({
  type: TOGGLE_THEME,
} as const);

type ThemeAction = ReturnType<typeof toggleTheme>;

export default function themeReducer(
  state: ThemeState | undefined,
  action: ThemeAction,
): ThemeState {
  if (typeof state === 'undefined') return initialState;

  switch (action.type) {
    case TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };
    default:
      return state;
  }
}
