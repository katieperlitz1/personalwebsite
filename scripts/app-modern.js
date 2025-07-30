// Modern Portfolio JavaScript - Katie Perlitz
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all animations and interactions
  initScrollAnimations();
  initParallaxEffects();
  initInteractiveElements();
  initSmoothScrolling();
  initTypingEffect();
  initProjectHoverEffects();

  // Mobile menu functionality
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector("nav ul");

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking on a link
  document.querySelectorAll("nav ul li a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });
});

// Scroll-triggered animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        entry.target.classList.remove("hidden");
      }
    });
  }, observerOptions);

  // Observe all elements with 'hidden' class
  document.querySelectorAll(".hidden").forEach((el) => {
    observer.observe(el);
  });
}

// Parallax effects for background elements
function initParallaxEffects() {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".hometext-pic::before");

    parallaxElements.forEach((element) => {
      const speed = 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

// Interactive elements with hover effects
function initInteractiveElements() {
  // Add hover effects to project cards
  const projectCards = document.querySelectorAll(".projectdiv");

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Add ripple effect to buttons
  const buttons = document.querySelectorAll(".whitebutton, .whitebutton2");

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("ripple");

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Typing effect for the main heading
function initTypingEffect() {
  const hiElement = document.querySelector(".hi");
  if (!hiElement) return;

  const text = hiElement.textContent;
  hiElement.textContent = "";
  hiElement.style.borderRight = "2px solid #4fe8ca";

  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      hiElement.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    } else {
      hiElement.style.borderRight = "none";
    }
  };

  // Start typing effect when element comes into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(typeWriter, 500);
        observer.unobserve(entry.target);
      }
    });
  });

  observer.observe(hiElement);
}

// Enhanced project hover effects
function initProjectHoverEffects() {
  const projects = document.querySelectorAll(".projectdiv");

  projects.forEach((project) => {
    const image = project.querySelector(".projectpic");
    const content = project.querySelector(".projectdescription");

    project.addEventListener("mouseenter", () => {
      if (image) {
        image.style.transform = "scale(1.05) rotate(1deg)";
      }
      if (content) {
        content.style.transform = "translateX(10px)";
      }
    });

    project.addEventListener("mouseleave", () => {
      if (image) {
        image.style.transform = "scale(1) rotate(0deg)";
      }
      if (content) {
        content.style.transform = "translateX(0)";
      }
    });
  });
}

// Add CSS for ripple effect
const style = document.createElement("style");
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .projectdiv {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .projectpic {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .projectdescription {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* Enhanced loading animation */
    .projectdiv {
        animation: slideInFromBottom 0.8s ease-out;
    }
    
    @keyframes slideInFromBottom {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Floating animation for decorative elements */
    .floating {
        animation: floating 3s ease-in-out infinite;
    }
    
    @keyframes floating {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    /* Gradient text animation */
    .gradient-text {
        background: linear-gradient(45deg, #4fe8ca, #0045b3, #46dfcb);
        background-size: 200% 200%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: gradient-shift 3s ease infinite;
    }
    
    @keyframes gradient-shift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
    }
`;
document.head.appendChild(style);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Add floating animation to decorative elements
document.addEventListener("DOMContentLoaded", () => {
  const decorativeElements = document.querySelectorAll(
    ".hometext-pic::before, .hometext-pic::after"
  );
  decorativeElements.forEach((el) => {
    el.classList.add("floating");
  });
});

// Add gradient text animation to main headings
document.addEventListener("DOMContentLoaded", () => {
  const headings = document.querySelectorAll(".hi, .miniprojects");
  headings.forEach((heading) => {
    heading.classList.add("gradient-text");
  });
});

// Enhanced mobile experience
function enhanceMobileExperience() {
  if (window.innerWidth <= 768) {
    // Add touch-friendly interactions
    const touchElements = document.querySelectorAll(
      ".projectdiv, .whitebutton, .whitebutton2"
    );

    touchElements.forEach((element) => {
      element.addEventListener("touchstart", function () {
        this.style.transform = "scale(0.98)";
      });

      element.addEventListener("touchend", function () {
        this.style.transform = "scale(1)";
      });
    });
  }
}

// Initialize mobile enhancements
document.addEventListener("DOMContentLoaded", enhanceMobileExperience);
window.addEventListener("resize", enhanceMobileExperience);

// Add loading state
window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  // Add a subtle entrance animation for all content
  const contentElements = document.querySelectorAll("main > *");
  contentElements.forEach((element, index) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";

    setTimeout(() => {
      element.style.transition = "all 0.6s ease-out";
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }, index * 100);
  });
});

// Add CSS for loading state
const loadingStyle = document.createElement("style");
loadingStyle.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded) main > * {
        opacity: 0;
        transform: translateY(20px);
    }
    
    .loaded main > * {
        transition: all 0.6s ease-out;
    }
`;
document.head.appendChild(loadingStyle);
