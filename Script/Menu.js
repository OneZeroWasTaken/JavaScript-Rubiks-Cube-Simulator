class Menu {
    constructor() {
        this.enabled = false;   // True only when the animation has stopped
        this.animation = 0;    // Goes from 0 (no menu) to this.animationSpeed (menu enabled). Goes up or down depending on this.state
        this.state = 0;       // 0: Not moving, 1: Moving into frame, -1: Moving outwards

        this.settingsEnabled = false;   // Same things but for the settings sub menu
        this.settingsAnimation = 0;
        this.settingsState = 0;

        this.colorSettings = false;   // Variables for the color changing stuff
        this.rgb = [];   // Current slider values for the color settings: Red, green and blue
        this.colorSelected;

        this.text = false;   // Toggled by the info button. When true show some info text
        this.textState = 0;   // Press info icon once: 1, Twice: 2, Then 0 again
        

        // Icon creation
        this.grid      = new Icon(0,  s.margin, s.margin, null, 0, 0);
        this.setting   = new Icon(6,  s.margin, -2 * s.s, 3 * s.margin + 2 * s.s, 1, 1);
        this.reset     = new Icon(8,  s.margin, -2 * s.s, 2 * s.margin + 2 * s.s, 2, 1);
        this.scramble  = new Icon(2,  s.margin, -4 * s.s, 3 * s.margin + 4 * s.s, 2, 1);
        this.undo      = new Icon(4,  s.margin, -7 * s.s, 4 * s.margin + 6 * s.s, 2, 1);
        this.info      = new Icon(14, s.margin, -5 * s.s, s.width - s.margin - 2 * s.s, 2, 1);

        this.timer     = new Icon(12, s.margin, -2 * s.s, 5 * s.margin + 4 * s.s, 1, 2);
        this.helpLine  = new Icon(20, s.margin, -3 * s.s, 6 * s.margin + 6 * s.s, 1, 2);
        this.color     = new Icon(16, s.margin, -4 * s.s, 7 * s.margin + 8 * s.s, 1, 2);


        this.plus = [];
        for (var i = 0; i < 8; i++) {   // Setup for the plus icons
            this.plus[i] = new Icon(18, s.width / 8 * i + s.width / 16 - s.s / 2, s.height - 0.75 * s.s - s.s / 2, null, 0, 0);
            this.plus[i].size = 1;   // Half the size of a normal icon
            this.plus[i].plus = true;   // When false the plus is a cross
            this.checkIconColor(i);
        }
    }

    draw() {
        strokeWeight(0);
        fill(s.background);
        
        if (this.state != 0) {
            this.grid.update();   // Update, then draw the icon
        }

        if (this.animation) {   // Updates the icons only when it is moving to save resources
            if (this.setting.rotationType || !this.state == 0) {
                this.setting.update();
            }
            if (this.reset.rotationType || !this.state == 0) {
                this.reset.update();
            }
            if (this.scramble.rotationType || !this.state == 0) {
                this.scramble.update();
            }
            if (this.undo.rotationType || !this.state == 0) {
                this.undo.update();
            }
            if (this.info.rotationType || !this.state == 0) {
                this.info.update();
            }
        }
        if (this.settingsAnimation) {   // Updates the setting icons if its animation is more than 0
            if (this.timer.rotationType || !this.settingsState == 0) {
                this.timer.update();
            }
            if (this.helpLine.rotationType || !this.settingsState == 0) {
                this.helpLine.update();
                
            }
            if (this.color.rotationType || !this.settingsState == 0) {
                this.color.update();
            }
        }
        for (var i = 0; i < 8; i++) {
            if (this.plus[i].rotationType && this.colorSettings) {
                this.plus[i].update();
            }
        }

        this._update();

        if (this.text) {
            this.updateText();
        }
    }

    _update() {   // Boring function that only changes a few values of states and stuff
        if (this.state == 1) {   // Updates the animation value depending on this.state
            this.animation++;
        } else if (this.state == -1) {
            this.animation--;
        }

        if (this.settingsState == 1) {
            this.settingsAnimation++;
        } else if (this.settingsState == -1) {
            this.settingsAnimation--;
        }

        if (this.animation == s.animationSpeed) {   // Menu is shown and the animation has stopped
            if (!this.enabled) {
                exactIconPosition(this, false);
            }
            this.state = 0;
            this.enabled = true;
        } else {   // Else, the menu is gone and the animation has stopped
            if (this.animation == 0) {
                this.state = 0;
            }
            this.enabled = false;
        }

        if (this.settingsAnimation == Math.round(s.animationSpeed / 2)) {   // Settings menu is double the speed
            if (!this.settingsEnabled) {
                exactIconPosition(this, true);
            }
            this.settingsState = 0;
            this.settingsEnabled = true;
        } else {
            if (this.settingsAnimation == 0) {
                this.settingsState = 0;
            }
            this.settingsEnabled = false;
        }


        function exactIconPosition(self, all) {
            self.grid.resetPosition();
            self.setting.resetPosition();
            self.reset.resetPosition();
            self.scramble.resetPosition();
            self.undo.resetPosition();
            self.info.resetPosition();
            if (all) {
                self.timer.resetPosition();
                self.helpLine.resetPosition();
                self.color.resetPosition();
            }
        }
    }

    updateText() {   // Displays the right texts and hides unnecessary text when called
        strokeWeight(0);
        fill(s.background);
        rect(0, 2 * s.s + s.margin - 2, 8 * s.s + 5 * s.margin, s.s / 2.4);
        rect(0, 4 * s.s + 3 * s.margin - 2, 2 * s.s + 2 * s.margin, s.s / 2.4);
        rect(0, 6 * s.s + 5 * s.margin - 2, 2 * s.s + 2 * s.margin, s.s / 2.4);
        rect(0, 8 * s.s + 6 * s.margin - 2, 2 * s.s + 2 * s.margin, s.s / 2.4);
        rect(0, 10 * s.s + 9 * s.margin - 2, 2 * s.s + 2 * s.margin, s.s / 2.4);

        rect(s.width - 2 * s.margin - s.ctx.measureText("While Holding Shift").width, 2 * s.s + s.margin - 2, s.margin + s.ctx.measureText("While Holding Shift").width, 2 * s.s + 3 * s.margin);
        rect(0, s.height - 2 * s.s - 4 * s.margin, s.width, s.s + 1.5 * s.margin);
        cube.drawCenters();

        if (this.text) {
            fill(s.text);
            if (s.comicSans) {
                s.ctx.font = s.s / 2.4 + "px Comic Sans MS";
            } else {
                s.ctx.font = s.s / 2.4 + "px Lucida Console";
            }

            s.ctx.fillText("Menu", s.s + s.margin - s.ctx.measureText("Menu").width / 2, 2 * s.s + 2 * s.margin);

            if (this.animation == s.animationSpeed && this.textState == 1) {
                s.ctx.fillText("Reset", 3 * s.s + 2 * s.margin - s.ctx.measureText("Reset").width / 2, 2 * s.s + 2 * s.margin);
                s.ctx.fillText("Scramble", 5 * s.s + 3 * s.margin - s.ctx.measureText("Scramble").width / 2, 2 * s.s + 2 * s.margin);
                s.ctx.fillText("Undo", 7 * s.s + 4 * s.margin - s.ctx.measureText("Undo").width / 2, 2 * s.s + 2 * s.margin);
                s.ctx.fillText("Info", s.width - s.s - s.margin - s.ctx.measureText("Info").width / 2, 2 * s.s + 2 * s.margin);
                s.ctx.fillText("Settings", s.s + s.margin - s.ctx.measureText("Settings").width / 2, 4 * s.s + 4 * s.margin);
            } else if (this.animation == s.animationSpeed && this.textState == 2) {
                s.ctx.fillText("Hard Reset", 3 * s.s + 2 * s.margin - s.ctx.measureText("Hard Reset").width / 2, 2 * s.s + 2 * s.margin);
                s.ctx.fillText("Solve", 5 * s.s + 3 * s.margin - s.ctx.measureText("Solve").width / 2, 2 * s.s + 2 * s.margin);
                s.ctx.fillText("Redo", 7 * s.s + 4 * s.margin - s.ctx.measureText("Redo").width / 2, 2 * s.s + 2 * s.margin);
                s.ctx.fillText("Info", s.width - s.s - s.margin - s.ctx.measureText("Info").width / 2, 2 * s.s + 2 * s.margin);
                s.ctx.fillText("While Holding Shift", s.width - s.margin - s.ctx.measureText("While Holding Shift").width, 2 * s.s + 5 * s.margin);
                s.ctx.fillText("Settings", s.s + s.margin - s.ctx.measureText("Settings").width / 2, 4 * s.s + 4 * s.margin);
            }

            if (this.settingsAnimation == Math.round(s.animationSpeed / 2)) {
                if (timer.enabled) {
                    var timerState = "On";
                } else {
                    var timerState = "Off";
                }
                s.ctx.fillText("Timer " + timerState, s.s + s.margin - s.ctx.measureText("Timer " + timerState).width / 2, 6 * s.s + 6 * s.margin);
                s.ctx.fillText("Help Lines", s.s + s.margin - s.ctx.measureText("Help Lines").width / 2, 8 * s.s + 7 * s.margin);
                s.ctx.fillText("Colors...", s.s + s.margin - s.ctx.measureText("Colors...").width / 2, 10 * s.s + 10 * s.margin);
                
                if (this.colorSettings && cube.scrambleString == "") {
                    s.ctx.fillText("Select a Color and Use Your Scrollwheel to Adjust. Press Same Color Again to Reset", s.margin, s.height - s.s - 6 * s.margin);
                    s.ctx.fillText("Upper Face Color", s.width / 16 - s.ctx.measureText("Upper Face Color").width / 2, s.height - s.s - 3 * s.margin);
                    s.ctx.fillText("Front Face Color", s.width / 8 + s.width / 16 - s.ctx.measureText("Front Face Color").width / 2, s.height - s.s - 3 * s.margin);
                    s.ctx.fillText("Right Face Color", s.width / 4 + s.width / 16 - s.ctx.measureText("Right Face Color").width / 2, s.height - s.s - 3 * s.margin);
                    s.ctx.fillText("Down Face Color", s.width / 8 * 3 + s.width / 16 - s.ctx.measureText("Down Face Color").width / 2, s.height - s.s - 3 * s.margin);
                    s.ctx.fillText("Back Face Color", s.width / 2 + s.width / 16 - s.ctx.measureText("Back Face Color").width / 2, s.height - s.s - 3 * s.margin);
                    s.ctx.fillText("Left Face Color", s.width / 8 * 5 + s.width / 16 - s.ctx.measureText("Left Face Color").width / 2, s.height - s.s - 3 * s.margin);
                    s.ctx.fillText("Background Color", s.width / 8 * 6 + s.width / 16 - s.ctx.measureText("Background Color").width / 2, s.height - s.s - 3 * s.margin);
                    s.ctx.fillText("Text Color", s.width / 8 * 7 + s.width / 16 - s.ctx.measureText("Text Color").width / 2, s.height - s.s - 3 * s.margin);
                }
            }

            if (s.comicSans) {
                s.ctx.font = s.s + "px Comic Sans MS";
            } else {
                s.ctx.font = s.s + "px Lucida Console";
            }

            if (this.textState == 2) {
                var prime = "'";   // When holding shift, the ' means counter clockwise
            } else {
                var prime = "";
            }

            for (var i = 0; i < 6; i++) {   // Draws cube controls
                if (this.plus[i].sprite % 2 == 0) {
                    fill(255);
                } else {
                    fill(0);
                }
                switch (i) {
                    case 0:
                        s.ctx.fillText("U" + prime, s.width / 4 - 2 * s.margin, s.height / 2 - 3 * s.s + s.margin);
                        break;
                    case 1:
                        s.ctx.fillText("F" + prime, s.width / 4 - 3 * s.s - 2 * s.margin, s.height / 2 + 1.5 * s.s + s.margin);
                        break;
                    case 2:
                        s.ctx.fillText("R" + prime, s.width / 4 + 3 * s.s - 2 * s.margin, s.height / 2 + 1.5 * s.s + s.margin);
                        break;
                    case 3:
                        s.ctx.fillText("D" + prime, s.width / 4 * 3 - 2 * s.margin, s.height / 2 - 3 * s.s + s.margin);
                        break;
                    case 4:
                        s.ctx.fillText("B" + prime, s.width / 4 * 3 - 3 * s.s - 2 * s.margin, s.height / 2 + 1.5 * s.s + s.margin);
                        break;
                    case 5:
                        s.ctx.fillText("L" + prime, s.width / 4 * 3 + 3 * s.s - 2 * s.margin, s.height / 2 + 1.5 * s.s + s.margin);
                        break;
                }
            }
        }
    }

    // Following 6 funktions is about color settings
    drawColorSliders() {
        this.rgb = this._findColor(this.colorSelected);

        strokeWeight(0);   // Cover up previous frame
        fill(s.background);
        rect(s.width / 2 - 1.6 * s.s - s.s / 2, s.height - 9 * s.s - s.s / 1.9, 4.2 * s.s, 5 * s.s + 2 * s.margin);

        strokeWeight(s.s / 2);   // Draw 3 thick vertical lines as sliders 
        if (!s.darkIcons) {   // Set the stroke with the same color as the icons
            stroke(255);
        }
        line(s.width / 2 - 1.5 * s.s, s.height - 9 * s.s, s.width / 2 - 1.5 * s.s, s.height - 4 * s.s - 2 * s.margin);
        line(s.width / 2, s.height - 9 * s.s, s.width / 2, s.height - 4 * s.s - 2 * s.margin);
        line(s.width / 2 + 1.5 * s.s, s.height - 9 * s.s, s.width / 2 + 1.5 * s.s, s.height - 4 * s.s - 2 * s.margin);
        strokeWeight(1);

        fill(this.rgb[0], 0, 0);   // Draw 3 circles with values corresponding to the current r, g and b values
        ellipse(s.width / 2 - 1.5 * s.s, map(this.rgb[0], 0, 255, s.height - 4 * s.s - 2 * s.margin, s.height - 9 * s.s, true), s.s);
        fill(0, this.rgb[1], 0);
        ellipse(s.width / 2, map(this.rgb[1], 0, 255, s.height - 4 * s.s - 2 * s.margin, s.height - 9 * s.s, true), s.s);
        fill(0, 0, this.rgb[2]);
        ellipse(s.width / 2 + 1.5 * s.s, map(this.rgb[2], 0, 255, s.height - 4 * s.s - 2 * s.margin, s.height - 9 * s.s, true), s.s);


        stroke(0);   // Reset stroke color
    }


    drawColorSettings(remove) {   // If remove is true, draw a square over the color overlay instead to remove it
        if (remove) {
            strokeWeight(0);
            fill(s.background);
            rect(0, s.height - s.s - 3 * s.margin, s.width, s.s + 3 * s.margin);   // Covers up the bottom
            rect(s.width / 2 - 1.6 * s.s - s.s / 2, s.height - 9 * s.s - s.s / 1.9, 4.2 * s.s, 5 * s.s + 2 * s.margin);   // Covers the sliders

            this.colorSettings = false;
            this.rgb = [];   // Reset slider values

            for (var i = 0; i < this.plus.length; i++) {   // Reset plus icons
                if (!this.plus[i].plus) {
                    this.plus[i].rotation = 0;
                    this.plus[i].plus = true;
                }
            }
            return;
        }

        strokeWeight(2);
        for (var i = 0; i < 8; i++) {   // Draws 8 rectangles at the bottom, one for each changeable color
            fill(this._findColor(i));
            rect(s.width / 8 * i, s.height - s.s - 2 * s.margin, s.width / 8, s.s + 2 * s.margin);
        }

        for (var i = 0; i < 8; i++) {   // Draws a plus on each rectangle
            this.plus[i].update();
        }
    }


    colorSelect() {   // Finds out what color on the color overlay was pressed, mouseY is checked beforehand; only mouseX is checked here
        if (mouseX < s.width / 8) {   // Up color select
            var colorPressed = 0;
        } else if (mouseX < s.width / 8 * 2) {   // Front color select
            var colorPressed = 1;
        } else if (mouseX < s.width / 8 * 3) {   // Right color select
            var colorPressed = 2;
        } else if (mouseX < s.width / 8 * 4) {   // Down color select
            var colorPressed = 3;
        } else if (mouseX < s.width / 8 * 5) {   // Back color select
            var colorPressed = 4;
        } else if (mouseX < s.width / 8 * 6) {   // Left color select
            var colorPressed = 5;
        } else if (mouseX < s.width / 8 * 7) {   // Background color select
            var colorPressed = 6;
        } else if (mouseX < s.width) {   // Text color select
            var colorPressed = 7;
        }

        if (colorPressed == this.colorSelected) {   // Finds out if the same color field was pressed twice in a row
            this.resetColor(this.colorSelected, 1);   // Set that color to what the default color was

            if (menu.colorSelected == 6) {
                background(s.background);
                menu.redrawIcons();
            }
            updatePieceColors();

            cube.draw();   // Redraw
            cube.drawCenters();
            this.checkIconColor(menu.colorSelected);
            this.drawColorSettings();
            
            strokeWeight(0);   // Covers the sliders
            fill(s.background);
            rect(s.width / 2 - 1.6 * s.s - s.s / 2, s.height - 9 * s.s - s.s / 1.9, 4.2 * s.s, 5 * s.s + 2 * s.margin);

            this.rgb = [];
            for (var i = 0; i < this.plus.length; i++) {   // For icon animation
                if (!this.plus[i].plus) {
                    this.plus[this.colorSelected].rotationType = -405;
                    return;
                }
            }
        } else {   // Else, select that color
            this.colorSelected = colorPressed;
            this.rgb = this._findColor(this.colorSelected);
            
            for (var i = 0; i < this.plus.length; i++) {   // For icon animation
                if (!this.plus[i].plus) {
                    this.plus[i].rotationType = -405;
                }
            }
            this.plus[this.colorSelected].plus = false;
            this.plus[this.colorSelected].rotationType = 405;
        }

        function updatePieceColors() {   // The pieces' color reference gets messed up when chaning the current colors to the default ones
            for (var i = 0; i < cube.piece.length; i++) {
                if (i < 8) {
                    cube.piece[i].color = s.upColor;
                } else if (i < 16) {
                    cube.piece[i].color = s.frontColor;
                } else if (i < 24) {
                    cube.piece[i].color = s.rightColor;
                } else if (i < 32) {
                    cube.piece[i].color = s.downColor;
                } else if (i < 40) {
                    cube.piece[i].color = s.backColor;
                } else {
                    cube.piece[i].color = s.leftColor;
                }
            }
        }
    }

    _findColor(colorID) {   // Returns the current color values of the given colorID
        switch (colorID) {
            case 0:
                var color = s.upColor;
                break;
            case 1:
                var color = s.frontColor;
                break;
            case 2:
                var color = s.rightColor;
                break;
            case 3:
                var color = s.downColor;
                break;
            case 4:
                var color = s.backColor;
                break;
            case 5:
                var color = s.leftColor;
                break;
            case 6:
                var color = s.background;
                break;
            case 7:
                var color = s.text;
                break;
        }
        return color;
    }

    resetColor(index, number) {   // Called during a hard reset and when clicking twice on a color setting field at the bottom
        for (var i = index; i < index + number; i++) {
            switch (i) {
                case 0:
                    s.upColor = [s.defaultColor[i][0], s.defaultColor[i][1], s.defaultColor[i][2]];
                    break;
                case 1:
                    s.frontColor = [s.defaultColor[i][0], s.defaultColor[i][1], s.defaultColor[i][2]];
                    break;
                case 2:
                    s.rightColor = [s.defaultColor[i][0], s.defaultColor[i][1], s.defaultColor[i][2]];
                    break;
                case 3:
                    s.downColor = [s.defaultColor[i][0], s.defaultColor[i][1], s.defaultColor[i][2]];
                    break;
                case 4:
                    s.backColor = [s.defaultColor[i][0], s.defaultColor[i][1], s.defaultColor[i][2]];
                    break;
                case 5:
                    s.leftColor = [s.defaultColor[i][0], s.defaultColor[i][1], s.defaultColor[i][2]];
                    break;
                case 6:
                    s.background = [s.defaultColor[i][0], s.defaultColor[i][1], s.defaultColor[i][2]];
                    break;
                case 7:
                    s.text = [s.defaultColor[i][0], s.defaultColor[i][1], s.defaultColor[i][2]];
                    break;
            }
        }
    }

    checkIconColor(iconID) {   // Changes the small + to a white or black icon depending on the color it is displayed on. Used in the setup as well as when a color is changed
        switch (iconID) {
            case 0:
                if (s.upColor[0] + s.upColor[1] + s.upColor[2] < 382.5) {   // 255 * 3 / 2 = 382.5
                    this.plus[iconID].sprite = 18;
                } else {
                    this.plus[iconID].sprite = 19;
                }
                break;
            case 1:
                if (s.frontColor[0] + s.frontColor[1] + s.frontColor[2] < 382.5) {
                    this.plus[iconID].sprite = 18;
                } else {
                    this.plus[iconID].sprite = 19;
                }
                break;
            case 2:
                if (s.rightColor[0] + s.rightColor[1] + s.rightColor[2] < 382.5) {
                    this.plus[iconID].sprite = 18;
                } else {
                    this.plus[iconID].sprite = 19;
                }
                break;
            case 3:
                if (s.downColor[0] + s.downColor[1] + s.downColor[2] < 382.5) {
                    this.plus[iconID].sprite = 18;
                } else {
                    this.plus[iconID].sprite = 19;
                }
                break;
            case 4:
                if (s.backColor[0] + s.backColor[1] + s.backColor[2] < 382.5) {
                    this.plus[iconID].sprite = 18;
                } else {
                    this.plus[iconID].sprite = 19;
                }
                break;
            case 5:
                if (s.leftColor[0] + s.leftColor[1] + s.leftColor[2] < 382.5) {
                    this.plus[iconID].sprite = 18;
                } else {
                    this.plus[iconID].sprite = 19;
                }
                break;
            case 6:
                if (s.background[0] + s.background[1] + s.background[2] < 382.5) {
                    this.plus[iconID].sprite = 18;
                    if (s.darkIcons) {
                        s.darkIcons = false;
                        this.redrawIcons();
                    }
                } else {
                    this.plus[iconID].sprite = 19;
                    if (!s.darkIcons) {
                        s.darkIcons = true;
                        this.redrawIcons();
                    }
                }
                break;
            case 7:
                if (s.text[0] + s.text[1] + s.text[2] < 382.5) {
                    this.plus[iconID].sprite = 18;
                } else {
                    this.plus[iconID].sprite = 19;
                }
                break;
        }
    }

    redrawIcons() {   // Draws all icons no matter where they are and what state they are in
        this.grid.update();
        this.reset.update();
        this.scramble.update();
        this.undo.update();
        this.info.update();
        this.setting.update();
        this.timer.update();
        this.helpLine.update();
        this.color.update();
    }
}