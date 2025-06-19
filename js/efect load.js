 // Espera 8 segundos (8000 milissegundos), depois esconde o preloader
  window.addEventListener("load", function () {
    setTimeout(function () {
      const preloader = document.querySelector(".preloader");
      if (preloader) {
        preloader.style.opacity = "0";
        preloader.style.transition = "opacity 1s ease";
        setTimeout(() => {
          preloader.style.display = "none";
        }, 1000); // Espera a transição acabar
      }
    }, 1000);
  });