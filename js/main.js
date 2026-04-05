/**
 * main.js
 * Lógica principal e animações para o site Fran Freitas
 * Organizado em módulos funcionais
 */

// ========================================
// 1. INICIALIZAÇÃO
// ========================================

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initHeroBackground();
  initMobileMenu();
  initRevealOnScroll();
  initCounterAnimation();
  initProcedureFilter();
  initSmoothScroll();
  initParallax();
  initAnimationStyles();
});

// ========================================
// 2. NAVBAR SCROLL EFFECT
// ========================================

function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 60;
    nav.classList.toggle('scrolled', scrolled);
  });
}

// ========================================
// 3. HERO BACKGROUND LOADING
// ========================================

function initHeroBackground() {
  const heroBg = document.getElementById('heroBg');
  if (!heroBg) return;

  // Aguarda um pouco antes de adicionar a classe 'loaded'
  // para disparar a animação de entrada
  setTimeout(() => {
    heroBg.classList.add('loaded');
  }, 100);
}

// ========================================
// 4. MOBILE MENU TOGGLE
// ========================================

function initMobileMenu() {
  // Função global para ser chamada do HTML
  window.toggleMenu = function () {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
      mobileMenu.classList.toggle('open');
    }
  };
}

// ========================================
// 5. REVEAL ON SCROLL ANIMATION
// ========================================

function initRevealOnScroll() {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger de 60ms entre elementos
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 60);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // Observar todos os elementos com classe 'reveal'
  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });

  // Observador adicional para elementos com classe animate-on-scroll
  const observerOptions = {
    threshold: 0.05,
    rootMargin: "0px 0px -100px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(
    ".stats-section, .info, .vantagens-section, .procedimentos-section, " +
    ".cta-section, .testimonials-section, .contato-section, " +
    ".stat-card, .vantagem-card, .procedimento-card, " +
    ".testimonial-card, .contato-item"
  ).forEach(el => {
    el.classList.add("animate-on-scroll");
    observer.observe(el);
  });
}

// ========================================
// 6. COUNTER ANIMATION
// ========================================

function initCounterAnimation() {
  // Targets para os contadores: [500, 10, 20, 100]
  const targets = [500, 10, 20, 100];
  let animated = false;

  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || animated) return;

      animated = true;
      counterObs.unobserve(entry.target);

      // Animar cada contador
      targets.forEach((target, i) => {
        const el = document.getElementById('c' + i);
        if (!el) return;

        const duration = 1800; // 1.8 segundos
        const startTime = Date.now();

        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Easing function: easeOutCubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(eased * target);

          el.textContent = current;

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            el.textContent = target;
          }
        };

        animate();
      });
    });
  }, { threshold: 0.4 });

  // Observar a seção de stats
  const statsSection = document.querySelector('.stats');
  if (statsSection) {
    counterObs.observe(statsSection);
  }
}

// ========================================
// 7. PROCEDURE FILTER
// ========================================

function initProcedureFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const procCards = document.querySelectorAll('.proc-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      // Remover active de todos os botões
      filterButtons.forEach(b => b.classList.remove('active'));

      // Adicionar active ao botão clicado
      this.classList.add('active');

      // Pegar o filtro
      const filter = this.dataset.filter;

      // Aplicar filtro aos cards
      procCards.forEach(card => {
        const shouldShow = filter === 'all' || card.dataset.category === filter;

        card.style.transition = 'opacity 0.3s, transform 0.3s';

        if (shouldShow) {
          card.style.display = 'block';
          // Força reflow para que a animação funcione
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = '';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// ========================================
// 8. SMOOTH SCROLL
// ========================================

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ========================================
// 9. PARALLAX EFFECT
// ========================================

function initParallax() {
  const heroParallax = document.querySelector('.hero-parallax');
  if (!heroParallax) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (scrolled < window.innerHeight * 2) {
      heroParallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });
}

// ========================================
// 10. ANIMATION STYLES
// ========================================

function initAnimationStyles() {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    .animate-on-scroll {
      animation: none;
    }

    .animate-on-scroll.animate-in {
      animation: fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }

    .stat-card.animate-in {
      animation: scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }

    .vantagem-card.animate-in,
    .procedimento-card.animate-in,
    .testimonial-card.animate-in,
    .contato-item.animate-in {
      animation: fadeInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(40px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(0.9);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    /* Efeito de loading smooth */
    body {
      animation: pageLoad 0.6s ease-out;
    }

    @keyframes pageLoad {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(styleSheet);

  // Adicionar delays em cards de procedimentos para efeito em cascata
  document.querySelectorAll(".procedimento-card").forEach((card, index) => {
    card.style.setProperty("--delay", `${index * 0.1}s`);
  });
}

// ========================================
// UTILITÁRIOS
// ========================================

/**
 * Debounce function para otimizar event listeners
 * @param {Function} func - Função a executar
 * @param {Number} wait - Delay em ms
 * @returns {Function}
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function para otimizar scroll/resize events
 * @param {Function} func - Função a executar
 * @param {Number} limit - Delay em ms
 * @returns {Function}
 */
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}