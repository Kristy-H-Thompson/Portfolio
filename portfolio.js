const scriptURL =
  "https://script.google.com/macros/s/AKfycbwHEGo2S1OjeOJMN3GVsGSNVxr4vDuURZcUluCmHupdZYkovczG-XwT6_kM0tYaBaqx/exec";

const form = document.forms["contact"];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const bt = callme();
  fetch(scriptURL, {
    method: "POST",
    body: new FormData(form),
    mode: "no-cors"
  })
    .then((response) =>
      alert(
        "Your message has been submitted! Thank you :D" +
          bt +
          " ^^",
        response
      )
    )
    .catch((error) => alert("Error!", error.message));
});
