import dayjs from "dayjs";

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

export const getFormat = () => {
  const now = new Date();
  return now.getHours() + ":" + now.getMinutes();
};

export const getValidData = (data) => {
  return String(data).length === 1 ? "0" + data : data;
};

export const getNumberDaysToTargetData = (dateG) => {
  const today = new Date(); // поточна дата пристрою

  const targetDate = new Date(dateG); // дата, яку передали у функцію

  const diffMs = targetDate - today;

  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  return diffDays < 0 ? -1 : diffDays;
};

export const setNewParam = (data) => {
  //{name: "afsff", date: "", type: -1}
  for (let i in data) {
    const ttdl = getNumberDaysToTargetData(data[i].date);

    if (ttdl === -1 && data[i].type > -1) {
      data[i].date = addDays(data[i].date, data[i].type * 2);
    }

    data[i] = {
      ...data[i],
      dtd: getNumberDaysToTargetData(data[i].date), //days to day
    };
  }
  return data;
};

export const getMinutesSub = (nowMin, eqMin, poh) => {
  const minHour = nowMin.split(":");
  const minNow = Number(minHour[1]) + 60 * Number(minHour[0]);
  const minHour1 = eqMin.split(":");
  const minEq = Number(minHour1[1]) + 60 * Number(minHour1[0]);

  if (Math.abs(minNow - minEq) < poh) {
    return true;
  }
  return false;
};
