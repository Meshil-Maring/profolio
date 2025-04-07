function createParticles() {
  const container = document.getElementById("particles");
  const particleCount = window.innerWidth < 768 ? 30 : 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    // Random properties
    const size = Math.random() * 5 + 1;
    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * window.innerHeight;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}px`;
    particle.style.top = `${posY}px`;
    particle.style.opacity = Math.random() * 0.5 + 0.1;
    particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;

    container.appendChild(particle);
  }
}

// Typing Animation
function typeEffect() {
  const text = "Meshil Maring";
  const typingElement = document.querySelector(".typing");
  let i = 0;

  function type() {
    if (i < text.length) {
      typingElement.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, 100);
    } else {
      setTimeout(erase, 1500);
    }
  }

  function erase() {
    if (i > 0) {
      typingElement.innerHTML = text.substring(0, i - 1);
      i--;
      setTimeout(erase, 50);
    } else {
      setTimeout(type, 500);
    }
  }

  setTimeout(type, 1000);
}

// Scroll Animations
function animateOnScroll() {
  const elements = document.querySelectorAll(".project-card, h2");
  const windowHeight = window.innerHeight;

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementPosition < windowHeight - elementVisible) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  createParticles();
  typeEffect();
  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); // Run once on load
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const skillsData = [
    {
      title: "Frontend Development",
      icon: "fa-code",
      skills: [
        { name: "React", icon: "fa-react" },
        { name: "TypeScript", icon: "fa-js" },
        { name: "Next.js", icon: "fa-js" },
        { name: "Tailwind CSS", icon: "fa-css3" },
        { name: "GraphQL", icon: "fa-code" },
      ],
    },

    {
      title: "UI/UX Design",
      icon: "fa-paint-brush",
      skills: [
        { name: "Figma", icon: "fa-figma" },
        { name: "Adobe XD", icon: "fa-adobe" },
        { name: "User Research", icon: "fa-search" },
        { name: "Prototyping", icon: "fa-mobile" },
        { name: "Motion Design", icon: "fa-film" },
      ],
    },
    {
      title: "DevOps & Tools",
      icon: "fa-cogs",
      skills: [
        { name: "Docker", icon: "fa-docker" },
        { name: "Git", icon: "fa-git-alt" },
        { name: "AWS", icon: "fa-aws" },
        { name: "CI/CD", icon: "fa-code-branch" },
        { name: "Linux", icon: "fa-linux" },
      ],
    },
  ];

  const skillsContainer = document.querySelector(".skills-container");

  // Create skill category cards
  skillsData.forEach((category) => {
    const skillCategory = document.createElement("div");
    skillCategory.className = "skill-category";

    const skillsList = category.skills
      .map(
        (skill) =>
          `<div class="skill-item">
                <i class="fab ${skill.icon}"></i>
                ${skill.name}
            </div>`
      )
      .join("");

    skillCategory.innerHTML = `
            <h3>
                <i class="fas ${category.icon}"></i>
                ${category.title}
            </h3>
            <div class="skill-items">
                ${skillsList}
            </div>
        `;

    skillsContainer.appendChild(skillCategory);
  });

  // Animate skills on scroll
  const skillCategories = document.querySelectorAll(".skill-category");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
          }, index * 150);
        }
      });
    },
    { threshold: 0.1 }
  );

  skillCategories.forEach((category) => {
    observer.observe(category);
  });
});

// Custom Cursor
const initCustomCursor = () => {
  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  // Hover effects
  const hoverElements = document.querySelectorAll(
    "a, button, .project-card, .skill-category, .skill-item, .footer-link, .nav-links a"
  );

  hoverElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("active");
    });
    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("active");
    });
  });

  // Click effect
  document.addEventListener("mousedown", () => {
    cursor.classList.add("click");
  });
  document.addEventListener("mouseup", () => {
    cursor.classList.remove("click");
  });

  // Hide cursor when not in viewport
  document.addEventListener("mouseout", (e) => {
    if (!e.relatedTarget) {
      cursor.style.opacity = "0";
    }
  });
  document.addEventListener("mouseover", () => {
    cursor.style.opacity = "1";
  });
};

// Initialize when DOM loads
document.addEventListener("DOMContentLoaded", () => {
  initCustomCursor();
  // Your other initialization code...
});

// Create scroll indicator
function createScrollIndicator() {
  const scrollIndicator = document.createElement("div");
  scrollIndicator.className = "scroll-indicator";
  document.body.appendChild(scrollIndicator);

  // Click/tap to scroll
  scrollIndicator.addEventListener("click", () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  });

  // Hide when scrolling
  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;
    if (currentScroll > lastScroll && currentScroll > 100) {
      scrollIndicator.style.opacity = "0";
    }
    lastScroll = currentScroll;
  });
}

// Initialize when DOM loads
document.addEventListener("DOMContentLoaded", () => {
  createScrollIndicator();
  // Your other initialization code...
});
