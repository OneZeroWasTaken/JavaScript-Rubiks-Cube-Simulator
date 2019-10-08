class Timer {
    constructor() {
        this.enabled = false;   // Draws the timer on the canvas if true
        this.running = false;

        this.minutes = 0;
        this.seconds = 0;
        this.milliSeconds = 0;

        this.currentTime = "00:00:00";   // Stores the time in a string to be easily displayed

    }

    start() {
        if (this.enabled) {
            this.t = setInterval(function() {timer.update()}, 10);   // Starts the timer by calling timer.update() every 10 milliseconds
            this.running = true;
        }
    }

    stop() {
        clearInterval(this.t);
        this.running = false;
    }

    update() {   // Updates the time of the timer. Called every 10 milliseconds
        if (cube.solved) {
            timer.stop();
            return;
        }

        this.milliSeconds += 10;   // Updates the timer values
        if (this.milliSeconds - 1000 == 0) {
            this.seconds++;
            this.milliSeconds = 0;
        }
        if (this.seconds - 60 == 0) {
            this.minutes++;
            this.seconds = 0;
        }


        if (this.minutes < 10) {   // Cleans up the string
            this.currentTime = "0" + this.minutes;
        } else {
            this.currentTime = this.minutes;
        }
        this.currentTime += ":";
        if (this.seconds < 10) {
            this.currentTime += "0" + this.seconds;
        } else {
            this.currentTime += this.seconds;
        }
        this.currentTime += ":";
        if (this.milliSeconds < 100) {
            this.currentTime += "0" + this.milliSeconds;
        } else {
            this.currentTime += this.milliSeconds;
        }
        this.currentTime = this.currentTime.slice(0, -1);   // Removes the extra zero at the end
        

        this.draw();
    }

    draw() {   // Draws the timer with the current time
        strokeWeight(0);
        fill(s.background);
        rect(s.width / 2.5, 0, s.width / 2.5, s.height / 9.5);   // Covers up previous time

        if (this.enabled) {
            fill(s.text);
            if (s.comicSans) {
                s.ctx.font = 1.5 * s.s + "px Comic Sans MS";
            } else {
                s.ctx.font = 1.5 * s.s + "px Arial";
            }
            
            s.ctx.fillText(this.currentTime, s.width / 2 - s.ctx.measureText("00:00:00").width / 2, 1.5 * s.s + 0.5 * s.margin);   // Draws the new time
        }
    }

    reset() {   // Sets the timer to zero
        this.minutes = 0;
        this.seconds = 0;
        this.milliSeconds = 0;
        this.currentTime = "00:00:00";

        if (this.enabled) {
            this.draw();
        }
    }
}