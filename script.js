// ======================= PARTICLES =======================
function createParticles() {
  const container =
    document.querySelector(".particles") ||
    document.getElementById("particles");
  if (!container) return;

  container.innerHTML = "";

  const particleCount =
    window.innerWidth < 768 ? 30 : Math.floor(window.innerWidth / 20);
  const colors = [
    "rgba(124, 58, 237, 0.7)", // Primary accent
    "rgba(100, 255, 218, 0.5)", // Teal
    "rgba(224, 231, 255, 0.4)", // Light
  ];

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    const size = Math.random() * 5 + 1;
    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * window.innerHeight;
    const duration = Math.random() * 50 + 20;
    const delay = Math.random() * -20;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const opacity = Math.random() * 0.5 + 0.1;

    Object.assign(particle.style, {
      width: `${size}px`,
      height: `${size}px`,
      left: `${posX}px`,
      top: `${posY}px`,
      backgroundColor: color,
      opacity,
      animation: `particle-move-${i} ${duration}s ease-in-out ${delay}s infinite`,
    });

    // Generate unique animation keyframes
    const keyframes = `
      @keyframes particle-move-${i} {
        0%, 100% { transform: translate(-50%, -50%) translate(0, 0); }
        25% { transform: translate(-50%, -50%) translate(${
          Math.random() * 100 - 10
        }px, ${Math.random() * 100 - 10}px); }
        50% { transform: translate(-50%, -50%) translate(${
          Math.random() * 100 - 20
        }px, ${Math.random() * 100 - 5}px); }
        75% { transform: translate(-50%, -50%) translate(${
          Math.random() * 100 - 10
        }px, ${Math.random() * 100 - 10}px); }
      }
    `;
    const style = document.createElement("style");
    style.textContent = keyframes;
    document.head.appendChild(style);

    container.appendChild(particle);
  }

  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(createParticles, 200);
  });
}

// ======================= TYPING EFFECT =======================
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

// ======================= SCROLL ANIMATION =======================
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

// ======================= SMOOTH SCROLL =======================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

// ======================= SKILLS =======================
function renderSkills() {
  const skillsData = [
    {
      title: "Frontend Development",
      icon: "fa-code",
      skills: [
        { name: "HTML", icon: "fa-html5" },
        { name: "CSS", icon: "fa-css3" },
        { name: "JavaScript", icon: "fa-js" },
        { name: "ReactJs", icon: "fa-react" },
        { name: "Tailwind CSS", icon: "fa-css3" },
        { name: "NextJs", icon: "fa-react" },
      ],
    },
    {
      title: "UI/UX Design",
      icon: "fa-paint-brush",
      skills: [
        { name: "Figma", icon: "fa-figma" },
        { name: "Adobe XD", icon: "fa-adobe" },
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

  skillsData.forEach((category) => {
    const skillCategory = document.createElement("div");
    skillCategory.className = "skill-category";

    const skillsList = category.skills
      .map(
        (skill) => `
        <div class="skill-item">
          <i class="fab ${skill.icon}"></i>
          ${skill.name}
        </div>`
      )
      .join("");

    skillCategory.innerHTML = `
      <h3><i class="fas ${category.icon}"></i> ${category.title}</h3>
      <div class="skill-items">${skillsList}</div>
    `;

    skillsContainer.appendChild(skillCategory);
  });

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

  document
    .querySelectorAll(".skill-category")
    .forEach((el) => observer.observe(el));
}

// ======================= CUSTOM CURSOR =======================
function initCustomCursor() {
  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  const hoverElements = document.querySelectorAll(
    "a, button, .project-card, .skill-category, .skill-item, .footer-link, .nav-links a"
  );

  hoverElements.forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("active"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("active"));
  });

  document.addEventListener("mousedown", () => cursor.classList.add("click"));
  document.addEventListener("mouseup", () => cursor.classList.remove("click"));

  document.addEventListener("mouseout", (e) => {
    if (!e.relatedTarget) cursor.style.opacity = "0";
  });
  document.addEventListener("mouseover", () => (cursor.style.opacity = "1"));
}

// ======================= SCROLL INDICATOR =======================
function createScrollIndicator() {
  const scrollIndicator = document.createElement("div");
  scrollIndicator.className = "scroll-indicator";
  document.body.appendChild(scrollIndicator);

  scrollIndicator.addEventListener("click", () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  });

  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;
    scrollIndicator.style.opacity =
      currentScroll > lastScroll && currentScroll > 100 ? "0" : "1";
    lastScroll = currentScroll;
  });
}

// ======================= INIT ALL =======================
document.addEventListener("DOMContentLoaded", () => {
  createParticles();
  typeEffect();
  animateOnScroll();
  renderSkills();
  initSmoothScroll();
  initCustomCursor();
  createScrollIndicator();
  window.addEventListener("scroll", animateOnScroll);
});
