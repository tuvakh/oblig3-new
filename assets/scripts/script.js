
// For the .hidden-font elements
const hiddenFonts = document.querySelectorAll(".hidden-font");
// Options for the IntersectionObserver
const hiddenFontOptions = {
    rootMargin: "-10% 0%"  // Adjust margin as needed
};
// Callback function for the IntersectionObserver for hidden-font elements
function hiddenFontIntersectionCb(entries) {
    entries.forEach(entry => {
        const target = entry.target;
        if (entry.isIntersecting) {
            // When the section is visible, remove the 'hidden' class
            target.classList.remove(target.dataset.hidden);
            // Adjust font-size when the element is visible
            target.style.fontSize = "120%"; // Font size when element is visible
        } else {
            // When the section is invisible, add the 'hidden' class
            target.classList.add(target.dataset.hidden);
            // Adjust font-size when element is not visible
            target.style.fontSize = "0"; // Font size when element is not visible (hidden)
        }
    });
}
// Create the IntersectionObserver instance for hidden-font
const hiddenFontObserver = new IntersectionObserver(hiddenFontIntersectionCb, hiddenFontOptions);
// Observe each target element
hiddenFonts.forEach(el => {
    hiddenFontObserver.observe(el);
});

// For the .growing-plant elements
const growingPlant = document.querySelectorAll(".history__plant-img");
// Options for the IntersectionObserver for growing-plant
const growingPlantOptions = {
    rootMargin: "-10% 0%"  // Adjust margin as needed
};
// Callback function for the IntersectionObserver for growing-plant elements
function growingPlantIntersectionCb(entries) {
    entries.forEach(entry => {
        const target = entry.target;
        if (entry.isIntersecting) {
            // When the section is visible, remove the 'hidden' class
            target.classList.remove(target.dataset.hidden);
            // Adjust height when the element is visible
            target.style.height = "20%"; // Height when element is visible
        } else {
            // When the section is invisible, add the 'hidden' class
            target.classList.add(target.dataset.hidden);
            // Adjust height when element is not visible
            target.style.height = "0"; // Height when element is not visible (hidden)
        }
    });
}
// Create the IntersectionObserver instance for growing-plant
const growingPlantObserver = new IntersectionObserver(growingPlantIntersectionCb, growingPlantOptions);
// Observe each target element
growingPlant.forEach(el => {
    growingPlantObserver.observe(el);
});



// For the .growing-river elements
const growingRiver = document.querySelectorAll(".history__river");
// Options for the IntersectionObserver for growing-river
const growingRiverOptions = {
    rootMargin: "-10% 0%"  // Adjust margin as needed
};
// Callback function for the IntersectionObserver for growing-river elements
function growingRiverIntersectionCb(entries) {
    entries.forEach(entry => {
        const target = entry.target;
        if (entry.isIntersecting) {
            // When the section is visible, remove the 'hidden' class
            target.classList.remove(target.dataset.hidden);
            // Adjust height when the element is visible
            target.style.width = "100%"; 
            target.style.left = "0";
        } else {
            // When the section is invisible, add the 'hidden' class
            target.classList.add(target.dataset.hidden);
            // Adjust height when element is not visible
            target.style.width = "0";
        }
    });
}
// Create the IntersectionObserver instance for growing-river
const growingRiverObserver = new IntersectionObserver(growingRiverIntersectionCb, growingRiverOptions);
// Observe each target element
growingRiver.forEach(el => {
    growingRiverObserver.observe(el);
});


// For the .earth elements
const earth = document.querySelectorAll(".history__earth-img");
// Options for the IntersectionObserver for earth
const earthOptions = {
    rootMargin: "-10% 0%"  // Adjust margin as needed
};
// Callback function for the IntersectionObserver for earth elements
function earthIntersectionCb(entries) {
    entries.forEach(entry => {
        const target = entry.target;
        if (entry.isIntersecting) {
            // When the section is visible, remove the 'hidden' class
            target.classList.remove(target.dataset.hidden);
            // Adjust height when the element is visible
            target.style.transform = "rotate(180deg)"; // Height when element is visible
        } else {
            // When the section is invisible, add the 'hidden' class
            target.classList.add(target.dataset.hidden);
            // Adjust height when element is not visible
            target.style.transform = "rotate(0deg)";
        }
    });
}
// Create the IntersectionObserver instance for earth
const earthObserver = new IntersectionObserver(earthIntersectionCb, earthOptions);
// Observe each target element
earth.forEach(el => {
    earthObserver.observe(el);
});


// For the .written elements
const written = document.querySelectorAll(".history__text--written-firstline, .history__text--written-secondline");
// Options for the IntersectionObserver for earth
const writtenOptions = {
    rootMargin: "-10% 0%"  // Adjust margin as needed
};
// Callback function for the IntersectionObserver for earth elements
function writtenIntersectionCb(entries) {
    entries.forEach(entry => {
        const target = entry.target;
        if (entry.isIntersecting) {
            // When the section is visible, remove the 'hidden' class
            target.classList.remove(target.dataset.hidden);
            // Adjust height when the element is visible
            target.style.width = "100%";
        } else {
            // When the section is invisible, add the 'hidden' class
            target.classList.add(target.dataset.hidden);
            // Adjust height when element is not visible
            target.style.width = "0";
        }
    });
}
// Create the IntersectionObserver instance for written
const writtenObserver = new IntersectionObserver(writtenIntersectionCb, writtenOptions);
// Observe each target element
written.forEach(el => {
    writtenObserver.observe(el);
});
