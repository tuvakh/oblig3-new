// Script for waterdrop (scroll-activated)
// Makes the water drop icon to add/remove the "splash" effect, when you scroll down past 100 pixels.
const waterIcon = document.querySelector('.section-top__icon');
window.addEventListener('scroll', () => {
  waterIcon.classList.toggle('splash', window.scrollY > 100);
});


// Script for section 2 -  Wave text
/* Uses Intersection Observer to make text appear/disappear by adjusting font size as the section enters/exits the viewport 
(with a 20% scroll buffer)*/
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
// Moves the wave-background horizontally as you scroll. The 0.7 multiplier slows the wave, creating a smooth wave effect.
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
  let xPercentValue; // Sets a variable to store the amount percentage to move the cards horizontally.
  if (window.innerWidth >= 1000) { // This if statement will only work if the screensize is 1000px or more.
    // Desktop size
    xPercentValue = -79 * (scroll.length - 1); // Scrolls content to the left on website screen size  
  } else {
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

// https://gsap.com/docs/v3/Plugins/ScrollTrigger/?page=1 This helped us with implementing gsap scrolltrigger


//gsap.registerPlugin(ScrollTrigger);
// Makes the page stop inside each section of the history
ScrollTrigger.create({
    trigger: ".history",
    start: "top top",
    end: () => "+=" + document.querySelector(".history").offsetHeight,
    pin: true,
    scrub: true,
});


// Button (Back to Top)
// Scrolls the page to the top with a gradual animation using behavior: 'smooth' when clicked, avoiding an instant jump.
const backToTop = document.querySelector('.message__btn');
backToTop.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};