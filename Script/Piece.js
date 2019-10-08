class Piece {
    constructor(position, color) {
        this.position = position;
        this.color = color;
    }

    draw() {   // Draws the piece
        fill(this.color);   // Sets the fill color to the current piece color

        if (this.position >= 24) {
            var e = [3, 1];   // Extends the draw in the x-axis to 4 / 3 of the total width
        } else {
            var e = [1, 3];
        }

        if ((this.position >= 16 && this.position < 24) || (this.position >= 32 && this.position < 40) || (this.position >= 5 && this.position < 8) || (this.position >= 29 && this.position < 32)) {   // Reverse
            var r = [-1, 1];
        } else {
            var r = [1, -1];
        }

        switch (this.position) {
            case 0:
            case 24:
                c = [s.width / 4 * e[0], s.height / 2 - 4 * s.s];
                drawQuad(this.position);
                break;
            case 1:
            case 25:
            case 7:
            case 31:
                c = [s.width / 4 * e[0] + 2 * s.s * r[0], s.height / 2 - 3 * s.s];
                drawQuad(this.position);
                break;
            case 2:
            case 26:
            case 6:
            case 30:
                c = [s.width / 4 * e[0] + 4 * s.s * r[0], s.height / 2 - 2 * s.s];
                drawQuad(this.position);
                break;
            case 3:
            case 27:
            case 5:
            case 29:
                c = [s.width / 4 * e[0] + 2 * s.s * r[0], s.height / 2 - s.s];
                drawQuad(this.position);
                break;
            case 4:
            case 28:
                c = [s.width / 4 * e[0], s.height / 2];
                drawQuad(this.position);
                break;
            case 8:
            case 18:
            case 34:
            case 40:
                c = [s.width / 4 * e[0] - 4 * s.s * r[0], s.height / 2 - 2 * s.s];
                drawQuad(this.position);
                break;
            case 9:
            case 17:
            case 33:
            case 41:
                c = [s.width / 4 * e[0] - 2 * s.s * r[0], s.height / 2 - s.s];
                drawQuad(this.position);
                break;
            case 10:
            case 16:
            case 32:
            case 42:
                c = [s.width / 4 * e[0], s.height / 2];
                drawQuad(this.position);
                break;
            case 11:
            case 23:
            case 39:
            case 43:
                c = [s.width / 4 * e[0], s.height / 2 + 2 * s.s];
                drawQuad(this.position);
                break;
            case 12:
            case 22:
            case 38:
            case 44:
                c = [s.width / 4 * e[0], s.height / 2 + 4 * s.s];
                drawQuad(this.position);
                break;
            case 13:
            case 21:
            case 37:
            case 45:
                c = [s.width / 4 * e[0] - 2 * s.s * r[0], s.height / 2 + 3 * s.s];
                drawQuad(this.position);
                break;
            case 14:
            case 20:
            case 36:
            case 46:
                c = [s.width / 4 * e[0] - 4 * s.s * r[0], s.height / 2 + 2 * s.s];
                drawQuad(this.position);
                break;
            case 15:
            case 19:
            case 35:
            case 47:
                c = [s.width / 4 * e[0] - 4 * s.s * r[0], s.height / 2];
                drawQuad(this.position);
                break;
        }  


        function drawQuad(position) {
            var side = Math.floor(position / 8);

            if (s.helpLine) {   // Draws the little guide lines to show the piece behind the edges by translating a tiny bit and drawing that same quad-shape, but in another color
                var t = s.helpLineSize * 0.25;   // The amount it should translate

                push()
                switch (position) {
                    case 0:   // 6 special cases where a piece has two "backsides" (sides not showing)
                    case 24:
                        fill(getColor(44, 12, position));
                        translate(-t * s.s, -0.5 * t * s.s);
                        quad(c[0], c[1], c[0] - 2 * s.s, c[1] - s.s, c[0], c[1] - 2 * s.s, c[0] + 2 * s.s, c[1] - s.s);
                        pop();
                        push();
                        fill(getColor(38, 22, position));
                        translate(t * s.s, -0.5 * t * s.s);
                        quad(c[0], c[1], c[0] - 2 * s.s, c[1] - s.s, c[0], c[1] - 2 * s.s, c[0] + 2 * s.s, c[1] - s.s);
                        break;
                    case 14:
                    case 46:
                        fill(getColor(40, 8, position));
                        translate(-t * s.s, -0.5 * t * s.s);
                        quad(c[0], c[1], c[0], c[1] + 2 * s.s, c[0] - 2 * s.s, c[1] + s.s, c[0] - 2 * s.s, c[1] - s.s);
                        pop();
                        push();
                        fill(getColor(30, 6, position));
                        translate(0, t * s.s);
                        quad(c[0], c[1], c[0], c[1] + 2 * s.s, c[0] - 2 * s.s, c[1] + s.s, c[0] - 2 * s.s, c[1] - s.s);
                        break;
                    case 20:
                    case 36:
                        fill(getColor(26, 2, position));
                        translate(0, t * s.s);
                        quad(c[0], c[1], c[0], c[1] + 2 * s.s, c[0] + 2 * s.s, c[1] + s.s, c[0] + 2 * s.s, c[1] - s.s);
                        pop();
                        push();
                        fill(getColor(34, 18, position));
                        translate(t * s.s, -0.5 * t * s.s);
                        quad(c[0], c[1], c[0], c[1] + 2 * s.s, c[0] + 2 * s.s, c[1] + s.s, c[0] + 2 * s.s, c[1] - s.s);
                        break;
                    case 6:
                    case 30:
                        fill(getColor(46, 14, position));
                        translate(-t * s.s, -0.5 * t * s.s);
                        quad(c[0], c[1], c[0] - 2 * s.s, c[1] - s.s, c[0], c[1] - 2 * s.s, c[0] + 2 * s.s, c[1] - s.s);
                        break;
                    case 31:
                    case 7:
                        fill(getColor(45, 13, position));
                        translate(-t * s.s, -0.5 * t * s.s);
                        quad(c[0], c[1], c[0] - 2 * s.s, c[1] - s.s, c[0], c[1] - 2 * s.s, c[0] + 2 * s.s, c[1] - s.s);
                        break;
                    case 1:
                    case 25:
                        fill(getColor(37, 21, position));
                        translate(t * s.s, -0.5 * t * s.s);
                        quad(c[0], c[1], c[0] - 2 * s.s, c[1] - s.s, c[0], c[1] - 2 * s.s, c[0] + 2 * s.s, c[1] - s.s);
                        break;
                    case 2:
                    case 26:
                        fill(getColor(36, 20, position));
                        translate(t * s.s, -0.5 * t * s.s);
                        quad(c[0], c[1], c[0] - 2 * s.s, c[1] - s.s, c[0], c[1] - 2 * s.s, c[0] + 2 * s.s, c[1] - s.s);
                        break;
                    case 8:
                    case 40:
                        fill(getColor(46, 14, position));
                        translate(-t * s.s, -0.5 * t * s.s);
                        quad(c[0], c[1], c[0], c[1] + 2 * s.s, c[0] - 2 * s.s, c[1] + s.s, c[0] - 2 * s.s, c[1] - s.s);
                        break;
                    case 15:
                    case 47:
                        fill(getColor(47, 15, position));
                        translate(-t * s.s, -0.5 * t * s.s);
                        quad(c[0], c[1], c[0], c[1] + 2 * s.s, c[0] - 2 * s.s, c[1] + s.s, c[0] - 2 * s.s, c[1] - s.s);
                        break;
                    case 12:
                    case 44:
                        fill(getColor(24, 0, position));
                        translate(0, t * s.s);
                        quad(c[0], c[1], c[0], c[1] + 2 * s.s, c[0] - 2 * s.s, c[1] + s.s, c[0] - 2 * s.s, c[1] - s.s);
                        break;
                    case 13:
                    case 45:
                        fill(getColor(31, 7, position));
                        translate(0, t * s.s);
                        quad(c[0], c[1], c[0], c[1] + 2 * s.s, c[0] - 2 * s.s, c[1] + s.s, c[0] - 2 * s.s, c[1] - s.s);
                        break;
                    case 21:
                    case 37:
                        fill(getColor(25, 1, position));
                        translate(0, t * s.s);
                        quad(c[0], c[1], c[0], c[1] + 2 * s.s, c[0] + 2 * s.s, c[1] + s.s, c[0] + 2 * s.s, c[1] - s.s);
                        break;
                    case 22:
                    case 38:
                        fill(getColor(24, 0, position));
                        translate(0, t * s.s);
                        quad(c[0], c[1], c[0], c[1] + 2 * s.s, c[0] + 2 * s.s, c[1] + s.s, c[0] + 2 * s.s, c[1] - s.s);
                        break;
                    case 18:
                    case 34:
                        fill(getColor(36, 20, position));
                        translate(t * s.s, -0.5 * t * s.s);
                        quad(c[0], c[1], c[0], c[1] + 2 * s.s, c[0] + 2 * s.s, c[1] + s.s, c[0] + 2 * s.s, c[1] - s.s);
                        break;
                    case 19:
                    case 35:
                        fill(getColor(35, 19, position));
                        translate(t * s.s, -0.5 * t * s.s);
                        quad(c[0], c[1], c[0], c[1] + 2 * s.s, c[0] + 2 * s.s, c[1] + s.s, c[0] + 2 * s.s, c[1] - s.s);
                        break;
                }
                pop()
            }


            switch (side) {   // Draws the actual piece
                case 0:
                case 3:
                    quad(c[0], c[1], c[0] - 2 * s.s, c[1] - s.s, c[0], c[1] - 2 * s.s, c[0] + 2 * s.s, c[1] - s.s);
                    break;
                case 1:
                case 5:
                    quad(c[0], c[1], c[0], c[1] + 2 * s.s, c[0] - 2 * s.s, c[1] + s.s, c[0] - 2 * s.s, c[1] - s.s);
                    break;
                case 2:
                case 4:
                    quad(c[0], c[1], c[0], c[1] + 2 * s.s, c[0] + 2 * s.s, c[1] + s.s, c[0] + 2 * s.s, c[1] - s.s);
                    break;
            }


            function getColor(targetPosition, altTargetPosition, extend) {
                if (extend >= 24) {
                    targetPosition = altTargetPosition;
                }
                for (var i = 0; i < cube.piece.length; i++) {
                    if (cube.piece[i].position == targetPosition) {
                        return cube.piece[i].color;
                    }
                }
            }
        }
    }


    turn(side, clockwise) {   // Moves the piece in the given direction
        if (clockwise) {   // r will reverse the turn if it is negative
            var r = [1, 1, 0];   // The zeros are for special cases to cancel out position changes, for example, when going from a position from the last piece of the white side to the first of the green
        } else {
            var r = [-1, 0, 1];
        }

        // If the piece is on the same face as the one that is being turned:
        switch (this.position) {
            case side * 8:
            case 1 + side * 8:
                this.position += 2 * r[0] + 8 * r[2];
                break;
            case 2 + side * 8:
            case 3 + side * 8:
            case 4 + side * 8:
            case 5 + side * 8:
                this.position += 2 * r[0];
                break;
            case 6 + side * 8:
            case 7 + side * 8:
                this.position += 2 * r[0] - 8 * r[1];
                break;
        }
        
        
        // If the piece is around the face that is being turned:
        switch (side) {
            case 0:   // U
                switch (this.position) {
                    case 8:   // 44, 16
                        changePosition(this, 44, 16);
                        break;
                    case 9:   // 45, 17
                        changePosition(this, 45, 17);
                        break;
                    case 10:   // 46, 18
                        changePosition(this, 46, 18);
                        break;
                    case 16:   // 8, 36
                        changePosition(this, 8, 36);
                        break;
                    case 17:   // 9, 37
                        changePosition(this, 9, 37);
                        break;
                    case 18:   // 10, 38
                        changePosition(this, 10, 38);
                        break;
                    case 36:   // 16, 44
                        changePosition(this, 16, 44);
                        break;
                    case 37:   // 17, 45
                        changePosition(this, 17, 45);
                        break;
                    case 38:   // 18, 46
                        changePosition(this, 18, 46);
                        break;
                    case 44:   // 36, 8
                        changePosition(this, 36, 8);
                        break;
                    case 45:   // 37, 9
                        changePosition(this, 37, 9);
                        break;
                    case 46:   // 38, 10
                        changePosition(this, 38, 10);
                        break;
                }
                break;
            case 1:   // F
                switch (this.position) {
                    case 4:
                       changePosition(this, 22, 46);
                        break;
                    case 5:
                       changePosition(this, 23, 47);
                        break;
                    case 6:
                       changePosition(this, 16, 40);
                        break;
                    case 16:
                        changePosition(this, 24, 6);
                        break;
                    case 22:
                        changePosition(this, 30, 4);
                        break;
                    case 23:
                        changePosition(this, 31, 5);
                        break;
                    case 24:
                       changePosition(this, 40, 16);
                        break;
                    case 30:
                       changePosition(this, 46, 22);
                        break;
                    case 31:
                       changePosition(this, 47, 23);
                        break;
                    case 40:
                        changePosition(this, 6, 24);
                        break;
                    case 46:
                        changePosition(this, 4, 30);
                        break;
                    case 47:
                        changePosition(this, 5, 31);
                        break;
                }
                break;
            case 2:   // R
                switch (this.position) {
                    case 2:   // 34, 10
                    changePosition(this, 34, 10);
                        break;
                    case 3:   // 35, 11
                    changePosition(this, 35, 11);
                        break;
                    case 4:   // 36, 12
                    changePosition(this, 36, 12);
                        break;
                    case 10:   // 2, 24
                    changePosition(this, 2, 24);
                        break;
                    case 11:   // 3, 25
                    changePosition(this, 3, 25);
                        break;
                    case 12:   // 4, 26
                    changePosition(this, 4, 26);
                        break;
                    case 24:   // 10, 34
                    changePosition(this, 10, 34);
                        break;
                    case 25:   // 11, 35
                    changePosition(this, 11, 35);
                        break;
                    case 26:   // 12, 36
                    changePosition(this, 12, 36);
                        break;
                    case 34:   // 24, 2
                    changePosition(this, 24, 2);
                        break;
                    case 35:   // 25, 3
                    changePosition(this, 25, 3);
                        break;
                    case 36:   // 26, 4
                    changePosition(this, 26, 4);
                        break;
                }
                break;
            case 3:   // D
                switch (this.position) {
                    case 12:
                    changePosition(this, 20, 40);
                        break;
                    case 13:
                    changePosition(this, 21, 41);
                        break;
                    case 14:
                    changePosition(this, 22, 42);
                        break;
                    case 20:
                    changePosition(this, 32, 12);
                        break;
                    case 21:
                    changePosition(this, 33, 13);
                        break;
                    case 22:
                    changePosition(this, 34, 14);
                        break;
                    case 32:
                    changePosition(this, 40, 20);
                        break;
                    case 33:
                    changePosition(this, 41, 21);
                        break;
                    case 34:
                    changePosition(this, 42, 22);
                        break;
                    case 40:
                    changePosition(this, 12, 32);
                        break;
                    case 41:
                    changePosition(this, 13, 33);
                        break;
                    case 42:
                    changePosition(this, 14, 34);
                        break;
                }
                break;
            case 4:   // B
                switch (this.position) {
                    case 0:
                    changePosition(this, 42, 18);
                        break;
                    case 1:
                    changePosition(this, 43, 19);
                        break;
                    case 2:
                    changePosition(this, 44, 20);
                        break;
                    case 18:
                    changePosition(this, 0, 26);
                        break;
                    case 19:
                    changePosition(this, 1, 27);
                        break;
                    case 20:
                    changePosition(this, 2, 28);
                        break;
                    case 26:
                    changePosition(this, 18, 42);
                        break;
                    case 27:
                    changePosition(this, 19, 43);
                        break;
                    case 28:
                    changePosition(this, 20, 44);
                        break;
                    case 42:
                    changePosition(this, 26, 0);
                        break;
                    case 43:
                    changePosition(this, 27, 1);
                        break;
                    case 44:
                    changePosition(this, 28, 2);
                        break;
                }
                break;
            case 5:   // L
                switch (this.position) {
                    case 0:
                    changePosition(this, 8, 32);
                        break;
                    case 6:
                    changePosition(this, 14, 38);
                        break;
                    case 7:
                    changePosition(this, 15, 39);
                        break;
                    case 8:
                    changePosition(this, 30, 0);
                        break;
                    case 14:
                    changePosition(this, 28, 6);
                        break;
                    case 15:
                    changePosition(this, 29, 7);
                        break;
                    case 28:
                    changePosition(this, 38, 14);
                        break;
                    case 29:
                    changePosition(this, 39, 15);
                        break;
                    case 30:
                    changePosition(this, 32, 8);
                        break;
                    case 32:
                    changePosition(this, 0, 30);
                        break;
                    case 38:
                    changePosition(this, 6, 28);
                        break;
                    case 39:
                    changePosition(this, 7, 29);
                        break;
                }
                break;
        }

        function changePosition(self, clockwisePosition, counterClockwisePosition) {   // This is what actually changes the position value of the pieces
            if (clockwise) {
                self.position = clockwisePosition;
            } else {
                self.position = counterClockwisePosition;
            }
        }
    }
}