import "./home.scss";

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
