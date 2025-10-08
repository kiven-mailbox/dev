const displayTime = 4000;

document.addEventListener("DOMContentLoaded", () => {
  const quotePopup = document.getElementById("quote-popup");
  if (!quotePopup) return;

  quotePopup.classList.add("hide");

  if (!sessionStorage.getItem("quoteShown")) {
    quotePopup.classList.remove("hide");

    setTimeout(() => {
      quotePopup.classList.add("hide");
    }, displayTime);

    sessionStorage.setItem("quoteShown", "true");
  }
});