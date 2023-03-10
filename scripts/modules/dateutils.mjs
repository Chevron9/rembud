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
  
function pad(denom, val) {
    if ( denom = "s" || "m" || "h")  {
        if (val < 10) {
        return "0"+val
        }
    }
    return val
}

export {convert_to_ms, msToTime};