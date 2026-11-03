import { animate } from 'motion/mini';
import VanillaTilt from 'vanilla-tilt';

const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const pointer = matchMedia('(hover: hover) and (pointer: fine)');
const card = document.querySelector('.identity-card');
const hero = document.querySelector('.hero');
const nav = document.querySelector('.nav');
const tiltCards = [...document.querySelectorAll('.cert, .article')];
const active = new Set();
let observer;

// Nav compresses once the page scrolls.
function onScroll() { nav?.classList.toggle('scrolled', scrollY > 24); }
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Hero idle loops (orbits, spark, pulse) pause when the hero leaves the viewport.
if (hero && 'IntersectionObserver' in window) {
  new IntersectionObserver(([entry]) => hero.classList.toggle('paused', !entry.isIntersecting)).observe(hero);
}

// 3D depth: the identity card tilts toward the pointer and its layers separate in Z.
function updateTilt() {
  card?.vanillaTilt?.destroy();
  tiltCards.forEach(el => el.vanillaTilt?.destroy());
  if (!pointer.matches || reduced.matches) return;
  if (card) VanillaTilt.init(card, { max: 9, perspective: 1100, scale: 1.02, speed: 900, glare: true, 'max-glare': .14, gyroscope: false, easing: 'cubic-bezier(.16,1,.3,1)' });
  tiltCards.forEach(el => VanillaTilt.init(el, { max: 4, perspective: 1000, scale: 1.01, speed: 700, glare: true, 'max-glare': .1, gyroscope: false, easing: 'cubic-bezier(.16,1,.3,1)' }));
}

// Lists arrive as lists: siblings stagger in, capped so nothing waits long.
function reveal(element, index) {
  if (reduced.matches || !Element.prototype.animate) return;
  const animation = animate(element,
    { opacity: [.35, 1], transform: ['translateY(18px)', 'translateY(0)'] },
    { duration: .7, delay: Math.min(index, 6) * .07, ease: [.16, 1, .3, 1] });
  active.add(animation);
  animation.then(() => { animation.cancel(); active.delete(animation); });
}

const groups = ['.timeline', '.skills', '.education', '.certs', '.insights', '.facts'];
if (!reduced.matches && 'IntersectionObserver' in window) {
  observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    observer.unobserve(entry.target);
    [...entry.target.children].forEach(reveal);
  }), { threshold: .15 });
  groups.forEach(selector => document.querySelectorAll(selector).forEach(group => observer.observe(group)));
}

reduced.addEventListener('change', () => {
  observer?.disconnect();
  active.forEach(a => a.cancel());
  active.clear();
  updateTilt();
});
pointer.addEventListener('change', updateTilt);
updateTilt();
