/**
 * VueのRef()みたいな関数
 * @param value
 * @returns
 */
export const data = <T>(value: T | undefined) => {
  const state: { value: T | undefined } = { value };
  const handler = {
    get: function (target: typeof state, property: "value") {
      return target[property];
    },
    set: function (target: typeof state, property: "value", value: T) {
      target[property] = value;
      return true;
    },
  };
  return new Proxy(state, handler);
};
