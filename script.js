const root = document.documentElement;
let lightFrame = null;
const profileSection = document.querySelector("#profile");
const productionSection = document.querySelector("#work");
const gallerySection = document.querySelector("#gallery");
const siteMotionReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const siteLoader = document.createElement("div");

siteLoader.className = "site-loader";
siteLoader.innerHTML = `<span>Shreesh Thekkatte</span><strong>Theatre Portfolio</strong>`;
document.body.classList.add("is-booting");
document.body.prepend(siteLoader);

window.addEventListener("load", () => {
  const loaderDelay = siteMotionReduced ? 0 : 520;
  window.setTimeout(() => {
    document.body.classList.add("is-loaded");
    document.body.classList.remove("is-booting");
    siteLoader.classList.add("is-done");
    window.setTimeout(() => siteLoader.remove(), siteMotionReduced ? 0 : 980);
  }, loaderDelay);
});

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

if (!window.location.hash) {
  window.addEventListener("pageshow", () => {
    requestAnimationFrame(() => window.scrollTo(0, 0));
  });
}

function moveStageLight(event) {
  if (lightFrame) return;
  lightFrame = requestAnimationFrame(() => {
    root.style.setProperty("--spot-x", `${event.clientX}px`);
    root.style.setProperty("--spot-y", `${event.clientY}px`);
    lightFrame = null;
  });
}

window.addEventListener("pointermove", moveStageLight, { passive: true });

const heroTitle = document.querySelector(".hero h1");
if (heroTitle && !heroTitle.dataset.split) {
  const text = heroTitle.textContent.trim();
  heroTitle.dataset.split = "true";
  heroTitle.innerHTML = [...text]
    .map((letter, index) => {
      const visibleLetter = letter === " " ? "&nbsp;" : letter;
      return `<span style="--letter-index:${index}">${visibleLetter}</span>`;
    })
    .join("");
}

function setSectionMode(mode) {
  const showProfile = mode === "profile";
  const showProduction = mode === "production";
  const showGallery = mode === "gallery";

  document.body.classList.toggle("profile-mode", showProfile);
  document.body.classList.toggle("production-mode", showProduction);
  document.body.classList.toggle("gallery-mode", showGallery);
  if (profileSection) {
    profileSection.setAttribute("aria-hidden", showProfile ? "false" : "true");
  }
  if (productionSection) {
    productionSection.setAttribute("aria-hidden", showProduction ? "false" : "true");
  }
  if (gallerySection) {
    gallerySection.setAttribute("aria-hidden", showGallery ? "false" : "true");
  }
}

function getSectionModeFromHash(hash) {
  if (hash === "#profile") return "profile";
  if (hash === "#work") return "production";
  if (hash === "#gallery") return "gallery";
  return "";
}

function syncSectionModeFromHash() {
  setSectionMode(getSectionModeFromHash(window.location.hash));
  setActiveNav(window.location.hash);
}

const navLinks = [...document.querySelectorAll(".nav-links a")];
function setActiveNav(hash) {
  const activeHash = hash || "#";
  navLinks.forEach(link => {
    const href = link.getAttribute("href") || "#";
    link.classList.toggle("is-nav-active", href === activeHash);
  });
}

document.querySelectorAll(".nav-links a, .brand, .actions a").forEach(link => {
  link.addEventListener("click", () => {
    const hash = link.getAttribute("href") || "";
    setSectionMode(getSectionModeFromHash(hash));
    setActiveNav(hash);
  });
});

window.addEventListener("hashchange", syncSectionModeFromHash);
syncSectionModeFromHash();
setActiveNav(window.location.hash);

const revealTargets = document.querySelectorAll(
  ".hero, .manifesto, .signature, .spotlight, .stats, .stat, .section-head, .project-card, .gallery figure, .profile-grid article, .profile-skills span, .production-controls, .footer"
);

const observer = new IntersectionObserver(
  entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-seen");
        observer.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.14 }
);

