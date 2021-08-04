export const sortByName = (array, condition) =>
  array.sort((a, b) =>
    condition === true
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );

export const sortByPrice = (array, condition) =>
  array.sort((a, b) =>
    condition === false ? a.price - b.price : b.price - a.price
  );
