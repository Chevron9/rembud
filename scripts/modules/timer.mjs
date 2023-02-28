import { msToTime, convert_to_ms } from "./dateutils.mjs";

class Timer {

    constructor(duration, start, message) {
        this.duration = duration
        this.start = start
        this.message = message

        this.end = start+duration;
        console.log(`Timer ends at ${this.end}`)
        this.end_date = new Date(this.end)
        console.log(`${this.end_date}`)

        this.time_left = duration
    }

    end_timer(sfx){
        //reset, cleanup etc
        this.notify(sfx)
    }
    
    reset_title(){
        document.title = "Rembud"
    }
      
    notify(sfx) {
        sfx.play();
        document.title = "alert!"
        setTimeout(this.reset_title,1000*10)
        alert(this.message)
    }

    update_time_left() {
        this.time_left = this.end - this.now
    }

    get countdown_view() {
        this.update_time_left()
        return `${msToTime(this.time_left)} ${this.end_date} Memo: ${this.message}`
    }

    set now(now) {
        this.now = now
    }
}

export {Timer};