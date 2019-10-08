class Config {
    constructor() {
        // Technical stuff
        this.ctx;
        this.width = Math.round(window.innerWidth - 20);
        this.height = Math.round(window.innerHeight - 20);
        this.time = 0;   // Global time, increased 60 (?) times a second


        // Other settings

            // Aesthetical settings        
        this.comicSans = false;          // Changes the font to Comic Sans MS if you are into that sort of thing
        this.stickerless = false;        // If the cube should be drawn without lines in between so it looks like a stickerless cube
        this.darkIcons = false;          // Makes the icons black if true, else white. When a sprite is shown, this.darkIcons is added to the sprite id. If true the id will get increased to a black version of the sprite
        this.helpLines = 0;              // Enabled / Disabled. Draws help lines to show what color the piece is on its backside. Important to not merge with helpLineSize because of how I draw the cube
        this.helpLineSize = 0;           // Changed via an icon in the settings menu:   0 = Help lines disabled, 1 = Thin lines, 2 = Thick lines

            // Size and lengths settings
        this.s = 30;                     // Size when drawing (side of a piece and icons are both 2 * s.s). Note: If increased, increase this.margin too
        this.margin = 8;                 // Length from the canvas border to icons and text
        this.scrambleLength = 25;        // Amount of turns for a scramble

            // Speed and time settings
        this.animationSpeed = 69;        // Amount of frames it takes befor the menu appears / disappears
        this.iconAcceleration = 0.01;    // How quickly an icon accelerates when spun. Do not mess with
        this.scrambleSpeed = 4;          // Amount of frames between each turn when automatically scrambling
        this.turnSpeed = 6;              // Amount of frames between each turn when automatically turning



        // Default color values
        this.defaultColor = [
            [255, 255, 255],   // Up
            [0, 255, 0],       // Front
            [255, 0, 0],       // Right
            [255, 255, 0],     // Down
            [0, 0, 255],       // Back
            [255, 130, 0],     // Left

            [20, 20, 20],      // Background
            [255, 255, 255]    // Text
        ];


        // Color variables
        this.upColor    = [this.defaultColor[0][0], this.defaultColor[0][1], this.defaultColor[0][2]];   // Making this so big is necessary because otherwise the s.upColor would reference the s.defaultColor[0] 
        this.frontColor = [this.defaultColor[1][0], this.defaultColor[1][1], this.defaultColor[1][2]];   // That means you would not be able to reset the color values because they would be connected, I think
        this.rightColor = [this.defaultColor[2][0], this.defaultColor[2][1], this.defaultColor[2][2]];
        this.downColor  = [this.defaultColor[3][0], this.defaultColor[3][1], this.defaultColor[3][2]];
        this.backColor  = [this.defaultColor[4][0], this.defaultColor[4][1], this.defaultColor[4][2]];
        this.leftColor  = [this.defaultColor[5][0], this.defaultColor[5][1], this.defaultColor[5][2]];

        this.background = [this.defaultColor[6][0], this.defaultColor[6][1], this.defaultColor[6][2]];
        this.text       = [this.defaultColor[7][0], this.defaultColor[7][1], this.defaultColor[7][2]];

        
        // Sprite stuff
        this.sprite = [];
        for (var i = 0; i < 26; i++) {
            this.sprite[i] = new Image();
        }

        this.sprite[0].src = "https://imgur.com/FiovJU5.png";    // White Grid
        this.sprite[1].src = "https://imgur.com/5rhP69P.png";    // Black Grid
        this.sprite[2].src = "https://imgur.com/xWKfvmP.png";    // White Scramble
        this.sprite[3].src = "https://imgur.com/rtk8uTe.png";    // Black Scramble
        this.sprite[4].src = "https://imgur.com/Xa1mYpi.png";    // White Undo
        this.sprite[5].src = "https://imgur.com/fmyfJVu.png";    // Black Undo
        this.sprite[6].src = "https://imgur.com/Njx4onS.png";    // White Settings
        this.sprite[7].src = "https://imgur.com/Hw3kHAk.png";    // Black Settings
        this.sprite[8].src = "https://imgur.com/r020ukh.png";    // White Reset
        this.sprite[9].src = "https://imgur.com/z8Or8dq.png";    // Black Reset
        this.sprite[10].src = "https://imgur.com/815KlYR.png";   // White Timer Enabled
        this.sprite[11].src = "https://imgur.com/uFOnYWJ.png";   // Black Timer Enabled
        this.sprite[12].src = "https://imgur.com/7mAiMSw.png";   // White Timer Disabled
        this.sprite[13].src = "https://imgur.com/OZiikJm.png";   // Black Timer Disabled
        this.sprite[14].src = "https://imgur.com/m4POJAb.png";   // White Information
        this.sprite[15].src = "https://imgur.com/Pwq6a8s.png";   // Black Information
        this.sprite[16].src = "https://imgur.com/njqZR3s.png";   // White Color
        this.sprite[17].src = "https://imgur.com/SVJZFb2.png";   // Black Color
        this.sprite[18].src = "https://imgur.com/1md7VMP.png";   // White Plus
        this.sprite[19].src = "https://imgur.com/Fj2tefc.png";   // Black Plus
        this.sprite[20].src = "https://imgur.com/Y6EeG8a.png";   // White Help Lines 0
        this.sprite[21].src = "https://imgur.com/cW47Wt8.png";   // Black Help Lines 0
        this.sprite[22].src = "https://imgur.com/x40z6os.png";   // White Help Lines 1
        this.sprite[23].src = "https://imgur.com/tVBF7hb.png";   // Black Help Lines 1
        this.sprite[24].src = "https://imgur.com/VyTvxZY.png";   // White Help Lines 2
        this.sprite[25].src = "https://imgur.com/BdMBzLh.png";   // Black Help Lines 2
    }
}