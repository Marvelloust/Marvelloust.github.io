document.addEventListener("DOMContentLoaded", function () {
  const skillsSection = document.querySelector("#skills");
  const cards = document.querySelectorAll(".glass-card");
  const progressBars = document.querySelectorAll(".progress-bar .fill");

  // Ensure cards and bars are visible by default on small screens
  function showSkills() {
    cards.forEach((card, index) => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
      card.style.animation = `bounceIn 0.6s ease-out ${index * 0.2}s both`;
    });
    progressBars.forEach((bar) => {
      const width = bar.getAttribute("data-width");
      bar.style.width = width;
      bar.classList.remove("-translate-x-full", "opacity-0");
    });
  }

  function hideSkills() {
    cards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      card.style.animation = "none";
    });
    progressBars.forEach((bar) => {
      bar.style.width = "0%";
      bar.classList.add("-translate-x-full", "opacity-0");
    });
  }

  // Only use IntersectionObserver on md and up
  function handleSkillsVisibility() {
    if (window.innerWidth < 768) {
      showSkills();
    } else {
      hideSkills();
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              showSkills();
            } else {
              hideSkills();
            }
          });
        },
        { threshold: 0.3 }
      );
      observer.observe(skillsSection);
    }
  }

  handleSkillsVisibility();
  window.addEventListener('resize', handleSkillsVisibility);
});

document.addEventListener("DOMContentLoaded", function () {
  const contactSection = document.querySelector("#contact");
  const contactCards = document.querySelectorAll("#contact .glass-contact");
  const formElements = document.querySelectorAll(
    "#contact input, #contact textarea, #contact button"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animate Contact Info Cards
          contactCards.forEach((card, index) => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
            card.style.animation = `fadeInUp 0.6s ease-out ${
              index * 0.2
            }s both`;
          });

          // Animate Form Elements
          formElements.forEach((element, index) => {
            element.style.opacity = "1";
            element.style.transform = "translateX(0)";
            element.style.transition = `opacity 0.3s ease-out ${
              index * 0.1
            }s, transform 0.3s ease-out ${index * 0.1}s`;
          });
        } else {
          // Reset animations when section goes out of view
          contactCards.forEach((card) => {
            card.style.opacity = "0";
            card.style.transform = "translateY(20px)";
            card.style.animation = "none";
          });

          formElements.forEach((element) => {
            element.style.opacity = "0";
            element.style.transform = "translateX(-20px)";
          });
        }
      });
    },
    { threshold: 0.3 } // Triggers when 30% of the section is visible
  );

  observer.observe(contactSection);
});

document.addEventListener("DOMContentLoaded", function () {
  const portfolioTitle = document.getElementById("portfolio-title");
  const portfolioGrid = document.getElementById("portfolio-grid");
  const portfolioItems = document.querySelectorAll(".portfolio-item");
  const ctaButton = document.getElementById("portfolio-cta");

  const observerOptions = {
    root: null,
    threshold: 0.3,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("opacity-100", "translate-y-0");
      } else {
        entry.target.classList.remove("opacity-100", "translate-y-0");
      }
    });
  }, observerOptions);

  observer.observe(portfolioTitle);
  observer.observe(portfolioGrid);
  observer.observe(ctaButton);
  portfolioItems.forEach((item) => observer.observe(item));
});

function openModal(imageSrc) {
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");

  modalImage.src = imageSrc;
  modal.classList.add("show");
  modal.style.display = "flex";

  // Disable scrolling on body
  document.body.classList.add("modal-open");
}

function closeModal() {
  const modal = document.getElementById("imageModal");
  modal.classList.remove("show");

  setTimeout(() => {
    modal.style.display = "none";
    // Enable scrolling on body
    document.body.classList.remove("modal-open");
  }, 300);
}
