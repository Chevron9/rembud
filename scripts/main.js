let remindButton = document.getElementById('remindbtn');
let duration = document.getElementById("remind_input");
let timer1 = document.getElementById("timer1");
let message_field = document.getElementById("message_field");
let reminder_mode = document.getElementById("timer_mode");
var alert_sfx = new Audio('sfx/alert.wav');
let start;
let now;


remindButton.onclick = function() {
  let message = message_field.value

  if (reminder_mode.value == "in") {
    start = Date.now()
    timer_duration = convert_to_ms(duration.value);
    start_timer(timer_duration,start,message);
    console.log(timer_duration)
    console.log(now-timer_duration)
  }
  else if (reminder_mode.value == "at") {
    console.log("at mode")
  }
  else {
    console.log("weird mode")
  }
}

function convert_to_ms(duration) {
  let re = /\d+[shmd]*/g
  let timer = 0
  let times = 0
  const chunkers = ["s","h","m","d"]
  let chunks = duration.matchAll(re)
  for (let i of chunks) {
    i = i.at(0)
    //console.log(i)
    if (i.includes("s")) {
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
  //console.log(timer)
  return timer*1000
}

function start_timer(timer_duration, start,message) {
  //takes in milliseconds, starts the clock
  let end;
  end = start+timer_duration;
  console.log(`Timers ends at ${end}`)
  //add timer ui

  clock_beat(end,message,Date.now())
}

function countdown_display(time_left,message) {
  display_time = msToTime(time_left)
  timer1.innerHTML = "Timer 1 "+display_time+" target_time "+message
}

function clock_beat(end,message,expected) {
  //runs every 100 milliseconds and updates displays
  now = Date.now()
  let execution_delta = now - expected
  let new_timeout = 100
  console.log(`execution delta ${execution_delta}`)

  if (execution_delta<0) {
    Error("execution happened earlier than expected")
  } else if (execution_delta == 0) {
    //pass
  } else if (execution_delta > 0){
    new_timeout -= execution_delta 
  }

  let time_left = end-now

  if (time_left<0) {
    end_timer(message)
  }
  else {
    countdown_display(time_left,message)
    let next_expected = now + new_timeout
    setTimeout(clock_beat,new_timeout,end,message,next_expected)
  }
}


function end_timer(message){
  //reset, cleanup etc
  notify(message)
}

function reset_title(){
  document.title = "Rembud"
}


function notify(message) {
  alert_sfx.play(); //todo test
  document.title = "alert!"
  setTimeout(reset_title,1000*10)
  alert(message)
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