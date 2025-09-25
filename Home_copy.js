// === Landing Page Animation ===
document.addEventListener("DOMContentLoaded", () => {
  const landingSection = document.getElementById("landing");
  const headerSection = document.getElementById("header");
  const progressBar = document.getElementById("progress-bar");
  const landingImage = document.getElementById("landing-image");
  // Set initial width and height for landing page
  landingSection.style.width = "110vw"; // Full viewport width
  landingSection.style.height = "110vh"; // Full viewport height
  // const landingSection = document.getElementById("landing");
  landingSection.style.paddingTop = "30px"; // nudges content down by 20px
  landingImage.style.paddingTop = "100px";

  // Optionally set header section too (maybe hidden initially)
  headerSection.style.width = "100vw";
  headerSection.style.height = "auto";

  const landingImages = [
    "./images/Zustpe1.png",
    "./images/Zustpe2.png",
    "./images/Zustpe3.png",
    "./images/Zustpe4.png",
    "./images/Zustpe5.png",
    "./images/Zustpe6.png",
    "./images/Zustpe7.png",
    "./images/Zustpe8.png",
  ];

  // === Disable scroll during loading ===
  document.body.style.overflow = "hidden";

  // Preload images
  landingImages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
  // --------------------hide--------------------

  // ------------------------complete--------------

  let currentLandingImage = 0;
  const imageDisplayTime = 2000 / landingImages.length;

  function changeLandingImage() {
    if (currentLandingImage < landingImages.length) {
      landingImage.classList.remove("visible");
      setTimeout(() => {
        landingImage.src = landingImages[currentLandingImage];
        landingImage.classList.add("visible");
        currentLandingImage++;
        if (currentLandingImage < landingImages.length) {
          setTimeout(changeLandingImage, imageDisplayTime);
        }
      }, 30);
    }
  }

  landingImage.src = landingImages[0];
  landingImage.classList.add("visible");
  setTimeout(changeLandingImage, imageDisplayTime);

  let progress = 0;
  const steps = 100;
  const intervalTime = 2000 / steps;

  const progressInterval = setInterval(() => {
    progress++;
    progressBar.style.width = `${progress}%`;

    if (progress >= 100) {
      clearInterval(progressInterval);
      transitionToHeader();
    }
  }, intervalTime);

  function transitionToHeader() {
    landingSection.style.display = "none";
    headerSection.classList.remove("hidden");

    // === Re-enable scroll ===
    document.body.style.overflow = "auto";

    // Scroll to header smoothly
    headerSection.scrollIntoView({ behavior: "smooth" });
  }
});