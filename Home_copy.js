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

// -------------------------------------------- mouse -----

document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".get-started-button");
  const arrowImg = document.querySelector(".arrow-img");

  if (button && arrowImg) {
    // On hover (mouse enters button)
    button.addEventListener("mouseenter", () => {
      arrowImg.src = "./images/arrow2.png"; // Change to the white arrow
    });

    // On hover out (mouse leaves button)
    button.addEventListener("mouseleave", () => {
      arrowImg.src = "./images/arrow1.png"; // Revert back to the default arrow
    });
  }
});

// ----------------- loding --------------------

document.addEventListener("DOMContentLoaded", () => {
  const runOnceDiv = document.querySelector(".run_once");
  let currentImageIndex = 1;
  const maxImageIndex = 8;
  let animationInterval = null;
  let hasAnimated = false; // Flag to track if animation has run
  let isHovering = false; // Flag to track hover state

  // Function to update the image
  function updateImage() {
    if (!isHovering) {
      // Only update image if not hovering
      runOnceDiv.innerHTML = `<img src="./images/Zustpe${currentImageIndex}.png" alt="Zustpe Image ${currentImageIndex}" class="run-once-img" />`;
      currentImageIndex++;
      if (currentImageIndex > maxImageIndex) {
        clearInterval(animationInterval); // Stop at Zustpe8.png
        animationInterval = null;
        hasAnimated = true; // Mark animation as complete
      }
    }
  }

  // Function to set image source
  function setImage(index) {
    runOnceDiv.innerHTML = `<img src="./images/Zustpe${index}.png" alt="Zustpe Image ${index}" class="run-once-img" />`;
  }

  // Intersection Observer to check if run_once div is in viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animationInterval && !hasAnimated) {
          // Start animation only if div is visible, animation hasn't started, and hasn't completed
          updateImage(); // Show first image immediately
          animationInterval = setInterval(updateImage, 500); // Change image every 500ms
        } else if (!entry.isIntersecting && animationInterval) {
          // Stop animation when div is not visible
          clearInterval(animationInterval);
          animationInterval = null;
          if (!isHovering && hasAnimated) {
            // Ensure Zustpe8.png is shown if animation is complete and not hovering
            setImage(8);
          }
        }
      });
    },
    {
      threshold: 0.1, // Trigger when 10% of the div is visible
    }
  );

  // Start observing the run_once div
  observer.observe(runOnceDiv);

  // Hover event handlers
  runOnceDiv.addEventListener("mouseenter", () => {
    isHovering = true; // Mark as hovering
    setImage(7); // Show Zustpe7.png on hover
  });

  runOnceDiv.addEventListener("mouseleave", () => {
    isHovering = false; // Mark as not hovering
    if (hasAnimated) {
      // If animation is complete, show Zustpe8.png
      setImage(8);
    } else if (currentImageIndex <= maxImageIndex) {
      // If animation is not complete, resume from current index
      setImage(currentImageIndex);
      if (runOnceDiv.isIntersecting !== false) {
        // Resume animation only if div is still in viewport
        animationInterval = setInterval(updateImage, 500);
      }
    }
  });
});
