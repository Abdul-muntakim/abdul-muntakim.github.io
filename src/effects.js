import { animate } from 'motion/mini';
import VanillaTilt from 'vanilla-tilt';
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const pointer = matchMedia('(hover: hover) and (pointer: fine)');
const art = document.querySelector('.monogram-scene');
const active = new Set();
let observer;
function reveal(element) {
  if (reduced.matches || !Element.prototype.animate) return;
  const animation = animate(element, {opacity:[.5,1],transform:['translateY(16px)','translateY(0)']}, {duration:.65,ease:[.22,1,.36,1]});
  active.add(animation);
  animation.then(()=>{animation.cancel();active.delete(animation)});
}
function updateTilt() {
  art?.vanillaTilt?.destroy();
  if (art && pointer.matches && !reduced.matches) VanillaTilt.init(art,{max:5,perspective:1000,scale:1,speed:600,gyroscope:false});
}
if (!reduced.matches && 'IntersectionObserver' in window) {
  observer = new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){observer.unobserve(entry.target);reveal(entry.target)}
  }),{threshold:.1});
  document.querySelectorAll('section h2,.item,.cert,.article,.edu').forEach(element=>observer.observe(element));
  const title=document.querySelector('h1');if(title)reveal(title);
}
reduced.addEventListener('change',()=>{observer?.disconnect();active.forEach(a=>a.cancel());active.clear();updateTilt()});
pointer.addEventListener('change',updateTilt);
updateTilt();
