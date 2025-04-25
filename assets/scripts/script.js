gsap.registerPlugin(ScrollTrigger);
const contents = gsap.utils.toArray(".horizontal .horizontal__container");

gsap.to(contents, {
    xPercent: -80 * (contents.length - 1),
    scrollTrigger: {
        trigger: ".horizontal",
        pin: true,
        scrub: 1,
        snap: 1 / (contents.length - 1),
        end: () => "+=" + document.querySelector('.horizontal').offsetWidth
    }
});