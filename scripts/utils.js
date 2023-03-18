export function openModal(modal) {
  modal.classList.add("modal__open");
  modal.addEventListener("mousedown", closeModalOnRemoteClick);
  document.addEventListener("keydown", keyHandler);
}

export function closeModal(modal) {
  modal.classList.remove("modal__open");
  modal.removeEventListener("mousedown", closeModalOnRemoteClick);
  document.removeEventListener("keydown", keyHandler);
}

export function closeModalOnRemoteClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.target);
  }
}

export function keyHandler(e) {
  if (e.key === "Escape") {
    console.log("ESCAPE");
    const openedModal = document.querySelector(".modal__open");
    closeModal(openedModal);
  }
}
