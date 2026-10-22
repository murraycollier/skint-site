// Click a screenshot to view it full size in a dialog.
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

// Waitlist dialog: opened from every Buy Skint button and posted to Formspree.
(() => {
  const dialog = document.getElementById("waitlist");
  const form = document.getElementById("waitlist-form");
  const status = document.getElementById("waitlist-status");
  if (!dialog || !form) return;

  document.querySelectorAll("[data-waitlist]").forEach((button) => {
    button.addEventListener("click", () => dialog.showModal());
  });

  dialog.querySelector(".waitlist__close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  const setStatus = (text, isError) => {
    status.textContent = text;
    status.classList.toggle("status--error", isError);
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const email = String(data.get("email") || "").trim();
    if (!email || !form.email.checkValidity()) {
      setStatus("Please enter a valid email address.", true);
      return;
    }
    // Bots fill in the hidden field. Pretend it worked and send nothing.
    if (data.get("_gotcha")) {
      form.reset();
      setStatus("Thanks, you're on the list.", false);
      return;
    }
    if (form.action.includes("REPLACE_ME")) {
      setStatus("The waitlist isn't connected yet. Please try again later.", true);
      return;
    }

    const button = form.querySelector("button[type=submit]");
    button.disabled = true;
    setStatus("Sending…", false);
    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      setStatus("Thanks, you're on the list. We'll be in touch.", false);
    } catch (error) {
      setStatus("Something went wrong. Please try again in a moment.", true);
    } finally {
      button.disabled = false;
    }
  });
})();
