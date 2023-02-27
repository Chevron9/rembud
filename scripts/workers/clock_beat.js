clock_beat(Date.now());


onmessage = (event) => {
    console.log(event.data)
}

function clock_beat(expected) {
    //runs every 100 milliseconds and updates displays
  
    let now = Date.now()
    let execution_delta = now - expected
    let new_timeout = 100
    
    //console.log(`execution delta ${execution_delta}`)
  
    if (execution_delta<0) {
      Error("execution happened earlier than expected")
    } else if (execution_delta == 0) {
      //pass
    } else if (execution_delta > 0){
      new_timeout -= execution_delta 
    }
    
    let tick = {type: "clock_beat", content: Date.now()} 
    postMessage(tick)

    let next_expected = now + new_timeout
    setTimeout(clock_beat,new_timeout,next_expected)
    
}