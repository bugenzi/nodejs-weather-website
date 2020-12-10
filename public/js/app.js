

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const tempValue=document.querySelector("#temp-value")
const timeValue=document.querySelector("#time-value")

messageOne.textContent = "";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  fetch("/weather/?address=" + location).then((response) => {
    response.json().then((data) => {
      console.log(data.weather.body);
      if (data.error) {
        messageOne.textContent = data.error;
        messageTwo.textContent = "";
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.weather.body;
        tempValue.textContent=`Currently: ${data.weather.temp}C`,
        timeValue.textContent=new Date(data.weather.time*1000)
      }
    });
  });
});
