// Script for waterdrop
const waterIcon = document.querySelector('.section-top__icon');
window.addEventListener('scroll', () => {
  waterIcon.classList.toggle('splash', window.scrollY > 100);
});


// Script for section 2 -  Wave text
const waveSectionText = document.querySelector(".section-wave__text");
const originalFontSize = window.getComputedStyle(waveSectionText).fontSize;
const observerWaveText = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      waveSectionText.style.fontSize = entry.isIntersecting ? originalFontSize : "0";
    });
  },
  { rootMargin: "-20% 0%" }
);
observerWaveText.observe(document.querySelector(".section-wave"));


// Script for wave-animation
const waveIcon = document.querySelector('.section-wave__icon');
function handleWaveScroll() {
  const scrollPosition = window.pageYOffset;
  const scrollSpeed = scrollPosition * 0.7;
  waveIcon.style.backgroundPosition = `-${scrollSpeed}px 0`;
}
window.addEventListener('scroll', handleWaveScroll);


gsap.registerPlugin(ScrollTrigger); // Tells gsap to use scrolltrigger
function horizontalScroll() {
  gsap.set(".horizontal", { clearProps: "all" }); 
  const scroll = document.querySelectorAll(".horizontal .horizontal__container"); // Finds elements inside .horizontal and .horizontal__container and puts them inside a variable
  const isDesktop = window.innerWidth >= 1000;
  const isMobile = window.innerWidth < 1000; 
  let xPercentValue; // Sets a variable to store the amount percentage to move the cards horizontally.
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isDesktop && !prefersReducedMotion) { // This if statement will only work if the screensize is 1000px or more.
    // Desktop size
    xPercentValue = -79 * (scroll.length - 1); // Scrolls content to the left on website screen size  
  } else if(isMobile && !prefersReducedMotion){
    // Mobile size
    xPercentValue = -111 * (scroll.length - 1); // Scrolls content to the left on phone screen size
  }
  gsap.to(scroll, {
    xPercent: xPercentValue,
    scrollTrigger: {
      trigger: ".horizontal", // When content hits .horizontal section, it triggers the scrolling
      pin: true, // Content stays stuck on screen
      scrub: 1, // Make the scrolling to feel more smooth!
      end: "+=4000", // So the scrolling isn't so snappy!
    },
      ease: "power1.inOut"
  });
}
horizontalScroll(); // Calls when the site is loaded
window.addEventListener("resize", horizontalScroll);// If the window gets resized, run the horizontalScroll function again.
// This is for if you are first on desktop and moves to phone, the function needs to be called again, or else the scrolling will be on phone size. 


// Makes the page stop inside each section of the history
ScrollTrigger.create({
    trigger: ".history",
    start: "top top",
    end: () => "+=" + document.querySelector(".history").offsetHeight,
    pin: true,
    scrub: true,
});


// Button (Back to Top)
const backToTop = document.querySelector('.message__btn');
backToTop.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};