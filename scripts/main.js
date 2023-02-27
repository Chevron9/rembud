"use strict";
import { msToTime, convert_to_ms } from "./modules/dateutils.mjs";
import {Timer} from "./modules/timer.mjs";

// UI elements
const remindButton = document.getElementById('remindbtn');
const duration = document.getElementById("remind_input");
const message_field = document.getElementById("message_field");
const reminder_mode = document.getElementById("timer_mode");

//dynamic UI
let timer1 = document.getElementById("timer1");
//---

var alert_sfx = new Audio('sfx/alert.wav');
let timers = [];
var Clock_beat;

//script start
start_clock()

//Worker wrapper
function start_clock() {
  if (window.Worker) {
    //console.log("Worker supported.")
    Clock_beat = new Worker("./scripts/workers/clock_beat.js")

  } else {
    console.log("Web Worker not supported!")
    alert("Web worker not supported.")
  }
}

remindButton.onclick = function() {
  let message = message_field.value
  let now;
  let start;

  if (reminder_mode.value == "in") {
    start = Date.now()
    let timer_duration = convert_to_ms(duration.value);
    start_timer(timer_duration,start,message);
    console.log(timer_duration)
    console.log(now-timer_duration)
  }
  else if (reminder_mode.value == "at") {
    //TODO not yet implemented
    console.log("at mode")
  }
  else {
    Error("No reminder mode has been set!")
  }
}

function start_timer(timer_duration, start,message) {
  //takes in milliseconds, starts the clock
  let new_timer = new Timer(timer_duration,start,message)
  timers.push(new_timer)
  //add timer ui
}

function countdown_display(time_left,message) {
  display_time = msToTime(time_left)
  timer1.innerHTML = "Timer 1 "+display_time+" target_time "+message
}

Clock_beat.onmessage = (event) => {
  let msg = event.data
  if (msg.type  == "clock_beat") {
    update_tick(msg.content)
  }
}

function update_tick(clock_now) {
  //check timer expiry, update displays
  for (let timer of timers){
    console.log(timer)
    const time_left = timer.end-clock_now

    if (time_left < 0){
      timer.end_timer(alert_sfx)
    } else {
        console.log(time_left)
        countdown_display(time_left)
    }
  }
}
