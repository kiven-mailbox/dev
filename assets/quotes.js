// Show for 5 seconds before fading out
const displayTime = 4000; 

    window.onload = () => {
      setTimeout(() => {
        document.getElementById("quote-popup").classList.add("hide");
      }, displayTime);
    };