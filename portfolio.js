const scriptURL =
  "https://script.google.com/macros/s/AKfycbxybF6zxIac4H95WTMQ2TGQhRL1sg7dsTbQzOxuqiRRfeJAekFGqFEG2RUvvo_eyCFQ/exec";

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
