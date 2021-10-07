const saris_actual_return_date = new Date("October 15, 2021 08:00:00 GMT-0600 (Central Standard Time)");
var blastoff = saris_actual_return_date;

var interval;

function milliseconds_to_seconds(ms) { return Math.floor(ms / 1000) }
function milliseconds_to_minutes(ms) { return Math.floor(milliseconds_to_seconds(ms) / 60) }
function milliseconds_to_hours(ms)   { return Math.floor(milliseconds_to_minutes(ms) / 60) }
function milliseconds_to_days(ms)    { return Math.floor(milliseconds_to_hours(ms) / 24) }

function how_many_seconds_left(ms) {
    return milliseconds_to_seconds(ms) - (milliseconds_to_minutes(ms) * 60);
}

function how_many_minutes_left(ms) {
    return milliseconds_to_minutes(ms) - (milliseconds_to_hours(ms) * 60);
}

function how_many_hours_left(ms) {
    return milliseconds_to_hours(ms) - (milliseconds_to_days(ms) * 24);
}

function how_many_days_left(ms)    { return milliseconds_to_days(ms) }

function update() {
    let date = Date();
    let now = Date.now();
    let diff = Math.max((blastoff - now), 0);

    // STATUS
    if(diff > 0) { document.getElementById("status").innerHTML = "NO"; }
    else         { document.getElementById("status").innerHTML = "!!! YES !!!"; }
    
    // RETURN LABEL
    if(diff > 0) { document.getElementById("return-on-label").innerHTML = "The big boy will be back on "; }
    else         { document.getElementById("return-on-label").innerHTML = ""; }

    // RETURN DATE
    if(diff > 0) { document.getElementById("return-on-date").innerHTML = blastoff; }
    else         { document.getElementById("return-on-date").innerHTML = ""; }

    // COUNTDOWN
    document.getElementById("countdown-days").innerHTML = how_many_days_left(diff);
    document.getElementById("countdown-hours").innerHTML = how_many_hours_left(diff);
    document.getElementById("countdown-minutes").innerHTML = how_many_minutes_left(diff);
    document.getElementById("countdown-seconds").innerHTML = how_many_seconds_left(diff);

    // TIMESTAMP
    document.getElementById("footer").innerHTML = date;

    // DECORATION
    var body = document.getElementsByTagName("body")[0];
    body.style.backgroundColor = "red";
    if(diff > 0) { body.style.backgroundColor = "red"; } 
    else         { body.style.backgroundColor = "green"; }

    // INTERVAL TIMER
    if(diff > 0) { if(interval == null) { interval = window.setInterval(update, 1000); } }
    else                                { clearInterval(interval); interval = null; }
}

function reset(new_date) {
    if(new_date == null) { blastoff = saris_actual_return_date; }
    else                 { blastoff = new Date(new_date); }

    update();
}

function load() {
    update();
}

window.onload = load;

