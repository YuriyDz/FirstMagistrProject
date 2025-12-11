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


export function addDays(dateString, daysToAdd) {
  // Розбиваємо вхідну дату

  let [year, month, day] = dateString.split("-").map(Number);

  // Функція перевірки високосного року
  function isLeap(y) {
    return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
  }

  // Дні в місяцях (без високосного лютого)
  const daysInMonthNormal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  while (daysToAdd > 0) {
    // Визначаємо кількість днів у поточному місяці
    let dim = daysInMonthNormal[month - 1];

    // Корекція для лютого високосного року
    if (month === 2 && isLeap(year)) {
      dim = 29;
    }

    // Скільки днів залишилося в цьому місяці
    let remaining = dim - day;

    if (daysToAdd <= remaining) {
      // Все вміщується в поточний місяць
      day += Number(daysToAdd);
      daysToAdd = 0;
    } else {
      // Переходимо в наступний місяць
      daysToAdd -= remaining + 1;
      day = 1;
      month++;

      if (month > 12) {
        month = 1;
        year++;
      }
    }
  }

  // Форматуємо назад у YYYY-MM-DD
  const mm = month < 10 ? "0" + month : month;
  const dd = day < 10 ? "0" + day : day;
  console.log(`${year}-${mm}-${dd}`);
  return `${year}-${mm}-${dd}`;
}

export const getValidData = (data) => {
  return String(data).length === 1 ? "0" + data : data;
};
