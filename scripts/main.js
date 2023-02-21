let remindButton = document.getElementById('remindbtn');
let duration = document.getElementById("remind_input")
let timer1 = document.getElementById("timer1")
let message_field = document.getElementById("message_field")
var audio = new Audio('sfx/alert.wav');


remindButton.onclick = function() {
    timer_duration = convert_to_ms(duration.value)
    start_timer(timer_duration)
  }

function ping() {
  alert(message.value)
}

function convert_to_ms(duration) {
  let re = /\d+[shmd]*/g
  let timer = 0
  let times = 0
  const chunkers = ["s","h","m","d"]
  let chunks = duration.matchAll(re)
  for (let i of chunks) {
    i = i.at(0)
    console.log(i)
    if (i.includes("s")) {
      console.log("s")
      times=parseInt(i.slice(0,-1))
      timer=timer+times
    }
    if (i.includes("m")) {
      times=parseInt(i.slice(0,-1))*60
      timer=timer+times
    }
    if (i.includes("h")) {
      times=parseInt(i.slice(0,-1))*60*60
      timer=timer+times
    }
    if (i.includes("d")) {
      times=parseInt(i.slice(0,-1))*60*60*24
      timer=timer+times
    }
    /*else if not any(x in i for x in chunkers):
      await ctx.send("You need to specify a time! Time should be specified as 13s37m42h12d leaving away time steps as desired.")
      return*/
  }
  console.log(timer)
  return timer*1000
}

function start_timer(timer_duration) {
  //takes in milliseconds, starts the clock
  setInterval(clock_beat,1)
}

function countdown_display(duration) {
  display_time = msToTime(duration)
  timer1.innerHTML = "Timer 1 "+display_time+" target_time "+message.value
  interval = interval + intr
  let elapsed = start-interval
  if (elapsed < 0) {
    clearInterval(Interval01);
    interval = 0
  }
}

function clock_beat(duration) {
  //runs every milliseconds and updates displays
  setInterval()
}

function notify() {
  audio.play(); //todo test
  document.title = "alert!"
}

function msToTime(ms) {
  let days = Math.floor((ms / (1000 * 60 * 60 * 24)));
  let rest = ms % (1000 * 60 * 60 * 24)
  let hours = Math.floor((rest / (1000 * 60 * 60)));
  rest = ms % (1000 * 60 * 60)
  let minutes = Math.floor((rest / (1000 * 60)));
  rest = ms % (1000 * 60)
  let seconds = Math.floor((rest / 1000));
  return pad("d",days)+":"+pad("h",hours)+":"+pad("m",minutes)+":"+pad("s",seconds)
}

function pad(denom,val) {
  if ( denom = "s" || "m" || "h")  {
    if (val < 10) {
      return "0"+val
    }
  }
  return val
}