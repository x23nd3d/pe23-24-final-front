export const getColors = (items) => {
  let colors = items.map((item) => item.color);
  colors = colors.flat();
  colors = [...new Set(colors)];
  return (colors = colors.sort((a, b) => a.localeCompare(b)));
};

export const joinClassNames = (className) =>
  className.replaceAll("/", " ").split(" ").join("");