revealTargets.forEach((target, index) => {
  target.style.transitionDelay = `${Math.min(index * 28, 420)}ms`;
  observer.observe(target);
});

const productionPhotoSets = [
  ["performance-01-02.jpg", "performance-01-04.jpg", "performance-02-02.jpg", "performance-02-04.jpg"],
  ["performance-03-02.jpg", "performance-03-04.jpg", "performance-04-02.jpg", "performance-04-03.jpg"],
  ["performance-05-02.jpg", "performance-05-04.jpg", "performance-06-02.jpg", "performance-06-04.jpg"],
  ["performance-07-02.jpg", "performance-07-04.jpg", "performance-08-02.jpg", "performance-08-04.jpg"],
  ["performance-09-02.jpg", "performance-10-02.jpg", "performance-10-04.jpg"],
  ["performance-11-02.jpg", "performance-11-04.jpg", "performance-12-02.jpg", "performance-12-04.jpg", "performance-13-02.jpg", "performance-13-04.jpg"],
  ["performance-14-02.jpg", "performance-14-04.jpg", "performance-15-02.jpg", "performance-15-04.jpg", "performance-16-02.jpg", "performance-16-04.jpg"],
  ["performance-18-01.jpg", "performance-18-03.jpg", "performance-19-01.jpg", "performance-19-03.jpg"],
  ["performance-20-01.jpg", "performance-20-03.jpg", "performance-21-01.jpg", "performance-21-03.jpg"],
  ["performance-22-01.jpg", "performance-22-03.jpg"],
  ["performance-23-01.jpg", "performance-23-03.jpg", "performance-24-01.jpg", "performance-24-03.jpg"],
  ["performance-25-01.jpg", "performance-25-03.jpg", "performance-26-01.jpg", "performance-26-03.jpg"],
  ["performance-27-01.jpg", "performance-27-03.jpg", "performance-28-01.jpg", "performance-28-03.jpg"],
  ["performance-29-01.jpg", "performance-29-03.jpg"],
  ["performance-30-01.jpg", "performance-30-03.jpg", "performance-31-01.jpg", "performance-31-03.jpg"],
  ["performance-32-01.jpg", "performance-32-03.jpg"],
  ["performance-33-01.jpg", "performance-34-01.jpg", "performance-34-03.jpg"]
];

const galleryPhotos = productionPhotoSets.flat();
const gallery = document.querySelector(".gallery");
if (gallery) {
  gallery.innerHTML = galleryPhotos
    .map((photo, index) => `
      <figure>
        <img src="assets/${photo}" alt="Shreesha Thekkatte theatre performance photo ${index + 1}" loading="lazy">
        <figcaption>Performance still ${String(index + 1).padStart(2, "0")}</figcaption>
      </figure>
    `)
    .join("");

  gallery.querySelectorAll("figure").forEach((figure, index) => {
    figure.style.transitionDelay = `${Math.min(index * 28, 420)}ms`;
    observer.observe(figure);
  });
}

const modal = document.querySelector("#productionModal");
const modalTitle = document.querySelector("#productionModalTitle");
const modalGrid = document.querySelector("#productionModalGrid");
const closeControls = document.querySelectorAll("[data-close-modal]");
let activeProductionCard = null;

function openProductionPhotos(card, index) {
  const title = card.querySelector("h3")?.textContent.trim() || "Production";
  const photos = productionPhotoSets[index] || [];

  activeProductionCard = card;
  modalTitle.textContent = title;
  modalGrid.innerHTML = photos
    .map((photo, photoIndex) => `
      <figure>
        <img src="assets/${photo}" alt="${title} production photo ${photoIndex + 1}">
        <figcaption>${String(photoIndex + 1).padStart(2, "0")} / ${photos.length}</figcaption>
      </figure>
    `)
    .join("");

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  setupMagneticMotion(modalGrid.querySelectorAll("figure"));
  modal.querySelector(".production-modal__close").focus();
}

function closeProductionPhotos() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  modalGrid.innerHTML = "";
  if (activeProductionCard) activeProductionCard.focus();
}

