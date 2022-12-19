//* Menu
((d) => {
  const btn = d.querySelector(".menu-btn");
  const nav = d.querySelector(".navbar");
  btn.addEventListener("click", () => {
    btn.firstElementChild.classList.toggle("display-none");
    btn.lastElementChild.classList.toggle("display-none");
    nav.classList.toggle("is-active");
  });
  d.addEventListener("click", (e) => {
    if (!e.target.matches(".navbar a")) return;

    btn.firstElementChild.classList.remove("display-none");
    btn.lastElementChild.classList.add("display-none");
    nav.classList.remove("is-active");
  });
})(document);

//* Formulario de contacto

((d) => {
  const $form = d.querySelector(".contact-form"),
    $loader = d.querySelector(".contact-form-loader"),
    $response = d.querySelector(".contact-form-response");

  $form.addEventListener("submit", (e) => {
    e.preventDefault();
    $loader.classList.remove("none");
    fetch("https://formsubmit.co/ajax/email@example.com", {
      method: "POST",
      body: new FormData(e.target),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        console.log(json);
        location.hash = "#gracias";
        $form.reset();
      })
      .catch((err) => {
        console.log(err);
        let message =
          err.statusText || "Ocurrió un error al enviar, intenta nuevamente";
        $response.querySelector(
          "h3"
        ).innerHTML = `Error ${err.status}: ${message}`;
      })
      .finally(() => {
        $loader.classList.add("none");
        setTimeout(() => {
          location.hash = "#close";
        }, 3000);
      });
  });
})(document);