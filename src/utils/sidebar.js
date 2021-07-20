const logger = (text) => text;

export const getArrayWithUniqueFlatSortedItems = (
  items,
  category,
  ascent = true
) => {
  // * make a array of a uniqe elements ascent/descent
  let colors = items.map((item) => item[category]);
  colors = colors.flat();
  colors = [...new Set(colors)];
  colors = colors.sort((a, b) =>
    ascent ? a.localeCompare(b) : b.localeCompare(a)
  );

  return colors;
};

export default logger;
