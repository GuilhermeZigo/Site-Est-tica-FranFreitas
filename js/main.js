// Sistema de animações com Intersection Observer
document.addEventListener("DOMContentLoaded", () => {
  // Observador para animar elementos ao entrar em view
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

  // Observar todas as seções e cards
  document.querySelectorAll(
    ".stats-section, .info, .vantagens-section, .procedimentos-section, " +
    ".cta-section, .testimonials-section, .contato-section, " +
    ".stat-card, .vantagem-card, .procedimento-card, " +
    ".testimonial-card, .contato-item"
  ).forEach(el => {
    el.classList.add("animate-on-scroll");
    observer.observe(el);
  });

  // Smooth scroll para links de navegação
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Efeito de parallax no hero-parallax
  const heroParallax = document.querySelector(".hero-parallax");
  if (heroParallax) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      if (scrolled < window.innerHeight * 2) {
        heroParallax.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    });
  }

  // Animação do navbar em scroll
  let lastScrollTop = 0;
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      
      if (scrolled > 100) {
        navbar.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.15)";
        navbar.style.backdropFilter = "blur(20px)";
      } else {
        navbar.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.08)";
        navbar.style.backdropFilter = "blur(10px)";
      }
      
      lastScrollTop = scrolled;
    }, false);
  }

  // Animação do contador de números
  let numberCounterDone = false;
  window.addEventListener("scroll", () => {
    if (!numberCounterDone) {
      const statsSection = document.querySelector(".stats-section");
      if (statsSection) {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          numberCounterDone = true;
          animateAllCounters();
        }
      }
    }
  });

  // Função para animar todos os contadores
  function animateAllCounters() {
    document.querySelectorAll(".stat-number").forEach(element => {
      animateCounter(element);
    });
  }

  // Função para animar um contador específico
  function animateCounter(element) {
    const target = parseInt(element.getAttribute("data-target"));
    const duration = 2000;
    const start = Date.now();
    const easeOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    
    function update() {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = easeOutQuad(progress);
      const current = Math.floor(target * easeProgress);
      element.textContent = current + (element.getAttribute("data-target").includes("%") ? "%" : "");
      
      if (progress < 1) requestAnimationFrame(update);
      else element.textContent = target + (target === 100 ? "%" : "");
    }
    
    update();
  }

  // Filtro de procedimentos
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", function() {
      const filter = this.getAttribute("data-filter");
      
      // Update active button
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      this.classList.add("active");
      
      // Filter cards
      document.querySelectorAll(".procedimento-card").forEach(card => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.opacity = "1";
          card.style.pointerEvents = "auto";
          card.style.height = "auto";
        } else {
          card.style.opacity = "0.3";
          card.style.pointerEvents = "none";
          card.style.height = "0";
        }
      });
    });
  });

  // Adicionar estilos de animação dinamicamente
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
});