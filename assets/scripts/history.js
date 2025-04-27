const sectionEls = document.querySelectorAll(".hidden-font");

// Options for the IntersectionObserver
const options = {
    rootMargin: "-10% 0%"  // Adjust margin as needed
};

// Callback function for the IntersectionObserver
function intersectionCb(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // When the section is visible, remove the 'hidden' class
            entry.target.classList.remove(entry.target.dataset.hidden);
        } else {
            // When the section is invisible, add the 'hidden' class
            entry.target.classList.add(entry.target.dataset.hidden);
        }
    });
}

// Create the IntersectionObserver instance
const observe = new IntersectionObserver(intersectionCb, options);

// Observe each target element
sectionEls.forEach(el => {
    observe.observe(el);
});
