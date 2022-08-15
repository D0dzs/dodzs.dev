export function animateOnScroll(
  target: any,
  triggerPosition: any,
  activeClass: any,
  reversible = false
) {
  let targetEl = document.querySelectorAll(target);
  targetEl.forEach((el) => {
    let targetElTop = el.getBoundingClientRect().top;
    let windowHeight = window.innerHeight / 0.9;
    if (targetElTop <= windowHeight * triggerPosition) {
      el.classList.add(activeClass);
    } else if (targetElTop >= windowHeight && reversible) {
      el.classList.remove(activeClass);
    }
  });
}
