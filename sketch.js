var database;
var allplayers;
var player, form, game, state = 0, playerCount, obGroup, finished = 0, flag = true, passedfinish;
var c1, c2, c3, c4, cars, c1img, c2img, c3img, c4img;
var trackimg, groundimg, obstacleimg;
var mov, slid;
var goldimg, silverimg, bronzeimg;

function preload() {
    c1img = loadImage("images/car1.png");
    c2img = loadImage("images/car2.png");
    c3img = loadImage("images/car3.png");
    c4img = loadImage("images/car4.png");
    trackimg = loadImage("images/track.jpg");
    groundimg = loadImage("images/ground.png");
    obstacleimg = loadImage("images/spill.png");
    goldimg = loadImage("images/gold.png");
    silverimg = loadImage("images/silver.png");
    bronzeimg = loadImage("images/bronze.png");
    mov = loadSound("sounds/car_moving.mp3");
    slid = loadSound("sounds/car_sliding.mp3");
}

function setup() {
    createCanvas(innerWidth - 43, innerHeight - 45);
    database = firebase.database();
    game = new Game();
    obGroup = createGroup();
    game.Get_State();
    game.Start();
    for(var i = 0;i < 10;i++) {
        var obx = random(250, 1000);
        var oby = random(-height*4, 3560);
        var obstacle = createSprite(obx, oby, 50, 50);
        obstacle.addImage("spill", obstacleimg);
        obstacle.scale = 1.5;
        obGroup.add(obstacle);
    }
}

function draw() {
    background("white");
    player.Get_Count();
    if(playerCount == 4 && state == 0) {
        game.Update_State(1);
        game.Get_State();
    }
    if(state === 1) {
        clear();
        game.Play();
    } else {
        background("#F04D4D");
    }
    if(finished === 4) {
        game.Update_State(2);
        clear();
    }
    if(state === 2 && finished == 4) {
        game.Leaderboard();
        console.log("Leaderboard");
    }
}