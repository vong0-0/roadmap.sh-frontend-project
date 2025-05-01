function handleIntersect(entires) {
  entires.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animated");
      // obsever.unobserve(entry.target);
    } else {
      entry.target.classList.remove("animated");
    }
  });
}

const fadeInEls = document.querySelectorAll("[data-fadeIn]");
const animateEls = document.querySelectorAll("[data-animation]");
const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0,
};
const obsever = new IntersectionObserver(handleIntersect, options);
fadeInEls.forEach((fadeInEl) => {
  obsever.observe(fadeInEl);
});
animateEls.forEach((animateEl) => {
  obsever.observe(animateEl);
});
