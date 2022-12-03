const scriptURL =
  "https://script.google.com/macros/s/AKfycbwNzRBLGsKE7fApALVdj7r_OV2OObwMTM78A9uIkBMgafRSDL3uR9ien3VMbF0GKakB/exec";

const form = document.forms["contactme"];

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