document.querySelectorAll(".project-card").forEach((card, index) => {
  card.setAttribute("role", "button");
  card.setAttribute("tabindex", "0");
  card.setAttribute("aria-label", `Open photos for ${card.querySelector("h3")?.textContent.trim() || "production"}`);

  const cue = document.createElement("span");
  cue.className = "photo-cue";
  cue.textContent = `View ${productionPhotoSets[index]?.length || 0} photos`;
  card.append(cue);

  card.addEventListener("click", () => openProductionPhotos(card, index));
  card.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProductionPhotos(card, index);
    }
  });
});

closeControls.forEach(control => {
  control.addEventListener("click", closeProductionPhotos);
});

window.addEventListener("keydown", event => {
  if (event.key === "Escape" && modal.classList.contains("is-open")) {
    closeProductionPhotos();
  }
});

const productionRail = document.querySelector(".projects");
const productionCards = [...document.querySelectorAll(".project-card")];
const productionStatus = document.querySelector(".production-carousel-status");
let activeProductionIndex = 0;
let productionAutoTimer = null;
let productionResumeTimer = null;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function centerProductionCard(index, behavior = "smooth") {
  if (!productionRail || !productionCards.length) return;
  const normalizedIndex = (index + productionCards.length) % productionCards.length;
  const card = productionCards[normalizedIndex];
  const railBox = productionRail.getBoundingClientRect();
  const cardBox = card.getBoundingClientRect();
  const targetLeft = productionRail.scrollLeft
    + cardBox.left
    - railBox.left
    - ((railBox.width - cardBox.width) / 2);

  productionRail.scrollTo({ left: targetLeft, behavior });
}

function pauseProductionCarousel() {
  if (productionAutoTimer) clearInterval(productionAutoTimer);
  productionAutoTimer = null;
  if (productionResumeTimer) clearTimeout(productionResumeTimer);
}

function startProductionCarousel() {
  if (!productionRail || prefersReducedMotion || productionAutoTimer) return;
  productionAutoTimer = setInterval(() => {
    if (document.hidden || modal.classList.contains("is-open")) return;
    centerProductionCard(activeProductionIndex + 1);
  }, 3000);
}

function resumeProductionCarouselSoon() {
  if (prefersReducedMotion) return;
  if (productionResumeTimer) clearTimeout(productionResumeTimer);
  productionResumeTimer = setTimeout(startProductionCarousel, 1600);
}

if (productionStatus && productionCards.length) {
  productionStatus.innerHTML = productionCards
    .map((_, index) => `<button type="button" aria-label="Show production ${index + 1}"></button>`)
    .join("");

  [...productionStatus.querySelectorAll("button")].forEach((button, index) => {
    button.addEventListener("click", () => {
      pauseProductionCarousel();
      centerProductionCard(index);
      resumeProductionCarouselSoon();
    });
  });
}

document.querySelectorAll("[data-scroll-productions]").forEach(button => {
  button.addEventListener("click", () => {
    if (!productionRail) return;
    const direction = Number(button.dataset.scrollProductions);
    pauseProductionCarousel();
    centerProductionCard(activeProductionIndex + direction);
    resumeProductionCarouselSoon();
  });
});

function updateProductionCarousel() {
  if (!productionRail || !productionCards.length) return;
  const railBox = productionRail.getBoundingClientRect();
  const railCenter = railBox.left + railBox.width / 2;

  let activeIndex = 0;
  let closestDistance = Infinity;

  productionCards.forEach((card, index) => {
    const box = card.getBoundingClientRect();
    const cardCenter = box.left + box.width / 2;
    const distance = Math.abs(cardCenter - railCenter);
    if (distance < closestDistance) {
      closestDistance = distance;
      activeIndex = index;
    }
  });

  activeProductionIndex = activeIndex;

  productionCards.forEach((card, index) => {
    card.classList.toggle("is-active", index === activeIndex);
    card.classList.toggle("is-near", Math.abs(index - activeIndex) === 1);
    card.classList.toggle("is-far", Math.abs(index - activeIndex) > 1);
    card.classList.toggle("is-left", index < activeIndex);
    card.classList.toggle("is-right", index > activeIndex);
  });

  if (productionStatus) {
    [...productionStatus.querySelectorAll("button")].forEach((dot, index) => {
      dot.classList.toggle("is-active", index === activeIndex);
    });
  }
}

