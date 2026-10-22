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
