// ===== DOM Elements =====
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const langBtns = document.querySelectorAll('.lang-btn');
const translatableElements = document.querySelectorAll('[data-en][data-id]');

// ===== Mobile Navigation =====
navToggle?.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.navbar')) {
    navMenu.classList.remove('active');
    navToggle?.classList.remove('active');
  }
});

// ===== Language Toggle =====
let currentLang = localStorage.getItem('lang') || 'en';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  
  // Update button states
  langBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  
  // Update translatable elements
  translatableElements.forEach(el => {
    const text = el.dataset[lang];
    if (text) {
      el.textContent = text;
    }
  });
  
  // Update HTML lang attribute
  document.documentElement.lang = lang === 'id' ? 'id' : 'en';
}

// Initialize language
setLanguage(currentLang);

// Language button click handlers
langBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    setLanguage(btn.dataset.lang);
  });
});

// ===== Scroll Reveal Animation =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.14,
  rootMargin: '0px 0px -70px 0px'
});

revealElements.forEach((el, index) => {
  el.style.setProperty('--reveal-delay', `${Math.min(index * 55, 330)}ms`);
  revealObserver.observe(el);
});

// ===== Smooth Scroll for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== Navbar Background on Scroll =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  
  if (currentScrollY > 50) {
    navbar.style.background = 'rgba(244, 240, 234, 0.96)';
    navbar.style.boxShadow = '0 10px 30px rgba(54, 43, 31, 0.1)';
  } else {
    navbar.style.background = 'rgba(244, 240, 234, 0.82)';
    navbar.style.boxShadow = 'none';
  }
});

// ===== Active Navigation Link =====
const sections = document.querySelectorAll('section[id]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, {
  threshold: 0.3,
  rootMargin: '-80px 0px -50% 0px'
});

sections.forEach(section => {
  navObserver.observe(section);
});

// ===== Typing Animation for Hero (Optional Enhancement) =====
const heroSubtitle = document.querySelector('.hero-subtitle');
const originalText = heroSubtitle?.textContent || '';

function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Uncomment to enable typing animation
// if (heroSubtitle) {
//   typeWriter(heroSubtitle, originalText, 30);
// }

// ===== Parallax Effect for Hero (Subtle) =====
const hero = document.querySelector('.hero');
const heroImage = document.querySelector('.image-wrapper');

window.addEventListener('scroll', () => {
  if (window.innerWidth > 768) {
    const scrolled = window.scrollY;
    if (heroImage && scrolled < window.innerHeight) {
      heroImage.style.transform = `translateY(${scrolled * 0.1}px) rotate(1.6deg)`;
    }
  }
});

// ===== Console Note =====
console.log('%cHello, curious developer.', 'font-size: 22px; font-weight: bold; color: #a85f3f;');
console.log('%cInterested in the work? Reach out via LinkedIn or email.', 'font-size: 14px; color: #5e574d;');
console.log('%chttps://www.linkedin.com/in/muhamad-rafli-kamal/', 'font-size: 12px; color: #5d7258;');

// ===== Preloader (Optional) =====
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Trigger initial animations
  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('active');
      }, index * 55);
    });
  }, 300);
});
