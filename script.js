// ============================
// Portfolio JS Optimized Version (Validation Bypassed Temporarily)
// ============================

// ===== Projects Array =====
const projects = [
  {
    name: "Personal Portfolio Website",
    description: "A responsive web portfolio with animations and contact form.",
    image: "Picture/Generated Image September 05, 2025 - 6_15PM (1) (1).jpeg",
    link: "#",
    category: "Web"
  },
  {
    name: "AI Chatbot Assistant",
    description: "An AI-powered chatbot built with NLP and Python.",
    image: "https://via.placeholder.com/400x250?text=AI+Chatbot",
    link: "#",
    category: "AI"
  },
  {
    name: "Python Data Dashboard",
    description: "Interactive analytics dashboard using Python and Power BI.",
    image: "Picture/Screenshot 2025-05-27 195300.png",
    link: "Picture/Screenshot 2025-05-27 195300.png",
    category: "Python"
  },
  {
    name: "E-commerce Web App",
    description: "Modern shopping site built with HTML, CSS, JS.",
    image: "https://via.placeholder.com/400x250?text=E-commerce+App",
    link: "#",
    category: "Web"
  }
];

// ===== DOM Elements =====
const portfolioContainer = document.getElementById("project-container");
const filterButtons = document.querySelectorAll(".filter-btn");
const backToTop = document.getElementById("backToTop");
const counters = document.querySelectorAll(".counter");
const skillBars = document.querySelectorAll(".skill-bar");
const contactForm = document.getElementById("contactForm");
const newsletterForm = document.getElementById("newsletter-form");

// ===== Initialize EmailJS (Updated for v4 - 2025) =====
// CRITICAL: 
// 1. Add this script to your HTML <head>: <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
// 2. Get your Public Key from https://dashboard.emailjs.com/admin/account
// 3. Service ID (e.g., 'service_abc123') from Email Services
// 4. Template ID (e.g., 'template_def456') from Email Templates (match vars: {{from_name}}, {{from_email}}, {{message}})
// 5. For form inputs: Use name="from_name", name="from_email", name="message" to match template
if (typeof emailjs !== 'undefined') {
  emailjs.init({ publicKey: "3kj4At1wxfNEL5x2z" });
} else {
  console.error("EmailJS SDK not loaded! Add the script tag to HTML <head>.");
}

// ===== Render Projects =====
function renderProjects(filter = "all") {
  if (!portfolioContainer) return console.warn("Project container not found.");
  portfolioContainer.classList.add("fade-out");
  setTimeout(() => {
    portfolioContainer.innerHTML = "";
    const filtered = filter === "all" ? projects : projects.filter(p => p.category === filter);

    filtered.forEach(project => {
      const card = document.createElement("div");
      card.className = "project-card fade-in";
      card.innerHTML = `
        <img data-src="${project.image}" alt="${project.name}" class="lazy" loading="lazy">
        <div class="content">
          <h3>${project.name}</h3>
          <p>${project.description}</p>
          <a href="${project.link}" target="_blank">View Project →</a>
        </div>
      `;
      portfolioContainer.appendChild(card);
    });

    portfolioContainer.classList.remove("fade-out");
    initLazyLoad(); // Re-init lazy-load for new images
  }, 200);
}

// ===== Filter Buttons =====
if (filterButtons.length > 0) {
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderProjects(btn.dataset.category || "all");
    });
  });
}

// ===== Lazy Load Images =====
function initLazyLoad() {
  const lazyImgs = document.querySelectorAll("img.lazy");
  if ("IntersectionObserver" in window) {
    const imgObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove("lazy");
          }
          observer.unobserve(img);
        }
      });
    }, { rootMargin: "0px 0px 100px 0px" });

    lazyImgs.forEach(img => imgObserver.observe(img));
  } else {
    lazyImgs.forEach(img => {
      if (img.dataset.src) img.src = img.dataset.src;
    });
  }
}

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

// ===== Fade-In on Scroll + Animations (Fixed Counters & Skills) =====
const fadeObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      // Skill Bars Animation (Fixed)
      if (entry.target.classList.contains("skill-bar")) {
        const progress = entry.target.querySelector(".skill-progress");
        if (progress && progress.dataset.value) {
          progress.style.width = progress.dataset.value + "%";
        }
      }

      // Counters Animation (Fixed: Direct call, no dataset.updateFn)
      if (entry.target.classList.contains("counter")) {
        animateCounter(entry.target);
      }

      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".fade-in, .slide-in, .section, .skill-bar, .counter").forEach(el => {
  if (el) fadeObserver.observe(el);
});

// ===== Counters Animation (Fixed) =====
function animateCounter(counter) {
  if (!counter || !counter.dataset.target) {
    console.warn("Counter missing 'data-target' attribute. Add e.g., data-target='100' to HTML.");
    return;
  }
  const target = parseInt(counter.dataset.target, 10);
  if (isNaN(target)) return;
  let count = 0;
  const increment = target / 80;
  function update() {
    if (count < target) {
      count += increment;
      counter.textContent = Math.ceil(count);
      requestAnimationFrame(update);
    } else {
      counter.textContent = target.toString();
    }
  }
  update();
}

// ===== Back to Top =====
if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 300);
  });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ===== Contact Form Submission (Validation Bypassed for Now) =====
if (contactForm) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();

    // TEMPORARILY BYPASSED: No validation checks - directly send
    // (Later, uncomment if needed: const name = ...; if (!name || ...) { alert(...); return; })

    // Send via EmailJS (Replace IDs!)
    emailjs.sendForm('service_golam@740', '__ejs-test-mail-service__', contactForm)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert("✅ Message sent successfully! I'll get back to you soon.");
        contactForm.reset();
      })
      .catch((error) => {
        console.error('FAILED...', error);
        alert("❌ Something went wrong. Check console (F12) for details. Verify Service/Template IDs.");
      });
  });
} else {
  console.warn("Contact form not found. Add id='contactForm' to your <form>.");
}

// ===== Newsletter Form Submission (Validation Bypassed for Now) =====
if (newsletterForm) {
  newsletterForm.addEventListener("submit", e => {
    e.preventDefault();

    // TEMPORARILY BYPASSED: No email check - directly send
    const emailInput = document.getElementById("user_email");
    if (!emailInput) {
      console.error("Newsletter email input missing. Add id='user_email'.");
      return;
    }
    const email = emailInput.value.trim();
    if (!email) {
      return alert("❌ Please enter your email."); // Keep basic empty check
    }

    // Send via EmailJS (Replace IDs! Use a separate template for newsletters)
    emailjs.send('service_golam@740', '__ejs-test-mail-service__', { user_email: email })
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert("✅ Thank you for subscribing!");
        newsletterForm.reset();
      })
      .catch((error) => {
        console.error('FAILED...', error);
        alert("❌ Something went wrong. Check console for details.");
      });
  });
} else {
  console.warn("Newsletter form not found. Add id='newsletter-form' to your <form>.");
}

// ===== Initialize =====
document.addEventListener("DOMContentLoaded", () => {
  if (portfolioContainer) renderProjects("all");
  initLazyLoad();
});