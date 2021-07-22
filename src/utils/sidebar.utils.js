export const getColorsArray = (sourse) => {
  const colors = sourse.map((item) => item.color).flat();
  return [...new Set(colors)].sort((a, b) => a.localeCompare(b));
};

export const fixClassNames = (className) =>
  className.replaceAll("/", " ").split(" ").join("");

export const getMinMaxPrice = (source) => {
  const minMaxPrice = source.map((item) => +item.price);
  return {
    min: Math.min(...minMaxPrice),
    max: Math.max(...minMaxPrice),
  };
};

export const signature = "Phil still strugling with the filters";
