gsap.registerPlugin(ScrollTrigger);
const contents = gsap.utils.toArray(".horizontal-scroll .horizontal");

gsap.to(contents, {
    xPercent: -100 * (contents.length - 1),
    scrollTrigger: {
        trigger: ".horizontal-scroll",
        pin: true,
        scrub: 1,
    }
});