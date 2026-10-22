const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Screenshot lightbox: click a screenshot to view it full size.
(() => {
  const dialog = document.getElementById("lightbox");
  const image = document.getElementById("lightbox-img");
  if (!dialog || !image) return;

  document.querySelectorAll(".shot__open").forEach((button) => {
    button.addEventListener("click", () => {
      image.src = button.dataset.full;
      image.alt = button.dataset.alt;
      dialog.showModal();
    });
  });

  dialog.querySelector(".lightbox__close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => {
    image.removeAttribute("src");
  });
})();

// Mobile menu.
(() => {
  const header = document.getElementById("site-header");
  const toggle = header && header.querySelector(".nav__toggle");
  if (!toggle) return;

  const setOpen = (open) => {
    header.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };

  toggle.addEventListener("click", () => setOpen(!header.classList.contains("is-open")));
  header.querySelectorAll(".nav__links a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
})();

// Scroll reveal: elements with .reveal fade up as they enter the viewport.
(() => {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );
  items.forEach((item) => observer.observe(item));
})();

// Active nav link: highlight the section currently on screen.
(() => {
  const links = [...document.querySelectorAll(".nav__links a[href*='#']")];
  const sections = links
    .map((link) => document.getElementById(new URL(link.href, location.href).hash.slice(1)))
    .filter(Boolean);
  if (!sections.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          const id = new URL(link.href, location.href).hash.slice(1);
          link.classList.toggle("is-active", id === entry.target.id);
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );
  sections.forEach((section) => observer.observe(section));
})();

// Hero screenshot: gentle 3D tilt that follows the pointer.
(() => {
  const frame = document.querySelector(".hero__shot .shot");
  if (!frame || reduceMotion || !window.matchMedia("(pointer: fine)").matches) return;

  frame.parentElement.addEventListener("pointermove", (event) => {
    const box = frame.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    frame.style.setProperty("--tilt-y", `${(x * 6).toFixed(2)}deg`);
    frame.style.setProperty("--tilt-x", `${(-y * 4).toFixed(2)}deg`);
  });
  frame.parentElement.addEventListener("pointerleave", () => {
    frame.style.setProperty("--tilt-x", "0deg");
    frame.style.setProperty("--tilt-y", "0deg");
  });
})();

// Copy buttons on code blocks in the setup guide.
(() => {
  document.querySelectorAll(".guide pre").forEach((pre) => {
    if (!navigator.clipboard) return;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "copy-btn";
    button.textContent = "Copy";
    button.addEventListener("click", async () => {
      await navigator.clipboard.writeText(pre.querySelector("code").innerText.trim());
      button.textContent = "Copied";
      setTimeout(() => (button.textContent = "Copy"), 1600);
    });
    pre.appendChild(button);
  });
})();

// Setup guide: highlight the contents entry for the section in view.
(() => {
  const links = [...document.querySelectorAll(".guide-toc a")];
  if (!links.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          link.classList.toggle("is-active", link.hash === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-30% 0px -60% 0px" },
  );
  document.querySelectorAll(".guide section[id]").forEach((section) => observer.observe(section));
})();
