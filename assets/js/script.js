var current = document.querySelector(".current");
var forecasts = document.querySelector(".forecasts");
var input = document.getElementById("search");
const form = document.querySelector("form");
console.log(input);
var searchTirm;
input.addEventListener("input", function (e) {
  console.log(e.target.value);
  searchTirm = e.target.value.trim();
  if (searchTirm !== "" && searchTirm.length > 1) {
    getData(searchTirm);
  }
});
form.addEventListener("submit", function (e) {
  e.preventDefault();
  searchTirm = input.value.trim();
  if (searchTirm.length > 1) {
    getData(searchTirm);
  }
});
console.log(forecasts);
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

var cuurentDay;
async function getData(tirm = "cairo") {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=2cbc537d95fe4d9a935212523250507&q=${tirm}&days=5`
  );
  cuurentDay = await response.json();
  const forecastDays = cuurentDay.forecast.forecastday.slice(1) || [];
  console.log(forecastDays);
  console.log("cuurentDay");
  console.log(cuurentDay);
  const todayDate = new Date(cuurentDay.location.localtime);
  getFormatedDate(cuurentDay, todayDate);
  if (forecastDays.length > 0) {
    displayForecast(forecastDays);
  }
}

function getFormatedDate(cuurentDay, todayDate) {
  const dayName = days[todayDate.getDay()];
  const month = months[todayDate.getMonth()];
  const dayNum = todayDate.getDate();

  console.log(dayName + "" + dayNum + "" + month);
  displayCurrent(cuurentDay, dayName, dayNum, month);
}

function displayCurrent(cuurentDay, dayName, dayNum, month) {
  current.innerHTML = `<div>
                <div class="card">
                  <div class="card-body text-light">
                    <div
                      class="card-title text-light d-flex justify-content-between px-3 py-2 align-items-center border-bottom"
                    >
                      <small>${dayName}</small><small>${dayNum} ${month}</small>
                    </div>
                    <div class="card-text d-flex flex-column  p-3">
                      <h5 class="fs-1 ">${cuurentDay.location.name}</h5>
                      <div class="degree text-center ">
                      <p class="current-temp">${cuurentDay.current.temp_c}<sup>o</sup>c</p>
                      <div>
                      </div>
                      <img src="${cuurentDay.current.condition.icon}"  alt="" />
                      <small class="text-info d-block">${cuurentDay.current.condition.text}</small>
                      </div>
                      <ul class="d-flex justify-content-between list-unstyled mb-0 mt-3">
                        <li class="d-flex flex-column align-items-center">
                          <img
                            src="assets/Weather/imgi_3_icon-umberella@2x.png"
                            alt=""
                          />
                          <p>20%</p>
                        </li>
                        <li class="d-flex flex-column align-items-center">
                          <img
                            src="assets/Weather/imgi_4_icon-wind@2x.png"
                            alt=""
                          />
                          <p>18km/h</p>
                        </li>
                        <li class="d-flex flex-column align-items-center">
                          <img
                            src="assets/Weather/imgi_5_icon-compass@2x.png"
                            alt=""
                          />
                          <p>East</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>`;
}
function displayForecast(forecastDays) {
  var cartoona = "";
  forecastDays.forEach((day) => {
    const date = new Date(day.date);
    const dayName = days[date.getDay()];
    const month = months[date.getMonth()];
    const dayNum = date.getDate();

    cartoona += `
                <div class="col-md-6">
                <div class="card">
                  <div class="card-body text-light">
                    <div
                      class="card-title text-light d-flex justify-content-between px-3 py-2 align-items-center border-bottom"
                    >
                      <small>${dayName}</small><small>${dayNum} ${month}</small>
                    </div>
                    <div class="card-text d-flex flex-column  p-3">

                      <div class="degree text-center ">
                      <p class="fs-3">${day.day.maxtemp_c}<sup>o</sup>c</p>
                      <div>
                      </div>
                      <img src="${day.day.condition.icon}"  alt="condition" />
                      <small class="text-info d-block">${day.day.condition.text}</small>
                      </div>
                      </div>
                      </div>
                </div>
                </div>
  `;
  });
  forecasts.innerHTML = cartoona;
}
getData();
