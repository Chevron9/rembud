class Timer {

    constructor(duration, start, message) {
        this.duration = duration
        this.start = start
        this.message = message

        this.end = start+timer_duration;
        console.log(`Timer ends at ${end}`)
        this.end_date = new Date(end)
        console.log(`${end_date}`)
    }

    end_timer(){
        //reset, cleanup etc
        notify(this.message)
    }
}

export {Timer};