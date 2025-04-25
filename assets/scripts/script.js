/*gsap.registerPlugin(ScrollTrigger);
const contents = gsap.utils.toArray(".horizontal .horizontal__container");

gsap.to(contents, {
    xPercent: -80 * (contents.length - 1),
    scrollTrigger: {
        trigger: ".horizontal",
        pin: true,
        scrub: 1,
    }
}); */

gsap.registerPlugin(ScrollTrigger);

function setupHorizontalScroll() {
  // Clean up any previous ScrollTriggers and transforms
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  gsap.set(".horizontal .horizontal__container", { clearProps: "all" });

  if (window.innerWidth >= 800) {
    const contents = gsap.utils.toArray(".horizontal .horizontal__container");
    gsap.to(contents, {
      xPercent: -80 * (contents.length - 1),
      scrollTrigger: {
        trigger: ".horizontal",
        pin: true,
        scrub: 1,
        snap: 1 / (contents.length - 1),
        start: "top top", // Animation starts as soon as section hits top
        end: () => "+=" + document.querySelector('.horizontal').offsetWidth,
        invalidateOnRefresh: true
      }
    });
  } else {
    // On small screens, make sure everything is reset
    gsap.set(".horizontal .horizontal__container", { x: 0 });
    // No ScrollTrigger animation
  }
}

// Run once on load
setupHorizontalScroll();

// Re-run on resize to adapt to screen changes
window.addEventListener("resize", setupHorizontalScroll);




// Use GSAP's matchMedia for responsive handling
/*
const mm = gsap.matchMedia();

// Desktop (≥800px)
mm.add("(min-width: 800px)", () => {
  const contents = gsap.utils.toArray(".horizontal .horizontal__container");
  
  const horizontalTween = gsap.to(contents, {
    xPercent: -80 * (contents.length - 1),
    scrollTrigger: {
      trigger: ".horizontal",
      pin: true,
      scrub: 1,
      snap: 1 / (contents.length - 1),
      end: () => "+=" + document.querySelector('.horizontal').offsetWidth,
      invalidateOnRefresh: true
    }
  });

  // Return cleanup function
  return () => {
    horizontalTween.scrollTrigger?.kill();
    horizontalTween.kill();
  };
});

// Mobile (<800px)
mm.add("(max-width: 799px)", () => {
  // Kill all ScrollTriggers and reset positions
  gsap.set(".horizontal .horizontal__container", { x: 0 });
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
});*/


