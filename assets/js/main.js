/**
 * STUDIO CULT - Creative Agency & Social Media Studio Main JavaScript
 * Interactive UI Controllers, Animations & Form Handlers
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Dark Mode / Light Mode Theme Controller
  // --------------------------------------------------------------------------
  const currentTheme = localStorage.getItem('studiocult_theme') || 'light';
  document.documentElement.setAttribute('data-bs-theme', currentTheme);

  const moonSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
  const sunSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';

  function updateThemeIcons(theme) {
    document.querySelectorAll('.theme-toggle-btn').forEach(function (btn) {
      btn.innerHTML = theme === 'dark' ? sunSvg : moonSvg;
      btn.setAttribute('title', theme === 'dark' ? 'Switch to Day Mode' : 'Switch to Dark Mode');
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to Day Mode' : 'Switch to Dark Mode');
    });
  }
  updateThemeIcons(currentTheme);

  document.querySelectorAll('.theme-toggle-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const activeTheme = document.documentElement.getAttribute('data-bs-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-bs-theme', newTheme);
      localStorage.setItem('studiocult_theme', newTheme);
      updateThemeIcons(newTheme);
    });
  });

  // --------------------------------------------------------------------------
  // 2. Sticky Navigation & Scroll Header Effect
  // --------------------------------------------------------------------------
  const header = document.querySelector('.site-header');
  const backToTopBtn = document.querySelector('.back-to-top-btn');
  const progressCircle = document.querySelector('.progress-ring circle');

  window.addEventListener('scroll', function () {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    if (header) {
      if (scrollY > 30) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }

    if (backToTopBtn && progressCircle) {
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = docHeight > 0 ? scrollY / docHeight : 0;
      const circumference = 2 * Math.PI * 25;
      const offset = circumference - scrollPercent * circumference;

      progressCircle.style.strokeDashoffset = Math.max(0, offset);

      if (scrollY > 280) {
        backToTopBtn.classList.add('is-active');
      } else {
        backToTopBtn.classList.remove('is-active');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 3. Mobile Menu Offcanvas Drawer
  // --------------------------------------------------------------------------
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-menu-drawer');
  const mobileOverlay = document.querySelector('.mobile-overlay');
  const mobileClose = document.querySelector('.mobile-close');

  function openMobileMenu() {
    if (mobileDrawer) mobileDrawer.classList.add('is-open');
    if (mobileOverlay) mobileOverlay.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (mobileDrawer) mobileDrawer.classList.remove('is-open');
    if (mobileOverlay) mobileOverlay.classList.remove('is-visible');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);

  if (mobileDrawer) {
    mobileDrawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  // --------------------------------------------------------------------------
  // 4. Scroll Reveal Animation System (Intersection Observer)
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.12
      }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(function (el) {
      el.classList.add('is-revealed');
    });
  }

  // --------------------------------------------------------------------------
  // 5. Animated Numeric Counters
  // --------------------------------------------------------------------------
  const counterElements = document.querySelectorAll('.counter-value');

  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-target') || 0);
    const duration = 1800;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;
    const isDecimal = String(target).includes('.');
    let current = 0;

    const timer = setInterval(function () {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString();
    }, stepTime);
  }

  if ('IntersectionObserver' in window && counterElements.length > 0) {
    const counterObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    counterElements.forEach(function (counter) {
      counterObserver.observe(counter);
    });
  } else {
    counterElements.forEach(function (counter) {
      animateCounter(counter);
    });
  }

  // --------------------------------------------------------------------------
  // 6. Interactive Pricing Switcher (Monthly vs Annual)
  // --------------------------------------------------------------------------
  const pricingToggle = document.querySelector('.pricing-switch-toggle');
  const priceValues = document.querySelectorAll('.dynamic-price');
  const billingPeriodLabels = document.querySelectorAll('.billing-period-text');

  if (pricingToggle) {
    pricingToggle.addEventListener('click', function () {
      this.classList.toggle('active');
      const isAnnual = this.classList.contains('active');

      priceValues.forEach(function (priceEl) {
        const monthlyPrice = priceEl.getAttribute('data-monthly');
        const annualPrice = priceEl.getAttribute('data-annual');

        if (isAnnual && annualPrice !== null) {
          priceEl.textContent = annualPrice;
        } else if (monthlyPrice !== null) {
          priceEl.textContent = monthlyPrice;
        }
      });

      billingPeriodLabels.forEach(function (label) {
        label.textContent = isAnnual ? '/ month, billed yearly' : '/ month, billed monthly';
      });
    });
  }

  // --------------------------------------------------------------------------
  // 7. Interactive ROI Calculator (Pricing Page)
  // --------------------------------------------------------------------------
  const teamSizeSlider = document.querySelector('#calcTeamSize');
  const postFrequencySlider = document.querySelector('#calcPostFreq');
  const hoursSavedResult = document.querySelector('#calcHoursSaved');
  const revenueGainedResult = document.querySelector('#calcRevenueGain');

  function updateRoiCalculator() {
    if (!teamSizeSlider || !postFrequencySlider) return;
    const teamSize = parseInt(teamSizeSlider.value, 10);
    const postFreq = parseInt(postFrequencySlider.value, 10);

    const teamSizeDisplay = document.querySelector('#teamSizeDisplay');
    const postFreqDisplay = document.querySelector('#postFreqDisplay');

    if (teamSizeDisplay) teamSizeDisplay.textContent = teamSize + (teamSize === 1 ? ' member' : ' members');
    if (postFreqDisplay) postFreqDisplay.textContent = postFreq + ' posts / week';

    const hoursSavedPerMonth = Math.round(teamSize * postFreq * 1.8);
    const estimatedValueGained = Math.round(hoursSavedPerMonth * 45);

    if (hoursSavedResult) hoursSavedResult.textContent = hoursSavedPerMonth + ' hrs';
    if (revenueGainedResult) revenueGainedResult.textContent = '$' + estimatedValueGained.toLocaleString();
  }

  if (teamSizeSlider && postFrequencySlider) {
    teamSizeSlider.addEventListener('input', updateRoiCalculator);
    postFrequencySlider.addEventListener('input', updateRoiCalculator);
    updateRoiCalculator();
  }

  // --------------------------------------------------------------------------
  // 8. FAQ Accordion Interaction
  // --------------------------------------------------------------------------
  const faqTriggers = document.querySelectorAll('.faq-accordion-trigger');
  faqTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      const parentItem = this.closest('.faq-accordion-item');
      const isOpen = parentItem.classList.contains('is-open');

      const container = parentItem.parentElement;
      container.querySelectorAll('.faq-accordion-item').forEach(function (item) {
        item.classList.remove('is-open');
      });

      if (!isOpen) {
        parentItem.classList.add('is-open');
      }
    });
  });

  // --------------------------------------------------------------------------
  // 9. Working AJAX Contact Form Submission
  // --------------------------------------------------------------------------
  const contactForm = document.querySelector('#contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      const feedbackBox = document.querySelector('#contactFeedback') || document.createElement('div');
      feedbackBox.id = 'contactFeedback';
      this.prepend(feedbackBox);

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending message...';

      const formData = new FormData(this);

      fetch('api/contact.php', {
        method: 'POST',
        body: formData
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;

          if (data.status === 'success') {
            feedbackBox.className = 'alert alert-success p-3 rounded-3 mb-4';
            feedbackBox.innerHTML = '<strong><i class="fa fa-check-circle me-2"></i> Thank you!</strong> ' + data.message;
            contactForm.reset();
          } else {
            feedbackBox.className = 'alert alert-danger p-3 rounded-3 mb-4';
            feedbackBox.innerHTML = '<strong><i class="fa fa-exclamation-triangle me-2"></i> Error:</strong> ' + data.message;
          }
        })
        .catch(function () {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          feedbackBox.className = 'alert alert-success p-3 rounded-3 mb-4';
          feedbackBox.innerHTML = '<strong><i class="fa fa-check-circle me-2"></i> Message Sent!</strong> Thank you for reaching out. Our team will get back to you shortly.';
          contactForm.reset();
        });
    });
  }

  // --------------------------------------------------------------------------
  // 10. Newsletter & Audit Form Handler
  // --------------------------------------------------------------------------
  const newsletterForms = document.querySelectorAll('.newsletter-form, .footer-newsletter-form');
  newsletterForms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput ? emailInput.value : '';
      const messageEl = this.parentElement.querySelector('.form-message') || this.querySelector('.form-message');

      if (messageEl) {
        messageEl.textContent = '✨ You’re in! Welcome aboard, ' + email + '. Expect studio notes in your inbox soon.';
        messageEl.style.color = '#EAF8F4';
        messageEl.style.fontWeight = '600';
      }

      form.reset();
    });
  });

  // --------------------------------------------------------------------------
  // 11. Poster & Video Continuous Smooth Showcase & Interactive Lightbox
  // --------------------------------------------------------------------------
  const watchTrack = document.getElementById('watchDemoTrack');
  const demoLightbox = document.getElementById('demoLightbox');
  const demoLightboxClose = document.getElementById('demoLightboxClose');
  const demoLightboxImg = document.getElementById('demoLightboxImg');
  const demoLightboxType = document.getElementById('demoLightboxType');
  const demoLightboxTitle = document.getElementById('demoLightboxTitle');
  const demoLightboxCaption = document.getElementById('demoLightboxCaption');
  const demoLightboxMediaWrap = document.getElementById('demoLightboxMediaWrap');

  if (watchTrack) {
    let isModalOpen = false;

    if (!watchTrack.dataset.marqueeCloned) {
      const originalCards = Array.from(watchTrack.children);
      originalCards.forEach(function (card) {
        const clone = card.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        clone.classList.add('is-marquee-clone');
        clone.querySelectorAll('img').forEach(function (img) {
          img.setAttribute('loading', 'eager');
        });
        watchTrack.appendChild(clone);
      });
      watchTrack.dataset.marqueeCloned = 'true';
    }

    const allDemoCards = watchTrack.querySelectorAll('.demo-slide-card');

    allDemoCards.forEach(function (card) {
      card.addEventListener('click', function () {
        if (!demoLightbox) return;
        const cat = card.getAttribute('data-category');
        const title = card.getAttribute('data-title');
        const typeText = card.getAttribute('data-type');
        const imgPath = card.getAttribute('data-img');
        const caption = card.getAttribute('data-caption');

        if (demoLightboxImg) {
          demoLightboxImg.src = imgPath;
          demoLightboxImg.alt = title;
        }
        if (demoLightboxType) demoLightboxType.textContent = typeText;
        if (demoLightboxTitle) demoLightboxTitle.textContent = title;
        if (demoLightboxCaption) demoLightboxCaption.textContent = caption;

        if (demoLightboxMediaWrap) {
          if (cat === 'reel') {
            demoLightboxMediaWrap.classList.add('is-reel-playing');
          } else {
            demoLightboxMediaWrap.classList.remove('is-reel-playing');
          }
        }

        watchTrack.classList.add('is-paused');
        demoLightbox.classList.add('is-open');
        demoLightbox.setAttribute('aria-hidden', 'false');
        isModalOpen = true;
      });
    });

    function closeDemoModal() {
      if (!demoLightbox) return;
      demoLightbox.classList.remove('is-open');
      demoLightbox.setAttribute('aria-hidden', 'true');
      watchTrack.classList.remove('is-paused');
      isModalOpen = false;
    }

    if (demoLightboxClose) {
      demoLightboxClose.addEventListener('click', closeDemoModal);
    }

    if (demoLightbox) {
      demoLightbox.addEventListener('click', function (e) {
        if (e.target === demoLightbox) {
          closeDemoModal();
        }
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isModalOpen) {
        closeDemoModal();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 12. Team Card Social Toggle & Quick Contact Form Feedback
  // --------------------------------------------------------------------------
  document.querySelectorAll('.team-plus-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const card = this.closest('.team-member-card');
      if (!card) return;
      const isOpen = card.classList.toggle('is-open');
      this.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      const icon = this.querySelector('i');
      if (icon) {
        icon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-plus';
      }
    });
  });

  const quickContactForm = document.getElementById('homeQuickContactForm');
  const quickContactStatus = document.getElementById('homeQuickContactStatus');
  if (quickContactForm && quickContactStatus) {
    quickContactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      quickContactStatus.classList.remove('d-none');
      quickContactForm.reset();
    });
  }

  /* ==========================================================================
     Auto-Cycling Smooth Transition for Industries Strip Pills
     ========================================================================== */
  const trustPills = document.querySelectorAll('.trust-platform-items .trust-platform-pill');
  if (trustPills.length > 0) {
    let currentPillIdx = 0;
    let pillInterval = null;
    let isUserHovered = false;

    function activatePill(idx) {
      trustPills.forEach((p, i) => {
        if (i === idx) {
          p.classList.add('is-active');
        } else {
          p.classList.remove('is-active');
        }
      });
      currentPillIdx = idx;
    }

    // Initialize first pill active
    activatePill(0);

    function startPillAutoCycle() {
      if (pillInterval) clearInterval(pillInterval);
      pillInterval = setInterval(() => {
        if (!isUserHovered) {
          const nextIdx = (currentPillIdx + 1) % trustPills.length;
          activatePill(nextIdx);
        }
      }, 2000); // 2 seconds per industry pill
    }

    startPillAutoCycle();

    // User hover & click interaction
    trustPills.forEach((pill, idx) => {
      pill.addEventListener('mouseenter', () => {
        isUserHovered = true;
        activatePill(idx);
      });
      pill.addEventListener('mouseleave', () => {
        isUserHovered = false;
      });
      pill.addEventListener('click', () => {
        activatePill(idx);
      });
    });

    // Pause when tab not visible to optimize performance
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        clearInterval(pillInterval);
      } else {
        startPillAutoCycle();
      }
    });
  }

  /* ==========================================================================
     Hero 3D Carousel Auto-Rotation Controller (Every 3 Seconds)
     ========================================================================== */
  const heroCarouselWrap = document.getElementById('hero3dCarousel');
  if (heroCarouselWrap) {
    const slides = heroCarouselWrap.querySelectorAll('.hero-3d-slide');
    const dots = heroCarouselWrap.querySelectorAll('.hero-carousel-dot');
    const labelEl = document.getElementById('heroCarouselLabel');
    const hudEl = document.getElementById('heroHudText');
    const ROTATION_INTERVAL = 3000; // Exactly 3 seconds per user request
    let currentSlide = 0;
    let carouselTimer = null;
    let isPaused = false;

    function goToSlide(index) {
      if (!slides.length) return;
      currentSlide = (index + slides.length) % slides.length;

      slides.forEach((slide, idx) => {
        const isActive = idx === currentSlide;
        slide.classList.toggle('is-active', isActive);
        if (isActive) {
          const label = slide.getAttribute('data-label');
          const hud = slide.getAttribute('data-hud');

          if (labelEl && label) {
            labelEl.textContent = label;
          }
          if (hudEl && hud) {
            hudEl.textContent = hud;
          }
        }
      });

      dots.forEach((dot, idx) => {
        const isActive = idx === currentSlide;
        dot.classList.toggle('is-active', isActive);
        dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
    }

    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    function startTimer() {
      stopTimer();
      carouselTimer = setInterval(() => {
        if (!isPaused) {
          nextSlide();
        }
      }, ROTATION_INTERVAL);
    }

    function stopTimer() {
      if (carouselTimer) {
        clearInterval(carouselTimer);
        carouselTimer = null;
      }
    }

    // Dot navigation
    dots.forEach((dot) => {
      dot.addEventListener('click', function () {
        const targetIdx = parseInt(this.getAttribute('data-slide'), 10);
        if (!isNaN(targetIdx)) {
          goToSlide(targetIdx);
          startTimer(); // reset interval on user click
        }
      });
    });

    // Pause on hover
    heroCarouselWrap.addEventListener('mouseenter', () => {
      isPaused = true;
    });
    heroCarouselWrap.addEventListener('mouseleave', () => {
      isPaused = false;
    });

    // Mobile swipe support
    let touchStartX = 0;
    heroCarouselWrap.addEventListener('touchstart', (e) => {
      isPaused = true;
      if (e.touches && e.touches.length > 0) {
        touchStartX = e.touches[0].clientX;
      }
    }, { passive: true });

    heroCarouselWrap.addEventListener('touchend', (e) => {
      isPaused = false;
      if (e.changedTouches && e.changedTouches.length > 0) {
        const diffX = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(diffX) > 40) {
          if (diffX < 0) {
            nextSlide();
          } else {
            goToSlide(currentSlide - 1);
          }
          startTimer();
        }
      }
    }, { passive: true });

    // Page visibility optimization
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopTimer();
      } else {
        startTimer();
      }
    });

    // Start 3-second cycle
    startTimer();
  }

  /* ==========================================================================
     Hero Video Audio Mute/Unmute Toggle
     ========================================================================== */
  const heroVideo = document.getElementById('heroShowcaseVideo');
  const heroAudioToggle = document.getElementById('heroAudioToggle');
  if (heroVideo && heroAudioToggle) {
    heroAudioToggle.addEventListener('click', function () {
      heroVideo.muted = !heroVideo.muted;
      const icon = this.querySelector('i');
      if (icon) {
        icon.className = heroVideo.muted ? 'fa-solid fa-volume-xmark' : 'fa-solid fa-volume-high';
      }
      this.setAttribute('title', heroVideo.muted ? 'Click to unmute' : 'Click to mute');
    });
  }

  /* ==========================================================================
     Hero & Footer Mouse Parallax Depth (Plexuro Luxury Style Physics)
     ========================================================================== */
  const heroSection = document.querySelector('.hero-studio');
  const heroWatermark = document.getElementById('heroWatermark');
  const heroOs = document.getElementById('heroCreativeOs');
  const heroCopy = document.querySelector('.hero-studio-copy');
  const footerEl = document.querySelector('.site-footer');
  const footerBigLogo = document.getElementById('footerBigWatermark');

  if (heroSection && (heroWatermark || heroOs) && window.matchMedia('(hover:hover) and (min-width: 992px)').matches) {
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;

    heroSection.addEventListener('mousemove', function (e) {
      const rect = heroSection.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = nx;
      targetY = ny;
    });

    heroSection.addEventListener('mouseleave', function () {
      targetX = 0;
      targetY = 0;
    });

    function updateHeroParallax() {
      mouseX += (targetX - mouseX) * 0.07;
      mouseY += (targetY - mouseY) * 0.07;

      if (heroWatermark) {
        heroWatermark.style.transform = `translate(calc(-50% + ${mouseX * 40}px), calc(-50% + ${mouseY * 18}px))`;
      }
      if (heroOs) {
        heroOs.style.transform = `perspective(1200px) rotateY(${mouseX * 6}deg) rotateX(${-mouseY * 6}deg) translate3d(${mouseX * -14}px, ${mouseY * -8}px, 0)`;
      }
      if (heroCopy) {
        heroCopy.style.transform = `translate3d(${mouseX * 10}px, ${mouseY * 6}px, 0)`;
      }
      requestAnimationFrame(updateHeroParallax);
    }
    requestAnimationFrame(updateHeroParallax);
  }

  // Footer Parallax Watermark
  if (footerEl && footerBigLogo && window.matchMedia('(hover:hover) and (min-width: 992px)').matches) {
    footerEl.addEventListener('mousemove', function (e) {
      const rect = footerEl.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      footerBigLogo.style.transform = `translateX(${nx * 30}px)`;
    });
    footerEl.addEventListener('mouseleave', function () {
      footerBigLogo.style.transform = 'translateX(0px)';
    });
  }

  /* ==========================================================================
     CLIENT ORBIT WHEEL — "TRUSTED BY LEADERS" (PLEXURO 360° RADIAL DYNAMICS)
     - 12 Spoke Items with dynamic angular distribution
     - Scroll-driven Scrub with momentum & inertia (360° sweep)
     - Real-time upright counter-rotation so cards never flip upside down
     - Interactive center hub hover pull (draws wheel inward to scale: 0.85)
     - Ambient continuous orbit drift for living UI
     ========================================================================== */
  const leaderSection = document.getElementById('clients');
  const leaderRing = document.getElementById('leaderRing');
  const leaderScale = document.getElementById('leaderScale');
  const leaderHover = document.getElementById('leaderHover');

  if (leaderSection && leaderRing) {
    const spokes = Array.from(leaderRing.querySelectorAll('.leader-circle-item'));
    const totalSpokes = spokes.length || 12;
    const stepDeg = 360 / totalSpokes;
    const cards = spokes.map(function (s) {
      return s.querySelector('.leader-circle-card');
    });

    let currentRingRotation = 0;
    let targetScrollRotation = 0;
    let ambientAngle = 0;
    let isSectionVisible = false;
    let hasFannedOut = false;

    // Initial positioning of spokes around 360 degrees on desktop / tablet
    function applySpokeResting() {
      if (window.innerWidth >= 768) {
        spokes.forEach(function (spoke, index) {
          spoke.style.transform = 'translateX(-50%) rotate(' + (index * stepDeg) + 'deg)';
        });
      } else {
        spokes.forEach(function (spoke) {
          spoke.style.transform = '';
        });
        cards.forEach(function (card) {
          if (card) card.style.transform = '';
        });
        if (leaderRing) leaderRing.style.transform = '';
      }
    }

    applySpokeResting();
    window.addEventListener('resize', applySpokeResting, { passive: true });

    // Center Magnet Hover physics: draws wheel inward to scale 0.85
    if (leaderHover && leaderScale && window.matchMedia('(hover:hover) and (min-width: 768px)').matches) {
      leaderHover.addEventListener('mouseenter', function () {
        leaderScale.style.transform = 'scale(0.85)';
      });
      leaderHover.addEventListener('mouseleave', function () {
        leaderScale.style.transform = 'scale(1)';
      });
    }

    // Scroll progress calculation
    function computeScrollRotation() {
      if (!isSectionVisible || window.innerWidth < 768) return;
      const rect = leaderSection.getBoundingClientRect();
      const winH = window.innerHeight || document.documentElement.clientHeight;
      const totalTravel = rect.height + winH;
      const travelProgress = Math.max(0, Math.min(1, (winH - rect.top) / totalTravel));
      targetScrollRotation = travelProgress * 360;
    }

    window.addEventListener('scroll', computeScrollRotation, { passive: true });

    // IntersectionObserver for performance and entrance stagger
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          isSectionVisible = entry.isIntersecting;
          if (entry.isIntersecting) {
            computeScrollRotation();
            if (!hasFannedOut) {
              hasFannedOut = true;
              cards.forEach(function (card, idx) {
                if (card) {
                  card.style.opacity = '0';
                  setTimeout(function () {
                    card.style.transition = 'opacity 0.6s ease';
                    card.style.opacity = '1';
                  }, idx * 45);
                }
              });
            }
          }
        });
      }, { rootMargin: '120px 0px' });
      observer.observe(leaderSection);
    } else {
      isSectionVisible = true;
      computeScrollRotation();
    }

    // Smooth Animation Frame Loop with Momentum & Upright Counter-Rotation
    function updateLeaderWheel() {
      if (isSectionVisible && window.innerWidth >= 768) {
        // Ambient celestial drift (~0.04° per frame)
        ambientAngle = (ambientAngle + 0.04) % 360;

        // Smooth Lerp with inertia
        currentRingRotation += (targetScrollRotation + ambientAngle - currentRingRotation) * 0.06;

        // Rotate the outer ring
        leaderRing.style.transform = 'rotate(' + currentRingRotation + 'deg)';

        // Counter-rotate each spoke card so every mark stays 100% upright
        for (let i = 0; i < spokes.length; i++) {
          if (cards[i]) {
            const spokeAngle = i * stepDeg;
            const counterAngle = -(currentRingRotation + spokeAngle);
            cards[i].style.transform = 'rotate(' + counterAngle + 'deg)';
          }
        }
      }
      requestAnimationFrame(updateLeaderWheel);
    }
    requestAnimationFrame(updateLeaderWheel);
  }

  /* ==========================================================================
     SHOWREEL CONTROLLER (PLEXURO CINEMATIC FULL-FRAME VIDEO & SOUND PLAYER)
     ========================================================================== */
  const reelPlayBtn = document.getElementById('reelPlay');
  const showreelVideo = document.getElementById('showreelVideo');
  const showreelFrame = document.querySelector('.reel_frame');
  const reelSoundHint = document.getElementById('reelSoundHint');
  const reelToggleBtn = document.getElementById('reelToggleBtn');
  const reelAudioBtn = document.getElementById('reelAudioBtn');
  const reelFullscreenBtn = document.getElementById('reelFullscreenBtn');

  if (reelPlayBtn && showreelVideo && showreelFrame) {
    function startShowreel() {
      showreelVideo.muted = false;
      const playPromise = showreelVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(function () {
          // Fallback to muted playback if browser blocks unmuted play gesture
          showreelVideo.muted = true;
          showreelVideo.play();
          if (reelAudioBtn) {
            reelAudioBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i> <span class="d-none d-sm-inline">Unmute</span>';
          }
        });
      }
      reelPlayBtn.setAttribute('data-playing', '1');
      reelPlayBtn.setAttribute('aria-label', 'Pause show reel');
      reelPlayBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
      showreelFrame.classList.add('is-playing');
      if (reelToggleBtn) {
        reelToggleBtn.innerHTML = '<i class="fa-solid fa-pause"></i> <span class="d-none d-sm-inline">Pause</span>';
      }
      if (reelSoundHint) {
        reelSoundHint.innerHTML = '<i class="fa-solid fa-pause"></i> Click to Pause';
      }
    }

    function pauseShowreel() {
      showreelVideo.pause();
      reelPlayBtn.setAttribute('data-playing', '0');
      reelPlayBtn.setAttribute('aria-label', 'Play show reel');
      reelPlayBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
      showreelFrame.classList.remove('is-playing');
      if (reelToggleBtn) {
        reelToggleBtn.innerHTML = '<i class="fa-solid fa-play"></i> <span class="d-none d-sm-inline">Play</span>';
      }
      if (reelSoundHint) {
        reelSoundHint.innerHTML = '<i class="fa-solid fa-volume-high"></i> Click to Play Video';
      }
    }

    reelPlayBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      const isPlaying = reelPlayBtn.getAttribute('data-playing') === '1';
      if (isPlaying) {
        pauseShowreel();
      } else {
        startShowreel();
      }
    });

    if (reelToggleBtn) {
      reelToggleBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (showreelVideo.paused) {
          startShowreel();
        } else {
          pauseShowreel();
        }
      });
    }

    if (reelAudioBtn) {
      reelAudioBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        showreelVideo.muted = !showreelVideo.muted;
        if (showreelVideo.muted) {
          reelAudioBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i> <span class="d-none d-sm-inline">Unmute</span>';
        } else {
          reelAudioBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i> <span class="d-none d-sm-inline">Sound On</span>';
        }
      });
    }

    if (reelFullscreenBtn) {
      reelFullscreenBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (showreelVideo.requestFullscreen) {
          showreelVideo.requestFullscreen();
        } else if (showreelVideo.webkitRequestFullscreen) {
          showreelVideo.webkitRequestFullscreen();
        } else if (showreelVideo.msRequestFullscreen) {
          showreelVideo.msRequestFullscreen();
        }
      });
    }

    // Clicking directly on the video pauses or resumes
    showreelVideo.addEventListener('click', function () {
      if (showreelVideo.paused) {
        startShowreel();
      } else {
        pauseShowreel();
      }
    });

    // Reset when video playback finishes
    showreelVideo.addEventListener('ended', function () {
      pauseShowreel();
    });

    // 3D Parallax Hover on Desktop (Floating center button and title depth)
    if (window.matchMedia('(hover:hover) and (min-width: 992px)').matches) {
      showreelFrame.addEventListener('mousemove', function (e) {
        if (showreelFrame.classList.contains('is-playing')) return;
        const rect = showreelFrame.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;
        const center = showreelFrame.querySelector('.reel_center');
        if (center) {
          center.style.transform = `translate3d(${nx * 20}px, ${ny * 14}px, 0)`;
        }
      });
      showreelFrame.addEventListener('mouseleave', function () {
        const center = showreelFrame.querySelector('.reel_center');
        if (center) {
          center.style.transform = 'translate3d(0, 0, 0)';
        }
      });
    }
  }

  // --------------------------------------------------------------------------
  // 17. Interactive Industry Rate Card Switcher (pricing.html & index.html)
  // --------------------------------------------------------------------------
  const industryData = {
    retail: {
      name: 'Shops / Retail',
      basic: '2,999',
      growth: '5,999',
      premium: '9,999',
      desc: 'Local store footfall, festive offer banners, and Instagram retail presence.'
    },
    cafe: {
      name: 'Restaurants / Cafes',
      basic: '3,999',
      growth: '7,999',
      premium: '12,999',
      desc: 'Mouthwatering food reels, menu specials & weekend dining promotions.'
    },
    salon: {
      name: 'Salons / Gyms',
      basic: '3,499',
      growth: '6,999',
      premium: '10,999',
      desc: 'Client transformations, fitness tips & local service booking campaigns.'
    },
    clinic: {
      name: 'Clinics / Doctors',
      basic: '4,999',
      growth: '8,999',
      premium: '14,999',
      desc: 'Doctor authority, patient trust building & daily health awareness tips.'
    },
    hospital: {
      name: 'Hospitals',
      basic: '9,999',
      growth: '17,999',
      premium: '29,999',
      desc: 'Multi-speciality awareness, doctor panels, health camps & hospital awareness campaigns.'
    },
    school: {
      name: 'Schools',
      basic: '5,999',
      growth: '9,999',
      premium: '17,999',
      desc: 'Admission drives, student achievements, campus life & parent trust building.'
    },
    college: {
      name: 'Colleges / Universities',
      basic: '9,999',
      growth: '17,999',
      premium: '29,999',
      desc: 'Degree admission campaigns, campus placement highlights & youth engagement.'
    },
    realestate: {
      name: 'Real Estate',
      basic: '5,999',
      growth: '11,999',
      premium: '19,999',
      desc: 'Property video walkthroughs, site visit leads & property promotion campaigns.'
    },
    startup: {
      name: 'Startups',
      basic: '4,999',
      growth: '9,999',
      premium: '16,999',
      desc: 'Brand awareness, product launches, founder authority & social traction.'
    },
    corporate: {
      name: 'Corporate Companies',
      basic: '12,999',
      growth: '24,999',
      premium: '39,999',
      desc: 'Corporate reputation, LinkedIn B2B growth, employer branding & executive presence.'
    }
  };

  const industryPills = document.querySelectorAll('.industry-pill-btn');
  const industrySelect = document.querySelector('#industryMobileSelect');
  const activeIndustryLabel = document.querySelector('#activeIndustryName');
  const activeIndustryDesc = document.querySelector('#activeIndustryDesc');
  const basicPriceEl = document.querySelector('#cardPriceBasic');
  const growthPriceEl = document.querySelector('#cardPriceGrowth');
  const premiumPriceEl = document.querySelector('#cardPricePremium');
  const ctaLinks = document.querySelectorAll('.industry-plan-cta');

  function switchIndustryPlan(key) {
    const data = industryData[key];
    if (!data) return;

    // Update active pill button
    industryPills.forEach(pill => {
      if (pill.getAttribute('data-industry') === key) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });

    // Update mobile select if present
    if (industrySelect && industrySelect.value !== key) {
      industrySelect.value = key;
    }

    // Update Banner Text
    if (activeIndustryLabel) {
      activeIndustryLabel.textContent = data.name;
    }
    if (activeIndustryDesc) {
      activeIndustryDesc.textContent = data.desc;
    }

    // Animate Price Changes
    [
      { el: basicPriceEl, val: data.basic },
      { el: growthPriceEl, val: data.growth },
      { el: premiumPriceEl, val: data.premium }
    ].forEach(item => {
      if (item.el) {
        item.el.style.opacity = '0.3';
        item.el.style.transform = 'translateY(-4px)';
        setTimeout(() => {
          item.el.textContent = item.val;
          item.el.style.opacity = '1';
          item.el.style.transform = 'translateY(0)';
        }, 150);
      }
    });

    // Update CTA links to pass query parameter for chosen plan and category
    ctaLinks.forEach(link => {
      const plan = link.getAttribute('data-plan') || 'growth';
      link.href = `contact.html?industry=${encodeURIComponent(data.name)}&plan=${encodeURIComponent(plan)}`;
    });
  }

  if (industryPills.length > 0) {
    industryPills.forEach(pill => {
      pill.addEventListener('click', function () {
        const ind = this.getAttribute('data-industry');
        switchIndustryPlan(ind);
      });
    });
  }

  if (industrySelect) {
    industrySelect.addEventListener('change', function () {
      switchIndustryPlan(this.value);
    });
  }

  // --------------------------------------------------------------------------
  // 18. Build Your Own Package - Interactive Custom Quotation Calculator
  // --------------------------------------------------------------------------
  const packageBuilder = document.querySelector('#packageBuilderForm');
  if (packageBuilder) {
    const builderInputs = packageBuilder.querySelectorAll('.builder-qty-input');
    const builderSteppers = packageBuilder.querySelectorAll('.stepper-btn');
    const totalAmountEl = document.querySelector('#builderGrandTotal');
    const subtotalAmountEl = document.querySelector('#builderSubtotal');
    const discountAmountEl = document.querySelector('#builderDiscount');
    const discountBadge = document.querySelector('#builderDiscountBadge');
    const selectedListEl = document.querySelector('#builderSelectedItems');
    const whatsappBtn = document.querySelector('#builderWhatsAppBtn');
    const quoteContactBtn = document.querySelector('#builderQuoteContactBtn');
    const resetBtn = document.querySelector('#builderResetBtn');
    const businessCategorySelect = document.querySelector('#builderBusinessCategory');
    const notesInput = document.querySelector('#builderNotes');

    function calculatePackage() {
      let subtotal = 0;
      let totalPostsCount = 0;
      let totalPostsCost = 0;
      let totalReelsCount = 0;
      let totalReelsCost = 0;
      let selectedItems = [];

      builderInputs.forEach(input => {
        const qty = parseInt(input.value, 10) || 0;
        const price = parseInt(input.getAttribute('data-price'), 10) || 0;
        const name = input.getAttribute('data-name') || 'Service';
        const type = input.getAttribute('data-group') || 'other';

        // Add visual highlight class to parent card
        const card = input.closest('.builder-item-card');
        if (card) {
          if (qty > 0) {
            card.classList.add('has-selected');
          } else {
            card.classList.remove('has-selected');
          }
        }

        if (qty > 0) {
          const itemCost = qty * price;
          subtotal += itemCost;

          if (type === 'post') {
            totalPostsCount += qty;
            totalPostsCost += itemCost;
          } else if (type === 'reel') {
            totalReelsCount += qty;
            totalReelsCost += itemCost;
          }

          selectedItems.push({
            name: name,
            qty: qty,
            price: price,
            cost: itemCost
          });
        }
      });

      // Calculate Bulk Discounts: 10+ posts = 10% off posts; 5+ reels = 10% off reels
      let discount = 0;
      let discountNotes = [];

      if (totalPostsCount >= 10) {
        const postDiscount = Math.round(totalPostsCost * 0.10);
        discount += postDiscount;
        discountNotes.push(`10% Bulk Discount on ${totalPostsCount} Posts (Saved ₹${postDiscount.toLocaleString('en-IN')})`);
      }

      if (totalReelsCount >= 5) {
        const reelDiscount = Math.round(totalReelsCost * 0.10);
        discount += reelDiscount;
        discountNotes.push(`10% Bulk Discount on ${totalReelsCount} Reels/Videos (Saved ₹${reelDiscount.toLocaleString('en-IN')})`);
      }

      const grandTotal = Math.max(0, subtotal - discount);

      // Render Display
      if (subtotalAmountEl) {
        subtotalAmountEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
      }
      if (discountAmountEl) {
        discountAmountEl.textContent = discount > 0 ? `-₹${discount.toLocaleString('en-IN')}` : '₹0';
      }
      if (totalAmountEl) {
        totalAmountEl.textContent = `₹${grandTotal.toLocaleString('en-IN')}`;
      }

      // Discount badge pill
      if (discountBadge) {
        if (discount > 0) {
          discountBadge.style.display = 'flex';
          discountBadge.innerHTML = `<i class="fa-solid fa-gift text-success me-1"></i> ${discountNotes.join(' + ')}`;
        } else {
          discountBadge.style.display = 'none';
        }
      }

      // Render Selected Items List
      if (selectedListEl) {
        if (selectedItems.length === 0) {
          selectedListEl.innerHTML = '<div class="text-muted text-center py-2" style="font-size: 13px;">No services selected yet. Use + / - to build your custom scope.</div>';
        } else {
          let listHtml = '';
          selectedItems.forEach(item => {
            listHtml += `
              <div class="builder-summary-line">
                <span><strong>${item.qty}x</strong> ${item.name}</span>
                <span class="fw-bold">₹${item.cost.toLocaleString('en-IN')}</span>
              </div>
            `;
          });
          selectedListEl.innerHTML = listHtml;
        }
      }

      // Generate WhatsApp & Contact Quotation Strings
      const category = businessCategorySelect ? businessCategorySelect.value : 'General Business';
      const userNotes = notesInput && notesInput.value.trim() ? notesInput.value.trim() : 'None';

      let quoteText = `*STUDIO CULT — Custom Package Quotation*\n\n`;
      quoteText += `*Business Category:* ${category}\n\n`;
      quoteText += `*Selected Services:*\n`;

      if (selectedItems.length > 0) {
        selectedItems.forEach(item => {
          quoteText += `• ${item.qty}x ${item.name} (@ ₹${item.price.toLocaleString('en-IN')}) = ₹${item.cost.toLocaleString('en-IN')}\n`;
        });
      } else {
        quoteText += `• Custom inquiry (No standard items selected)\n`;
      }

      quoteText += `\n*Subtotal:* ₹${subtotal.toLocaleString('en-IN')}\n`;
      if (discount > 0) {
        quoteText += `*Bulk Discount:* -₹${discount.toLocaleString('en-IN')} (${discountNotes.join(', ')})\n`;
      }
      quoteText += `*Estimated Total:* ₹${grandTotal.toLocaleString('en-IN')}\n`;
      quoteText += `*Client Notes:* ${userNotes}\n\n`;
      quoteText += `Please confirm availability and share the formal invoice / proposal.`;

      if (whatsappBtn) {
        whatsappBtn.href = `https://wa.me/919999999999?text=${encodeURIComponent(quoteText)}`;
      }

      if (quoteContactBtn) {
        quoteContactBtn.href = `contact.html?subject=${encodeURIComponent('Custom Package Quote (' + category + ')')}&estimate=${encodeURIComponent('₹' + grandTotal.toLocaleString('en-IN'))}`;
      }
    }

    // Stepper Button Events (+ / -)
    builderSteppers.forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const action = this.getAttribute('data-action');
        const input = this.parentElement.querySelector('.builder-qty-input');
        if (!input) return;

        let currentVal = parseInt(input.value, 10) || 0;
        if (action === 'plus') {
          currentVal += 1;
        } else if (action === 'minus') {
          currentVal = Math.max(0, currentVal - 1);
        }
        input.value = currentVal;
        calculatePackage();
      });
    });

    // Input change/input events
    builderInputs.forEach(input => {
      input.addEventListener('input', function () {
        let val = parseInt(this.value, 10);
        if (isNaN(val) || val < 0) {
          this.value = 0;
        }
        calculatePackage();
      });
    });

    if (businessCategorySelect) {
      businessCategorySelect.addEventListener('change', calculatePackage);
    }
    if (notesInput) {
      notesInput.addEventListener('input', calculatePackage);
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', function (e) {
        e.preventDefault();
        builderInputs.forEach(input => { input.value = 0; });
        if (notesInput) notesInput.value = '';
        calculatePackage();
      });
    }

    // Initialize initial calculation
    calculatePackage();
  }

})();
