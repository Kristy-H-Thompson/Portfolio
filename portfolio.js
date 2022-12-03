const scriptURL =
  "https://script.google.com/macros/s/AKfycbz7ltm6HIUqw_VDom5C3NuLxLBOxuExpp5cJ5hSAGURR5We3AGN6Sv_NP0biDyshqdU/exec";

const form = document.forms["oFormObject"];

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
