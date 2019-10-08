class Icon {
    constructor(sprite, xyShown, xyGone, yx, axis, parent) {
        this.sprite = sprite;
        this.xyShown = xyShown;     // X / Y when shown
        this.xyGone = xyGone;      // X / Y when not visible
        this.axis = axis;         // If the movement is happening on the X (1) or Y (2) axis
        this.parent = parent     // Which icon has to be pressed for the icons' animation to play. 1 = Grid & 2 = Setting

        this.size = 2;

        switch (this.axis) {     // Depending on if the icon moves up / down or left / right, set the x and y values of the icon where one of them is constant (yx)
            case 0:
                this.x = this.xyShown;
                this.y = this.xyGone;
                break;
            case 1:
                this.x = this.xyGone;
                this.y = yx;
                break;
            case 2:
                this.x = yx;
                this.y = this.xyGone;
                break;
        }

        this.state = 0;                 // Movement: 0 = At xyGone or xyShown, 1 = To xyShown, 2 = To xyGone

        this.rotation = 0;            // Current rotation of the icon
        this.rotationType = null;    // How many degrees, what direction and if it should have acceleration is decided with a number
        this.speed = 0;             // Rotation speed for acceleration
    }


    update() {   // Updates the position of the icon, translates to its X & Y, updates the rotation, covers up the previous frame and lastly draws the icon
        push();

        move(this);
        translate(this.x + s.s * 0.5 * this.size, this.y + s.s * 0.5 * this.size);
        this._rotate();
        if (this.size == 2) {
            strokeWeight(0);   // Cover up the previous frame (only the big icons)
            fill(s.background);
            rect(-s.s, -s.s, 2 * s.s, 2 * s.s);

            s.ctx.drawImage(s.sprite[this.sprite + s.darkIcons], -s.s, -s.s, this.size * s.s, this.size * s.s);
        } else {
            strokeWeight(0);
            fill(menu._findColor(Math.floor(this.x / (s.width / 8))));
            rect(-0.5 * s.s, -0.5 * s.s, s.s, s.s);
            s.ctx.drawImage(s.sprite[this.sprite], -s.s * 0.5, -s.s * 0.5, this.size * s.s, this.size * s.s);   // Small icons also ignore s.darkIcons
        }

        pop();   // I prefer alternative rock

        function move(self) {   // Calculates how much the icon should move each update depending on xyShown, xyGone and s.animationSpeed
            if (self.parent == 1) {
                var state = menu.state;
            } else if (self.parent == 2) {
                var state = menu.settingsState;
            }

            switch (self.axis) {   // Moves the icon left, right, up or down depending on the state of the animation (+ / -) and which axis it moves along
                case 1:
                    if (state == 1) {
                        self.x += (self.xyShown - self.xyGone) / s.animationSpeed * self.parent;   // If its parent is the settings icon it moves at double the speed
                    } else if (state == -1) {
                        self.x -= (self.xyShown - self.xyGone) / s.animationSpeed * self.parent;
                    }
                    break;
                case 2:
                    if (state == 1) {
                        self.y += (self.xyShown - self.xyGone) / s.animationSpeed * self.parent;
                    } else if (state == -1) {
                        self.y -= (self.xyShown - self.xyGone) / s.animationSpeed * self.parent;
                    }
                    break;
            }
        }
    }

    _rotate() {   // Handles rotation. Updates this.rotation depending on its rotationType. (For some reason this does not work when I put it inside of the update function)
        switch (this.rotationType) {
            case 180:   // Rotate 180 degrees clockwise
                this.rotation += Math.PI / s.animationSpeed;   // Rotation update
                if (this.rotation >= Math.PI) {   // Rotation reset
                    this.rotation = Math.PI;
                    this.rotationType = null;
                }
                break;

            case -180:   // Rotate 180 degrees counter-clockwise
                this.rotation -= Math.PI / s.animationSpeed;
                if (this.rotation <= 0) {
                    this.rotation = 0;
                    this.rotationType = null;
                }
                break;

            case 360:
                if (this.rotation < Math.PI) {
                    this.speed -= s.iconAcceleration;
                } else {
                    this.speed += s.iconAcceleration;
                }

                this.rotation -= this.speed;

                if (this.rotation >= 1.98 * Math.PI) {
                    this.rotation = 0;
                    this.rotationType = null;
                    this.speed = 0;
                }
                break;

            case -360:
                if (this.rotation > -Math.PI) {   // For icon acceleration
                    this.speed += s.iconAcceleration;
                } else {
                    this.speed -= s.iconAcceleration;
                }

                this.rotation -= this.speed;

                if (this.rotation <= -1.98 * Math.PI) {
                    this.rotation = 0;
                    this.rotationType = null;
                    this.speed = 0;
                }
                break;

            case 405:
                if (this.rotation > 1.125 * Math.PI) {   // For icon acceleration
                    this.speed += s.iconAcceleration;
                } else {
                    this.speed -= s.iconAcceleration;
                }

                this.rotation -= this.speed;

                if (this.rotation >= 2.25 * Math.PI) {
                    this.rotation = Math.PI / 4;
                    this.rotationType = null;
                    this.speed = 0;
                }
                break;

            case -405:
                if (this.rotation < -0.95 * Math.PI) {   // For icon acceleration
                    this.speed -= s.iconAcceleration;
                } else {
                    this.speed += s.iconAcceleration;
                }

                this.rotation -= this.speed;

                if (this.rotation <= -2 * Math.PI) {
                    this.rotation = 0;
                    this.rotationType = null;
                    this.speed = 0;
                    this.plus = true;
                }
                break;
        }
        rotate(this.rotation);
    }

    resetPosition() {
        if (this.parent == 1 && this.axis == 2) {   // At the end of the animation, move the icon to the exact coordinate
            this.y = this.xyShown;
        } else if (this.axis == 1) {
            this.x = this.xyShown;
        }
    }
}