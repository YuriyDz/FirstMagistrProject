export const comparator = (n, retT, retF) => {
  if (n === true) return retF;
  return retT;
};

export const changeData = (data, dataNew, type, index) => {
  let dataCopy = [...data];

  switch (type) {
    case "a":
      dataCopy.push(dataNew);
      break;
    case "m":
      dataCopy[index] = dataNew;
      break;
    case "d":
      dataCopy.splice(index, 1);
      break;
  }
  return dataCopy;
};
