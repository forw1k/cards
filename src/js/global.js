import "../scss/main.scss";
import db from "../data/database.json";

const monthsRu = [
  "Января",
  "Февраля",
  "Марта",
  "Апреля",
  "Мая",
  "Июня",
  "Июля",
  "Августа",
  "Сентября",
  "Октября",
  "Ноября",
  "Декабря",
];

const formatDate = (date, months) => {
  const newDate = new Date(date);
  const month = newDate.getMonth();
  const day = newDate.getDate();
  const myDate = `${day} ${months[month]}`;

  return myDate;
};

const filterRemoved = (data) => data.filter((item) => item.removed === 0);

const changeDate = (data) =>
  data.map((item) => ({ ...item, date: formatDate(item.date, monthsRu) }));

const getItemTotal = (price, quantity) =>
  Math.round(price * quantity * 100) / 100;

const getItemsTotal = (total, itemTotal) =>
  Math.round((total + itemTotal) * 100) / 100;

const sortByDate = (data) => {
  let sortedByDay = {};

  data.forEach((item) => {
    if (!sortedByDay[item.date]) {
      sortedByDay[item.date] = {
        date: item.date,
        items: {},
        total: 0,
      };
    }

    if (!sortedByDay[item.date].items[item.id]) {
      sortedByDay[item.date].items[item.id] = {
        type: item.type,
        id: item.id,
        total: 0,
        item: [],
      };
    }

    const itemTotal = getItemTotal(item.price, item.quantity);
    const itemsTotal = getItemsTotal(
      sortedByDay[item.date].items[item.id].total,
      itemTotal
    );

    sortedByDay[item.date].total += itemTotal;

    sortedByDay[item.date].items[item.id].total = itemsTotal;

    sortedByDay[item.date].items[item.id].item.push({
      image: item.image,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      total: itemTotal,
    });
  });

  return Object.keys(sortedByDay).map((key) => {
    sortedByDay[key].items = Object.keys(sortedByDay[key].items).map(
      (key2) => sortedByDay[key].items[key2]
    );
    return sortedByDay[key];
  });
};

const addDataToTemplate = (data) => {
  const cardListElement = document.querySelector(".card__list");
  const template = require("../views/templates/about/about.hbs");
  const context = { list: data };
  const html = template(context);

  cardListElement.innerHTML = html;
};

const filterDb = filterRemoved(db);
const changedDateDb = changeDate(filterDb);
const resultedData = sortByDate(changedDateDb);

addDataToTemplate(resultedData);

//


const cardTriggers = document.querySelectorAll(".cards__info");
const inners = document.querySelectorAll(".cards__inner");
const icons = document.querySelectorAll(".cards__icon");
const descBottom = document.querySelectorAll(".desc__item");
const descTriggers = document.querySelectorAll(".desc__top");
const descImg = document.querySelectorAll(".desc__img");

cardTriggers.forEach((cardTrigger, index) => {
  cardTrigger.addEventListener("click", function () {
    if (inners[index].style.maxHeight) {
      inners[index].style.maxHeight = null;
      icons[index].style.transform = "rotate(" + 0 + "deg)";
    } else {
      inners[index].style.maxHeight =  100 + "%";
      icons[index].style.transform = "rotate(" + 180 + "deg)";
    }
  });
});

descTriggers.forEach((descTrigger, index) => {
  descTrigger.addEventListener("click", function () {
    const faqInner = this.nextElementSibling;
    if (faqInner.style.maxHeight) {
      faqInner.style.maxHeight = null;
      descImg[index].style.transform = "rotate(" + 0 + "deg)";
      descBottom[index].style.overflow = 'hidden';
    } else {
      faqInner.style.maxHeight = faqInner.scrollHeight + "%";
      descImg[index].style.transform = "rotate(" + 180 + "deg)";
      descBottom[index].style.overflow = 'visible';
    }
  });
});
