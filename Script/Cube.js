class Cube {
    constructor() {
        this.solved;           // False most of the time
        this.piece = [];         // Holds all 48 piece objects
        this.scramble = [];        // Stores the scramble instructions as numbers
        this.scrambling = 0;         // If above 0 it scrambles automatically, the same amount of turns as it was set at
        this.scrambleString = "";      // Stores the scramble instructions as mostly letters
        this.turnHistory = [];       // Stores the previous move for the undo button
        this.autoTurn = [];        // Stores moves that will automatically happen (like a scramble but without the randomness)
        this.redo = [];          // Stores the reverse of undo moves so the user can redo (hold shift and press undo button)

        this._setup();
    }

    _update(turn, clockwise, save) {   // Checks if the cube is solved, saves moves for redo's, med mera
        for (var i = 0; i < cube.piece.length; i++) {
            if (i == cube.piece[i].position) {
                this.solved = true;
                this.redo = [];
            } else {
                this.solved = false;
                break;
            }
        }

        if (save) {   // If save is true, store the turn in turnHistory for undo's
            this.turnHistory.push([turn, clockwise]);
        }
        
    }

    draw() {   // Draws the cube
        if (s.stickerless) {   // For stickerless cubes
            strokeWeight(0);
        } else {
            strokeWeight(1);
        }
        if (s.helpLine) {
            s.helpLine = -1;
        }
        for (var i = 0; i < cube.piece.length; i++) {
            this.piece[i].draw();
        }
        if (s.helpLine == -1) {
            s.helpLine = true;
            for (var i = 0; i < cube.piece.length; i++) {
                this.piece[i].draw();
            }
        }
    }


    turn(side, clockwise, save) {   // Moves the side in the given direction by calling every piece object to turn in that direction. Only those affected by the turn listens and changes position
        for (var i = 0; i < this.piece.length; i++) {
            this.piece[i].turn(side, clockwise);
        }
        if (save) {
            this._update(side, clockwise, save);
        }
        
        this.draw();
    }


    scramble_() {   // Moves the cube in a random direction. The _ because it did not like having a variable with the same name
        do {
            var randMove = rand(0, 5);
            var clockwise = rand(0, 1);   // True / False

            if (!this.scramble.length) {   // Skips the while (statement) the first time
                break;
            }
        } while (this.scramble[this.scramble.length - 1][0] == randMove && this.scramble[this.scramble.length - 1][1] != clockwise);   // To prevent it scrambling back and forth on the same face
        
        this.scramble.push([randMove, clockwise]);   // Adds the move to the scramble array
        this.turn(randMove, clockwise, false);   // Turns the cube

        if (this.scrambling == 1) {   // Draws the scramble when it is finished
            this._drawScramble();
        }
        this.scrambling--;
    }

    _drawScramble() {   // Translates the scramble from numbers to letters
        this.scrambleString = "";
        for (var i = 0; i < cube.scramble.length; i++) {
            switch (cube.scramble[i][0]) {
                case 0:
                    if (cube.scramble[i][1] == 1) {
                        this.scrambleString += "U ";
                    } else {
                        this.scrambleString += "U' ";
                    }
                    break;
                case 1:
                    if (cube.scramble[i][1] == 1) {
                        this.scrambleString += "F ";
                    } else {
                        this.scrambleString += "F' ";
                    }
                    break;
                case 2:
                    if (cube.scramble[i][1] == 1) {
                        this.scrambleString += "R ";
                    } else {
                        this.scrambleString += "R' ";
                    }
                    break;
                case 3:
                    if (cube.scramble[i][1] == 1) {
                        this.scrambleString += "D ";
                    } else {
                        this.scrambleString += "D' ";
                    }
                    break;
                case 4:
                    if (cube.scramble[i][1] == 1) {
                        this.scrambleString += "B ";
                    } else {
                        this.scrambleString += "B' ";
                    }
                    break;
                case 5:
                    if (cube.scramble[i][1] == 1) {
                        this.scrambleString += "L ";
                    } else {
                        this.scrambleString += "L' ";
                    }
                    break;
            }
        }

        var i = 0;
        do {
            if (s.comicSans) {
                s.ctx.font = s.s - i + "px Comic Sans MS";
            } else {
                s.ctx.font = s.s - i + "px Lucida Console";
            }
            i++;
        } while (s.ctx.measureText(this.scrambleString).width > s.width);   // Sets the right font size to make the scramble fit on the screen
        

        fill(s.text);
        s.ctx.fillText(this.scrambleString, s.width / 2 - s.ctx.measureText(this.scrambleString).width / 2, s.height - 2 * s.s);
    }

    solve(instant) {   // No, that's cheating
        if (instant) {   // Solve it instantly by reseting the cube
            this.piece = [];
            this._setup();
            this.draw();

        } else {   // Make every previous turn backwards to solve the cube
            for (var i = this.turnHistory.length - 1; i >= 0; i--) {
                this.autoTurn.push([this.turnHistory[i][0], !this.turnHistory[i][1]]);   // Reverse the clockwise / counter clockwise movement
            }
            for (var i = this.scramble.length - 1; i >= 0; i--) {
                this.autoTurn.push([this.scramble[i][0], !this.scramble[i][1]]);
            }
        }

        this.turnHistory = [];   // Reset som variables and stuff
        this.redo = [];
        timer.stop();
    }


    drawCenters() {   // Draws the centers of the sides
        if (s.stickerless) {   // For the stickerless cube setting
            strokeWeight(0);
        } else {
            strokeWeight(1);
        }
        
        c = [s.width / 4, s.height / 2 - 2 * s.s];
        fill(s.upColor);
        quad(c[0], c[1], c[0] - 2 * s.s, c[1] - s.s, c[0], c[1] - 2 * s.s, c[0] + 2 * s.s, c[1] - s.s);
        c = [s.width / 4 - 2 * s.s, s.height / 2 + s.s];
        fill(s.frontColor);
        quad(c[0], c[1], c[0], c[1] + 2 * s.s, c[0] - 2 * s.s, c[1] + s.s, c[0] - 2 * s.s, c[1] - s.s);
        c = [s.width / 4 + 2 * s.s, s.height / 2 + s.s];
        fill(s.rightColor);
        quad(c[0], c[1], c[0], c[1] + 2 * s.s, c[0] + 2 * s.s, c[1] + s.s, c[0] + 2 * s.s, c[1] - s.s);
        c = [s.width / 4 * 3, s.height / 2 - 2 * s.s];
        fill(s.downColor);
        quad(c[0], c[1], c[0] - 2 * s.s, c[1] - s.s, c[0], c[1] - 2 * s.s, c[0] + 2 * s.s, c[1] - s.s);
        c = [s.width / 4 * 3 - 2 * s.s, s.height / 2 + s.s];
        fill(s.leftColor);
        quad(c[0], c[1], c[0], c[1] + 2 * s.s, c[0] - 2 * s.s, c[1] + s.s, c[0] - 2 * s.s, c[1] - s.s);
        c = [s.width / 4 * 3 + 2 * s.s, s.height / 2 + s.s];
        fill(s.backColor);
        quad(c[0], c[1], c[0], c[1] + 2 * s.s, c[0] + 2 * s.s, c[1] + s.s, c[0] + 2 * s.s, c[1] - s.s);
    }

    
    _setup() {
        var color;
        for (var i = 0; i < 48; i++) {   // Piece setup with the right colors
            if (i < 8) {
                color = s.upColor;       // Top face, default: White
            } else if (i < 16) {
                color = s.frontColor;    // Front face, default: Green
            } else if (i < 24) {
                color = s.rightColor;    // Right face, default: Red
            } else if (i < 32) {
                color = s.downColor;     // Down face, default: Yellow
            } else if (i < 40) {
                color = s.backColor;     // Back face, default: Blue
            } else {
                color = s.leftColor;     // Left face, default: Orange
            }
    
            this.piece.push(new Piece(i, color));   // i == the position on the cube 
        }
    }
}