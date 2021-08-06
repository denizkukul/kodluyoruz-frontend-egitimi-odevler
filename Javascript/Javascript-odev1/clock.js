
var clock = document.querySelector("#myClock");
var days = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];

function showTime() {
    let time = new Date();
    let seconds = time.getSeconds();
    let minutes = time.getMinutes();
    let hours = time.getHours();
    let day = days[time.getDay()];

    clock.innerHTML = `${hours}:${minutes}:${seconds} ${day}`;
    setTimeout(showTime, 1000);
}