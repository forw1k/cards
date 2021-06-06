import "./home.scss";

const cardTriggers = document.querySelectorAll(".cards__info");
const inners = document.querySelectorAll(".cards__inner");
const icons = document.querySelectorAll(".cards__icon");

cardTriggers.forEach((cardTrigger, index) => {
  cardTrigger.addEventListener("click", function () {
    const faqInner = this.nextElementSibling;
    if (faqInner.style.maxHeight) {
      faqInner.style.maxHeight = null;
      icons[index].style.transform = "rotate(" + 0 + "deg)";
    } else {
      faqInner.style.maxHeight = faqInner.scrollHeight + "px";
      icons[index].style.transform = "rotate(" + 180 + "deg)";
    }
  });
});

const descTriggers = document.querySelectorAll(".desc__top");
const descImg = document.querySelectorAll(".desc__img");

descTriggers.forEach((descTrigger, index) => {
  descTrigger.addEventListener("click", function () {
    const faqInner = this.nextElementSibling;
    if (faqInner.style.maxHeight) {
      faqInner.style.maxHeight = null;
      descImg[index].style.transform = "rotate(" + 0 + "deg)";
    } else {
      faqInner.style.maxHeight = faqInner.scrollHeight + "px";
      descImg[index].style.transform = "rotate(" + 180 + "deg)";
    }
  });
});
