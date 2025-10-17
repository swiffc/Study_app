// Design System Entry Point
export * from './colors';
export * from './typography';
export * from './spacing';
export * from './breakpoints';

// Theme configuration
export const theme = {
  colors: {} as typeof import('./colors').colors,
  typography: {} as typeof import('./typography').typography,
  spacing: {} as typeof import('./spacing').spacing,
  breakpoints: {} as typeof import('./breakpoints').breakpoints,
} as const;
