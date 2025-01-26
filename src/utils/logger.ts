import { createConsola } from "consola";

const consola = createConsola({
  formatOptions: {
    date: false,
    colors: true,
    compact: true,
  },
  defaults: {
    tag: "@devcodes-sdk/mongo-clone",
  },
});

export const createLogger = (options?: { disabled: boolean }) => {
  return {
    log: (...args: unknown[]) => {
      if (!options?.disabled) consola.log("", ...args);
    },
    error: (...args: unknown[]) => {
      if (!options?.disabled) consola.error("", ...args);
    },
    warn: (...args: unknown[]) => {
      if (!options?.disabled) consola.warn("", ...args);
    },
    info: (...args: unknown[]) => {
      if (!options?.disabled) consola.info("", ...args);
    },
    debug: (...args: unknown[]) => {
      if (!options?.disabled) consola.debug("", ...args);
    },
    box: (...args: unknown[]) => {
      if (!options?.disabled) consola.box("", ...args);
    },
    success: (...args: unknown[]) => {
      if (!options?.disabled) consola.success("", ...args);
    },
    start: (...args: unknown[]) => {
      if (!options?.disabled) consola.start("", ...args);
    },
    break: () => {
      if (!options?.disabled) console.log("\n");
    },
  };
};

export const logger = createLogger();
