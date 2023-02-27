class Timer {

    constructor(duration, start, message) {
        this.duration = duration
        this.start = start
        this.message = message

        this.end = start+duration;
        console.log(`Timer ends at ${this.end}`)
        this.end_date = new Date(this.end)
        console.log(`${this.end_date}`)
    }

    end_timer(sfx){
        //reset, cleanup etc
        notify(sfx)
    }
    
    reset_title(){
        document.title = "Rembud"
    }
      
    notify(sfx) {
        sfx.play();
        document.title = "alert!"
        setTimeout(reset_title,1000*10)
        alert(this.message)
    }
}

export {Timer};