if (productionRail) {
  productionRail.addEventListener("scroll", () => {
    requestAnimationFrame(updateProductionCarousel);
  }, { passive: true });
  productionRail.addEventListener("pointerenter", pauseProductionCarousel);
  productionRail.addEventListener("pointerleave", resumeProductionCarouselSoon);
  productionRail.addEventListener("focusin", pauseProductionCarousel);
  productionRail.addEventListener("focusout", resumeProductionCarouselSoon);
  productionRail.addEventListener("wheel", () => {
    pauseProductionCarousel();
    resumeProductionCarouselSoon();
  }, { passive: true });
  window.addEventListener("resize", updateProductionCarousel);
  requestAnimationFrame(() => {
    centerProductionCard(0, "auto");
    updateProductionCarousel();
    startProductionCarousel();
  });
  setTimeout(() => {
    centerProductionCard(activeProductionIndex, "auto");
    updateProductionCarousel();
  }, 300);
  setTimeout(updateProductionCarousel, 900);
}

function setupMagneticMotion(targets = document.querySelectorAll(".nav-links a, .button, .project-card, .gallery figure, .profile-grid article, .stat")) {
  if (siteMotionReduced) return;

  targets.forEach(target => {
    if (target.dataset.magneticReady) return;
    target.dataset.magneticReady = "true";
    target.classList.add("magnetic-motion");

    target.addEventListener("pointermove", event => {
      const box = target.getBoundingClientRect();
      const localX = (event.clientX - box.left) / box.width;
      const localY = (event.clientY - box.top) / box.height;
      const tiltX = (0.5 - localY) * 10;
      const tiltY = (localX - 0.5) * 12;

      target.style.setProperty("--tilt-x", `${tiltX.toFixed(2)}deg`);
      target.style.setProperty("--tilt-y", `${tiltY.toFixed(2)}deg`);
      target.style.setProperty("--shine-x", `${(localX * 100).toFixed(1)}%`);
      target.style.setProperty("--shine-y", `${(localY * 100).toFixed(1)}%`);
      target.classList.add("is-tilting");
    }, { passive: true });

    target.addEventListener("pointerleave", () => {
      target.classList.remove("is-tilting");
      target.style.removeProperty("--tilt-x");
      target.style.removeProperty("--tilt-y");
      target.style.removeProperty("--shine-x");
      target.style.removeProperty("--shine-y");
    });
  });
}

function animateStatNumber(numberElement) {
  if (numberElement.dataset.counted) return;
  const targetValue = Number(numberElement.dataset.targetValue || numberElement.textContent.replace(/\D/g, ""));
  if (!Number.isFinite(targetValue)) return;

  numberElement.dataset.counted = "true";
  if (siteMotionReduced) {
    numberElement.textContent = String(targetValue);
    return;
  }

  const duration = 1100;
  const startTime = performance.now();

  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    numberElement.textContent = String(Math.round(targetValue * eased));
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

function setupStatCounters() {
  const statNumbers = [...document.querySelectorAll(".stat strong")];
  if (!statNumbers.length) return;

  statNumbers.forEach(numberElement => {
    numberElement.dataset.targetValue = numberElement.textContent.replace(/\D/g, "");
    numberElement.textContent = siteMotionReduced ? numberElement.dataset.targetValue : "0";
  });

  const statObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animateStatNumber(entry.target);
      statObserver.unobserve(entry.target);
    });
  }, { threshold: 0.35 });

  statNumbers.forEach(numberElement => statObserver.observe(numberElement));
}

setupMagneticMotion();
setupStatCounters();
