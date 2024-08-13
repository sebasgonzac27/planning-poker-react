import "@testing-library/jest-dom";
global.setImmediate =
  global.setImmediate ||
  ((fn: () => void, ...args: unknown[]) => global.setTimeout(fn, 0, ...args));
