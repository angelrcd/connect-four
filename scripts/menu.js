const menuModal = document.querySelector("#menu-modal");
const continueButton = document.querySelector("#menu-continue");
const openMenuButton = document.querySelector("#open-menu");

openMenuButton.addEventListener("click", openMenu)
continueButton.addEventListener("click", closeMenu)

function openMenu(){
  menuModal.showModal();
}

function closeMenu(){
  menuModal.close();
}