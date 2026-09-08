const eventDate = new Date(2026, 4, 5, 8, 0, 0);

setInterval(updateCountdown, 1000);

function updateCountdown() {
    const now = new Date();
    const timeLeft = eventDate - now;
    
    if (timeLeft <= 0) {
        document.getElementById("countdown").textContent = "The event has started!";
        return;
    }
    const totalSeconds = Math.floor(timeLeft / 1000);

    const newDays = Math.floor(totalSeconds / (24 * 3600));
    const newHours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const newMinutes = Math.floor((totalSeconds % 3600) / 60);
    const newseconds = totalSeconds % 60;

    document.getElementById("day").innerHTML = format(newDays);
    document.getElementById("hour").innerHTML = format(newHours)
    document.getElementById("minutes").innerHTML = format(newMinutes);
    document.getElementById("seconds").innerHTML = format(newseconds);
}

function format(num) {
    return num < 10 ? "0" + num : num;
}

