/* DP.PORTFOLIO — Global Client Script (PL Subdomain) */
(function () {
  'use strict';

  var prefersReduced =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1. Header Scroll Toggle (80px) & Hero Scroll Cue Fade (40px) */
  var header = document.getElementById('main-header');
  var heroScroll = document.querySelector('.hero-scroll');
  var heroProgress = document.querySelector('.hero-progress');

  function handleScroll() {
    var y = window.scrollY || window.pageYOffset || 0;
    if (header) {
      if (y > 80) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }
    if (heroScroll) {
      if (y > 40) heroScroll.classList.add('hidden');
      else heroScroll.classList.remove('hidden');
    }
    if (heroProgress) {
      if (y > 40) heroProgress.classList.add('hidden');
      else heroProgress.classList.remove('hidden');
    }
  }

  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });

  /* 2. Home Hero Slideshow (6000ms) */
  var slides = Array.prototype.slice.call(document.querySelectorAll('.hero-slide'));
  var progressLines = Array.prototype.slice.call(
    document.querySelectorAll('.hero-progress-line')
  );
  var currentSlide = 0;
  var slideTimer = null;

  function showSlide(index) {
    if (!slides.length) return;
    currentSlide = (index + slides.length) % slides.length;
    slides.forEach(function (slide, idx) {
      slide.classList.toggle('active', idx === currentSlide);
    });
    progressLines.forEach(function (btn, idx) {
      btn.classList.toggle('active', idx === currentSlide);
    });
  }

  function startSlideshow() {
    if (prefersReduced || slides.length <= 1) return;
    if (slideTimer) window.clearInterval(slideTimer);
    slideTimer = window.setInterval(function () {
      showSlide(currentSlide + 1);
    }, 6000);
  }

  if (slides.length) {
    showSlide(0);
    startSlideshow();
    progressLines.forEach(function (btn, idx) {
      btn.addEventListener('click', function () {
        showSlide(idx);
        startSlideshow();
      });
    });
  }

  /* 3. Slide-Over Navigation Drawer */
  var burger = document.getElementById('burger-menu');
  var navOverlay = document.getElementById('nav-overlay');
  var navClose = document.querySelector('.nav-close');
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.mobile-nav .nav-link'));

  function setMenuOpen(open) {
    if (!navOverlay || !burger) return;
    if (open) {
      navOverlay.classList.add('open');
      navOverlay.setAttribute('aria-hidden', 'false');
      burger.classList.add('active');
      burger.setAttribute('aria-expanded', 'true');
      burger.setAttribute('aria-label', 'Zamknij menu');
      document.body.classList.add('menu-open');
    } else {
      navOverlay.classList.remove('open');
      navOverlay.setAttribute('aria-hidden', 'true');
      burger.classList.remove('active');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Otwórz menu');
      document.body.classList.remove('menu-open');
    }
  }

  if (burger && navOverlay) {
    burger.addEventListener('click', function () {
      var isOpen = navOverlay.classList.contains('open');
      setMenuOpen(!isOpen);
    });

    navOverlay.addEventListener('click', function (e) {
      if (e.target === navOverlay) setMenuOpen(false);
    });
  }

  if (navClose) {
    navClose.addEventListener('click', function () {
      setMenuOpen(false);
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      setMenuOpen(false);
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navOverlay && navOverlay.classList.contains('open')) {
      setMenuOpen(false);
    }
  });

  /* 4. IntersectionObserver Scroll Reveals with Stagger */
  var revealItems = Array.prototype.slice.call(
    document.querySelectorAll('.fade-in-up, .reveal')
  );

  if (prefersReduced || !('IntersectionObserver' in window)) {
    revealItems.forEach(function (el) {
      el.classList.add('visible');
    });
  } else if (revealItems.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var target = entry.target;
            if (target.dataset.stagger) {
              target.style.transitionDelay = target.dataset.stagger + 'ms';
            }
            target.classList.add('visible');
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -24px 0px' }
    );

    var albumCardIdx = 0;
    revealItems.forEach(function (el) {
      if (el.classList.contains('album-card')) {
        el.dataset.stagger = String((albumCardIdx % 2) * 80);
        albumCardIdx++;
      }
      observer.observe(el);
    });

    window.setTimeout(function () {
      revealItems.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 120) {
          el.classList.add('visible');
        }
      });
    }, 450);
  }

  /* 5. Lazy Images Fade-In & Fallback Handling */
  var lazyImages = Array.prototype.slice.call(document.querySelectorAll('img.dp-lazy'));
  lazyImages.forEach(function (img) {
    function markLoaded() {
      img.classList.add('loaded');
    }

    if (img.complete && img.naturalWidth > 0) {
      markLoaded();
    } else {
      img.addEventListener('load', markLoaded, { once: true });
    }

    img.addEventListener('error', function () {
      var fallback = img.getAttribute('data-fallback');
      if (fallback && img.getAttribute('src') !== fallback) {
        img.setAttribute('src', fallback);
      } else {
        markLoaded();
      }
    });
  });

  /* 6. Lightbox Viewer */
  var lightbox = document.getElementById('lightbox');
  var lbImg = document.getElementById('lb-img');
  var lbCounter = document.getElementById('lightbox-counter');
  var lbCaption = document.getElementById('lb-caption');
  var lbProgressBar = document.querySelector('.lightbox-progress-bar');
  var lbWrapper = document.querySelector('.lightbox-image-wrapper');
  var lbClose = document.querySelector('.lightbox-close');
  var lbPrev = document.querySelector('.lightbox-prev');
  var lbNext = document.querySelector('.lightbox-next');
  var galleryTriggers = Array.prototype.slice.call(
    document.querySelectorAll('.gallery-item img')
  );
  var activeIndex = 0;
  var touchStartX = null;

  function pad2(num) {
    return num < 10 ? '0' + num : String(num);
  }

  function preloadNeighbor(idx) {
    if (!galleryTriggers.length) return;
    var item = galleryTriggers[(idx + galleryTriggers.length) % galleryTriggers.length];
    if (item) {
      var pre = new Image();
      pre.src = item.getAttribute('src') || '';
    }
  }

  function updateLightboxContent(index) {
    if (!galleryTriggers.length || !lbImg) return;
    activeIndex = (index + galleryTriggers.length) % galleryTriggers.length;
    var target = galleryTriggers[activeIndex];
    var src = target.getAttribute('src') || '';
    var fallback = target.getAttribute('data-fallback') || '';
    var alt = target.getAttribute('alt') || '';
    var caption = target.getAttribute('data-caption') || '';

    lbImg.onerror = function () {
      if (fallback && lbImg.getAttribute('src') !== fallback) {
        lbImg.setAttribute('src', fallback);
      }
    };
    lbImg.setAttribute('src', src);
    lbImg.setAttribute('alt', alt);

    if (lbCaption) {
      lbCaption.textContent = caption;
    }
    if (lbCounter) {
      lbCounter.textContent =
        pad2(activeIndex + 1) + ' / ' + pad2(galleryTriggers.length);
    }
    if (lbProgressBar) {
      lbProgressBar.style.width =
        ((activeIndex + 1) / galleryTriggers.length) * 100 + '%';
    }

    preloadNeighbor(activeIndex - 1);
    preloadNeighbor(activeIndex + 1);
  }

  function openLightbox(index) {
    if (!lightbox) return;
    updateLightboxContent(index);
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function stepLightbox(delta) {
    if (!lbWrapper || prefersReduced) {
      updateLightboxContent(activeIndex + delta);
      return;
    }
    lbWrapper.classList.add('switching');
    window.setTimeout(function () {
      updateLightboxContent(activeIndex + delta);
      lbWrapper.classList.remove('switching');
    }, 140);
  }

  if (lightbox && galleryTriggers.length) {
    galleryTriggers.forEach(function (img, idx) {
      var parent = img.closest('.gallery-item');
      if (parent) {
        parent.addEventListener('click', function () {
          openLightbox(idx);
        });
        parent.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openLightbox(idx);
          }
        });
      }
    });

    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    if (lbPrev) {
      lbPrev.addEventListener('click', function () {
        stepLightbox(-1);
      });
    }
    if (lbNext) {
      lbNext.addEventListener('click', function () {
        stepLightbox(1);
      });
    }

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    lightbox.addEventListener('touchstart', function (e) {
      if (e.touches && e.touches[0]) {
        touchStartX = e.touches[0].clientX;
      }
    });

    lightbox.addEventListener('touchend', function (e) {
      if (touchStartX === null || !e.changedTouches || !e.changedTouches[0]) return;
      var deltaX = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(deltaX) > 50) {
        stepLightbox(deltaX > 0 ? -1 : 1);
      }
      touchStartX = null;
    });

    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') stepLightbox(-1);
      if (e.key === 'ArrowRight') stepLightbox(1);
    });
  }

  /* 7. 200ms Page Fade Transition on Internal HTML Links */
  if (!prefersReduced) {
    document.addEventListener('click', function (e) {
      var link = e.target && e.target.closest ? e.target.closest('a') : null;
      if (!link) return;
      var href = link.getAttribute('href') || '';
      if (
        !href ||
        href.charAt(0) === '#' ||
        href.indexOf('mailto:') === 0 ||
        href.indexOf('tel:') === 0 ||
        link.target === '_blank' ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }
      try {
        var url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) return;
        e.preventDefault();
        document.body.classList.add('page-leaving');
        window.setTimeout(function () {
          window.location.href = url.href;
        }, 200);
      } catch (_err) {
        /* ignore malformed URLs */
      }
    });

    window.addEventListener('pageshow', function () {
      document.body.classList.remove('page-leaving');
    });
  }

  /* 8. Contacts Page Form Handler */
  var contactForm = document.getElementById('contact-form');
  var contactStatus = document.getElementById('contact-status');
  var contactMailto = document.getElementById('contact-mailto');
  var contactReset = document.getElementById('contact-reset');

  if (contactForm && contactStatus && contactMailto) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = (document.getElementById('contact-name') || {}).value || '';
      var email = (document.getElementById('contact-email') || {}).value || '';
      var subject = (document.getElementById('contact-subject') || {}).value || '';
      var message = (document.getElementById('contact-message') || {}).value || '';

      var mailSubject = subject.trim() || 'Zapytanie z pl.dominikphotofficial.lt — ' + name.trim();
      var mailBody = 'Od: ' + name.trim() + ' (' + email.trim() + ')\n\n' + message.trim();

      contactMailto.setAttribute(
        'href',
        'mailto:info@dominikphotofficial.lt?subject=' +
          encodeURIComponent(mailSubject) +
          '&body=' +
          encodeURIComponent(mailBody)
      );

      contactForm.hidden = true;
      contactStatus.hidden = false;
    });

    if (contactReset) {
      contactReset.addEventListener('click', function () {
        contactForm.reset();
        contactStatus.hidden = true;
        contactForm.hidden = false;
      });
    }
  }
})();
