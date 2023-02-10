// Rubik's Cube Simulator        // (c) Copyright OneZeroWasTaken 2018
var s = new Config();           // Settings
var cube = new Cube();         // Holds all piece objects and other cube related properties and methods
var menu = new Menu();        // Haha yes. Menu stuff and also holds the icon objects
var timer = new Timer();     // Timer methods and properties
var c;                      // Current position. Moves with each piece when drawing them
var shift;                 // Is true while the shift key is down. Used for turning counter-clockwise and some icon stuff


function setup() {
    createCanvas(s.width, s.height);
    background(s.background);
    s.ctx = document.getElementById("defaultCanvas0").getContext("2d");   // Because p5 image stuff is a fucking mess

    cube.drawCenters();
    cube.draw();
    menu.grid.update();   // Draws the menu button
}


function draw() {   // Updates stuff that needs to be updated
    s.time++;   // For timing stuff
    shift = keyIsDown(16);   // Updates if shift is being held down
    menu.draw();

    if (cube.scrambling && s.time % s.scrambleSpeed == 0) {   // Scrambles the cube if it should get scrambled
        cube.scramble_();
    }

    if (cube.autoTurn.length > 0 && s.time % s.turnSpeed == 0) {   // If there are moves stored in autoTurn, follow those instructions
        cube.turn(cube.autoTurn[0][0], cube.autoTurn[0][1], false);
        cube.autoTurn.splice(0, 1);
    }

    if (menu.rgb[0] >= 0) {   // If menu.rgb is defined, draw the color sliders
        menu.drawColorSliders();
    }
}


function keyPressed() {   // Handles every key press
    if (cube.scrambling || menu.colorSettings) {   // No key inputs while the cube is scrambling or when the color setting overlay is enabled
        return;
    }

    switch (keyCode) {
        case 85:   // U
            cube.turn(0, !shift, true);
            break;
        case 70:   // F
            cube.turn(1, !shift, true);
            break;
        case 82:   // R
            cube.turn(2, !shift, true);
            break;
        case 68:   // D
            cube.turn(3, !shift, true);
            break;
        case 66:   // B
            cube.turn(4, !shift, true);
            break;
        case 76:   // L
            cube.turn(5, !shift, true);
            break;
    }

    if (!timer.running && (keyCode == 85 || keyCode == 70 || keyCode == 82 || keyCode == 68 || keyCode == 66 || keyCode == 76)) {   // Starts the timer after the first input
        timer.start();
    }
}


function mouseClicked() {   // Handles every mouseclick
    if (iconClicked(menu.grid)) {   // When the menu button has been clicked:
        if ((menu.state == 0 || menu.state == -1) && !menu.enabled) {   // Enable the menu and start the animation of the grid
            menu.state = 1;
            menu.grid.rotationType = 180;
        } else {   // Else, disable the menu(s) and start an animation in the other direction
            menu.state = -1;
            menu.settingsEnabled = false;
            menu.grid.rotationType = -180;
            if (menu.settingsAnimation) {
                menu.settingsState = -1;
            }

            menu.colorSettings = false;
            menu.drawColorSettings(true);
        }
    }

    if (menu.enabled) {   // Find out what icon was pressed (if any) and do stuff depending on that
        // // Reset icon
        if (iconClicked(menu.reset)) {
            if (shift) {   // Hard reset
                menu.resetColor(0, 8);
                menu.checkIconColor(6);
                background(s.background);
                cube.drawCenters();
                menu.redrawIcons();
                menu.text = false;
                menu.textState = 0;
            }

            menu.reset.rotationType = -360;
            cube.scramble = [];
            cube.scrambling = 0;
            cube.solve(true);
            timer.reset();
            menu.drawColorSettings(true);

            strokeWeight(0);   // Cover up scramble
            fill(s.background);
            rect(0, s.height - 3 * s.s - s.margin, s.width, 2 * s.s + 2);   // + 2 because of anti-aliasing on the text

        // // Scramble icon
        } else if (iconClicked(menu.scramble)) {
            strokeWeight(0);   // Cover up previous scramble
            fill(s.background);
            rect(0, s.height - 3 * s.s - s.margin, s.width, 2 * s.s + 2);

            menu.drawColorSettings(true);
            menu.scramble.rotationType = 360;

            if (!shift) {   // Solve the cube instantly and start a new scramble
                cube.solve(true);
                cube.scramble = [];
                cube.scrambling = s.scrambleLength;
                cube.redo = [];
            } else {   // Else, go through every previous move until solved
                cube.solve(false);
            }
            timer.reset();

        // // Undo icon
        } else if (iconClicked(menu.undo)) {
            if (!shift && cube.turnHistory.length > 0) {
                menu.undo.rotationType = -360;
                cube.redo.push([cube.turnHistory[cube.turnHistory.length - 1][0], cube.turnHistory[cube.turnHistory.length - 1][1]]);   // Saves undo moves in cube.redo
                cube.turn(cube.turnHistory[cube.turnHistory.length - 1][0], !cube.turnHistory[cube.turnHistory.length - 1][1], false);   // Inverts clockwise to reverse the move
                cube.turnHistory.splice(cube.turnHistory.length - 1, 1);

            } else if (shift && cube.redo.length > 0) {
                menu.undo.rotationType = 360;
                cube.turn(cube.redo[cube.redo.length - 1][0], !cube.redo[cube.redo.length - 1][0], true);
                cube.redo.splice(cube.redo.length - 1, 1);
            }

        // // Setting icon
        } else if (iconClicked(menu.setting)) {
            if (menu.settingsEnabled) {
                menu.setting.rotationType = 360;

                menu.colorSettings = false;
                menu.drawColorSettings(true);
            } else {
                menu.setting.rotationType = -360;
            }
            if ((menu.settingsState == 0 || menu.settingsState == -1) && !menu.settingsEnabled) {
                menu.settingsState = 1;
            } else {
                menu.settingsState = -1;
            }

        // // Timer icon
        } else if (iconClicked(menu.timer)) {
            menu.timer.rotationType = -360;

            if (timer.enabled) {
                timer.enabled = false;
                timer.stop();
                menu.timer.sprite += 2;
            } else {
                timer.enabled = true;
                menu.timer.sprite -= 2;
            }
            timer.draw();
        
        // // Help line icon
        } else if (iconClicked(menu.helpLine)) {
            s.helpLineSize++;
            s.helpLine = true;
            menu.helpLine.sprite += 2;
            if (s.helpLineSize == 3) {
                s.helpLineSize = 0;
                s.helpLine = false;
                menu.helpLine.sprite -= 6;

                background(s.background);
                menu.redrawIcons();
                cube.drawCenters();
                cube.draw();
                if (menu.colorSettings) {
                    menu.drawColorSettings();
                }
            }
            menu.helpLine.update();
            cube.draw();

        // // Color icon
        } else if (iconClicked(menu.color)) {
            menu.colorSettings = !menu.colorSettings;
            if (menu.colorSettings) {
                menu.color.rotationType = 360;
                menu.drawColorSettings();
            } else {
                menu.color.rotationType = -360;
                menu.drawColorSettings(true);
            }

        // // Info icon
        } else if (iconClicked(menu.info)) {
            menu.info.rotationType = 360;
            menu.textState++;
            if (menu.textState == 3) {
                menu.textState = 0;
                menu.text = false;
            } else {
                menu.text = true;
            }
            menu.updateText();
        }
        
        else if (menu.colorSettings && mouseY >= s.height - s.s - 2 * s.margin && mouseY <= s.height) {   // If a color was pressed in the color settings overlay
            menu.colorSelect();
        }
    }
}


