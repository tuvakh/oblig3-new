const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// WATERDROP
const waterIcon = document.querySelector('.history__drop');
const target = document.querySelector('.history__part--intro');

// Intersection Observer for icon animation
const observer = new IntersectionObserver(
    ([entry]) => {
        waterIcon.classList.toggle('splash', entry.isIntersecting);
    },
    {
        threshold: 0.1, 
    }
);
  
observer.observe(target);

// WALKING GIRL ANIMATION
const girl = document.querySelector('.horizontal__character');
const frames = ['maya-walking1.svg', 'maya-walking2.svg'];
let frameIndex = 0;

if (!reduceMotion) {
  setInterval(() => {
    frameIndex = (frameIndex + 1) % frames.length;
    girl.src = `assets/elements/${frames[frameIndex]}`;
  }, 500);
} else {
  // Show first frame statically if reduced motion
  girl.src = `assets/elements/${frames[0]}`;
}

// HIDDEN FONT
const hiddenFonts = document.querySelectorAll(".hidden-font");
const hiddenFontOptions = { rootMargin: "-10% 0%" };

function hiddenFontIntersectionCb(entries) {
  entries.forEach(entry => {
    const target = entry.target;
    if (reduceMotion) {
      // Always show visible state if reduced motion
      target.classList.remove(target.dataset.hidden);
      target.style.fontSize = "120%";
    } else {
      if (entry.isIntersecting) {
        target.classList.remove(target.dataset.hidden);
        target.style.fontSize = "120%";
      } else {
        target.classList.add(target.dataset.hidden);
        target.style.fontSize = "0";
      }
    }
  });
}

const hiddenFontObserver = new IntersectionObserver(hiddenFontIntersectionCb, hiddenFontOptions);
hiddenFonts.forEach(el => hiddenFontObserver.observe(el));

// GROWING PLANT
const growingPlant = document.querySelectorAll(".history__plant-img");
const growingPlantOptions = { rootMargin: "-10% 0%" };

function growingPlantIntersectionCb(entries) {
  entries.forEach(entry => {
    const target = entry.target;
    if (reduceMotion) {
      target.classList.remove(target.dataset.hidden);
      target.style.height = "20%";
    } else {
      if (entry.isIntersecting) {
        target.classList.remove(target.dataset.hidden);
        target.style.height = "20%";
      } else {
        target.classList.add(target.dataset.hidden);
        target.style.height = "0";
      }
    }
  });
}

const growingPlantObserver = new IntersectionObserver(growingPlantIntersectionCb, growingPlantOptions);
growingPlant.forEach(el => growingPlantObserver.observe(el));

// ROTATING EARTH
const earth = document.querySelectorAll(".history__earth-img");
const earthOptions = { rootMargin: "-10% 0%" };

function earthIntersectionCb(entries) {
  entries.forEach(entry => {
    const target = entry.target;
    if (reduceMotion) {
      target.classList.remove(target.dataset.hidden);
      target.style.transform = "rotate(180deg)";
    } else {
      if (entry.isIntersecting) {
        target.classList.remove(target.dataset.hidden);
        target.style.transform = "rotate(180deg)";
      } else {
        target.classList.add(target.dataset.hidden);
        target.style.transform = "rotate(0deg)";
      }
    }
  });
}

const earthObserver = new IntersectionObserver(earthIntersectionCb, earthOptions);
earth.forEach(el => earthObserver.observe(el));

// TYPEWRITER
const wrappers = document.querySelectorAll(".history__wrapper");
const writeObserverOptions = { rootMargin: "-10% 0%", threshold: 0.5 };

function typeWriterEffect(element, text, speed = 40, callback = null) {
  if (reduceMotion) {
    element.textContent = text;
    if (callback) callback();
    return;
  }

  if (element._typingTimeout) {
    clearTimeout(element._typingTimeout);
  }

  element.textContent = "";
  let index = 0;

  function typeChar() {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      element._typingTimeout = setTimeout(typeChar, speed);
    } else {
      if (callback) callback();
    }
  }

  typeChar();
}

function writeObserverCallback(entries) {
  entries.forEach(entry => {
    const container = entry.target;
    const firstLine = container.querySelector(".history__text--written-firstline");
    const secondLine = container.querySelector(".history__text--written-secondline");

    if (!firstLine.dataset.original) {
      firstLine.dataset.original = firstLine.textContent.trim();
    }
    if (!secondLine.dataset.original) {
      secondLine.dataset.original = secondLine.textContent.trim();
    }

    if (entry.isIntersecting) {
      clearTimeout(container._typingTimeout);

      // Normal typing animation only for no reduced motion
      firstLine.textContent = "";
      secondLine.textContent = "";

      firstLine.classList.add('visible');
      secondLine.classList.remove('visible');

      container._typingTimeout = setTimeout(() => {
        typeWriterEffect(firstLine, firstLine.dataset.original, 40, () => {
          secondLine.classList.add('visible');
          typeWriterEffect(secondLine, secondLine.dataset.original, 40);
        });
      }, 500);

    } else {
      clearTimeout(container._typingTimeout);
      firstLine.textContent = "";
      secondLine.textContent = "";
      firstLine.classList.remove('visible');
      secondLine.classList.remove('visible');
    }
  });
}

if (reduceMotion) {
  // Show all text immediately, no observer needed
  wrappers.forEach(container => {
    const firstLine = container.querySelector(".history__text--written-firstline");
    const secondLine = container.querySelector(".history__text--written-secondline");

    if (!firstLine.dataset.original) {
      firstLine.dataset.original = firstLine.textContent.trim();
    }
    if (!secondLine.dataset.original) {
      secondLine.dataset.original = secondLine.textContent.trim();
    }

    firstLine.textContent = firstLine.dataset.original;
    secondLine.textContent = secondLine.dataset.original;

    firstLine.classList.add('visible');
    secondLine.classList.add('visible');
  });
} else {
  // Use IntersectionObserver normally
  const writeObserver = new IntersectionObserver(writeObserverCallback, writeObserverOptions);
  wrappers.forEach(wrapper => writeObserver.observe(wrapper));
}

// RIVER
const river = document.querySelector('.history__river');

if (reduceMotion) {
  // Show river fully drawn immediately
  river.classList.add('animate');
} else {
  const riverObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        river.classList.add('animate');
        riverObserver.unobserve(river);
      }
    });
  }, { threshold: 0.3 });

  riverObserver.observe(river);
}
