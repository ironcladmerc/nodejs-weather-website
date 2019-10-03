const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-one");
const messageTwo = document.querySelector("#message-two");

messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''

  fetch(`http://localhost:3000/weather?address=${search.value}`).then(
    response => {
      messageOne.textContent = ''
      response.json().then(data => {
        if (data.error) {
          messageOne.textContent = "Error: " + data.error;
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast;
        }
      });
    }
  );
  search.value = "";
});