function iconClicked(icon) {   // Finds out if the given icon was pressed or not
    if (mouseX > icon.x && mouseY > icon.y && mouseX < icon.x + 2 * s.s && mouseY < icon.y + 2 * s.s) {
        return true;
    }
    return false;
}


function mouseWheel(value) {   // Changes the value of the color-setting-sliders, only if they are showing (if menu.rgb is not undefined, checked first in the first if-statement)
    if (menu.rgb[0] >= 0 && mouseY > s.height - 8 * s.s - s.s / 1.9 && mouseY < s.height - 3 * s.s - 2 * s.margin) {   // Also checks if the mouse is in the correct y-value range
        if (value.delta > 0) {   // Scroll down
            var scroll = -5;
        } else if (value.delta < 0) {   // Scroll up
            var scroll = 5;
        }

        if (mouseX > s.width / 2 - 1.6 * s.s - s.s / 2 && mouseX < s.width / 2 - 0.45 * s.s - s.s / 2 && menu.rgb[0] + scroll <= 255 && menu.rgb[0] + scroll >= 0) {
            changeColor(menu.colorSelected, 0, scroll);
        } else if (mouseX > s.width / 2 - 0.45 * s.s - s.s / 2 && mouseX < s.width / 2 + 0.45 * s.s + s.s / 2 && menu.rgb[1] + scroll <= 255 && menu.rgb[1] + scroll >= 0) {
            changeColor(menu.colorSelected, 1, scroll);
        } else if (mouseX > s.width / 2 + 0.45 * s.s + s.s / 2 && mouseX < s.width / 2 + 1.6 * s.s + s.s / 2 && menu.rgb[2] + scroll <= 255 && menu.rgb[2] + scroll >= 0) {
            changeColor(menu.colorSelected, 2, scroll);
        } else {   // If no change occured, return - no redraws needed
            return;
        }

        if (menu.colorSelected == 6) {
            background(s.background);
            menu.redrawIcons();
        }
        cube.draw();
        cube.drawCenters();
        menu.checkIconColor(menu.colorSelected);
        menu.drawColorSettings();
    }
}


function changeColor(colorID, rgb, amount) {   // Changes a color by a given amount (without updating the canvas)
    switch (colorID) {
        case 0:
            s.upColor[rgb] += amount;
            break;
        case 1:
            s.frontColor[rgb] += amount;
            break;
        case 2:
            s.rightColor[rgb] += amount;
            break;
        case 3:
            s.downColor[rgb] += amount;
            break;
        case 4:
            s.backColor[rgb] += amount;
            break;
        case 5:
            s.leftColor[rgb] += amount;
            break;
        case 6:
            s.background[rgb] += amount;
            break;
        case 7:
            s.text[rgb] += amount;
    }
}

function rand(min, max) {   // Randomization function I totaly made myself
	return Math.round(Math.random() * (max - min) + min);
}
