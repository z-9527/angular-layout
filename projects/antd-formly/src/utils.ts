export function createLabelArr(arr) {
  if (!Array.isArray(arr)) {
    return [];
  }
  return arr.map((item) => {
    if (typeof item === 'string' || typeof item === 'number') {
      return {
        value: item,
        label: item,
      };
    }
    return item;
  });
}
