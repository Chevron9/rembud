"use strict";
import { msToTime, convert_to_ms } from "./modules/dateutils.mjs";
import {Timer} from "./modules/timer.mjs";

// UI elements
const remindButton = document.getElementById('remindbtn');
const duration = document.getElementById("remind_input");
const message_field = document.getElementById("message_field");
const reminder_mode = document.getElementById("timer_mode");
const UItimer_list = document.getElementById("timerlist")

//dynamic UI

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
  //add list entry that can be updated by update display, assign it as proerty 
  //to the timer object
  const new_li = document.createElement("li")
  const entry = construct_list_entry(new_timer)
  new_li.innerText = entry
  UItimer_list.appendChild(new_li)
  new_timer.node = new_li
}

function update_displays() {
  for (let timer of timers){
    let entry = construct_list_entry(timer)
    timer.node.innerText = entry
  }
}

function construct_list_entry(timer) {
  var timer_num = timers.indexOf(timer) + 1
  return `Timer ${timer_num} ${timer.countdown_view}`
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

    timer.now = clock_now
    timer.update_time_left()

    if (timer.time_left < 0){
      timer.end_timer(alert_sfx)
      //delete timer from timers
      const t = timers.indexOf(timer)
      timers.splice(t,1)

      //remove UI
      timer.node.parentNode.removeChild(timer.node)

    } else {
        console.log(timer.time_left)
    }
    update_displays()
  }
}
