document.addEventListener("DOMContentLoaded", () => {
  // 1. Loading Screen 0% -> 100%
  const preloader = document.getElementById("preloader");
  const loaderPercent = document.getElementById("loaderPercent");
  const loaderBar = document.getElementById("loaderBar");
  const loaderStatus = document.getElementById("loaderStatus");

  let progress = 0;
  const finishLoader = () => {
    if (!preloader) return;
    progress = 100;
    if (loaderPercent) loaderPercent.textContent = "100%";
    if (loaderBar) loaderBar.style.width = "100%";
    if (loaderStatus) loaderStatus.textContent = "Experience Ready.";
    setTimeout(() => {
      preloader.classList.add("done");
    }, 220);
  };

  const timer = setInterval(() => {
    progress += Math.floor(Math.random() * 9) + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(timer);
      finishLoader();
    } else {
      if (loaderPercent) loaderPercent.textContent = `${progress}%`;
      if (loaderBar) loaderBar.style.width = `${progress}%`;
      if (loaderStatus) {
        loaderStatus.textContent =
          progress < 45
            ? "Initializing Experience..."
            : progress < 80
            ? "Loading Portfolio..."
            : "Calibrating Neon Interface...";
      }
    }
  }, 45);

  // 2. Typing Animation in Hero
  const typingTarget = document.getElementById("typingText");
  const phrases = [
    "1st Year BSIT Student @ Mindoro State University",
    "Aspiring Developer & Future Engineer",
    "Exploring C#, C & Web Development"
  ];
  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;

  const tickTyping = () => {
    if (!typingTarget) return;
    const current = phrases[phraseIdx];
    if (!deleting) {
      charIdx++;
      typingTarget.textContent = current.slice(0, charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(tickTyping, 1600);
        return;
      }
      setTimeout(tickTyping, 55);
    } else {
      charIdx--;
      typingTarget.textContent = current.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(tickTyping, 320);
        return;
      }
      setTimeout(tickTyping, 30);
    }
  };
  tickTyping();

  // 3. Mobile Nav Toggle & Active Link Highlight
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const navItems = document.querySelectorAll(".nav-item");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      navLinks.classList.toggle("open");
    });
  }

  navItems.forEach((link) => {
    link.addEventListener("click", () => {
      navItems.forEach((item) => item.classList.remove("active"));
      if (!link.classList.contains("nav-cta")) {
        link.classList.add("active");
      }
      if (navLinks && navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        if (navToggle) navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  // 4. Certificates Interactive Preview
  const certButtons = document.querySelectorAll(".cert-select-card");
  const certPreviewTag = document.getElementById("certPreviewTag");
  const certPreviewTitle = document.getElementById("certPreviewTitle");
  const certPreviewDesc = document.getElementById("certPreviewDesc");

  const certData = {
    csharp: {
      tag: "CERT // 01 · C# CERTIFICATE",
      title: "C# Certificate",
      desc: "Highlights foundational C# programming skills, control logic, and problem-solving developed during introductory Information Technology studies at Mindoro State University."
    },
    clang: {
      tag: "CERT // 02 · C LANGUAGE CERTIFICATE",
      title: "C Language Certificate",
      desc: "Reflects core training in C programming fundamentals, structured logic, and step-by-step problem solving in early computing coursework."
    }
  };

  certButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-cert-key");
      const info = certData[key];
      if (!info) return;

      certButtons.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");

      if (certPreviewTag) certPreviewTag.textContent = info.tag;
      if (certPreviewTitle) certPreviewTitle.textContent = info.title;
      if (certPreviewDesc) certPreviewDesc.textContent = info.desc;
    });
  });

  // 5. Subtle 3D Tilt on Portrait Card
  const heroTilt = document.getElementById("heroTiltCard");
  if (heroTilt) {
    heroTilt.addEventListener("mousemove", (e) => {
      const rect = heroTilt.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      heroTilt.style.transform = `perspective(900px) rotateX(${(-y * 9).toFixed(2)}deg) rotateY(${(x * 9).toFixed(2)}deg)`;
    });
    heroTilt.addEventListener("mouseleave", () => {
      heroTilt.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    });
  }

  // 6. Scroll Reveal Observer
  const revealEls = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => observer.observe(el));

  // 7. Contact Form Handler
  const form = document.getElementById("contactForm");
  const feedback = document.getElementById("formFeedback");
  if (form && feedback) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nameVal = document.getElementById("senderName")?.value.trim() || "Friend";
      feedback.textContent = `Thanks, ${nameVal}! Your message is ready to send to alchie772@gmail.com.`;
      form.reset();
    });
  }

  // 8. Animated Particles Canvas
  const canvas = document.getElementById("particleCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = Array.from({ length: 48 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.8 + 0.6,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.6 + 0.2
    }));

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    const drawParticles = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${p.alpha})`;
        ctx.fill();
      }
      requestAnimationFrame(drawParticles);
    };
    drawParticles();
  }
});
