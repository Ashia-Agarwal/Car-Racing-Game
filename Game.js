class Game {
    constructor(){}

    Get_State() {
        database.ref("Game_State").on("value", (data) => {
            state = data.val()
        });
    }

    Update_State(g) {
        database.ref("/").update({'Game_State': g});
    }

    async Start() {
        if(state === 0) {
            player = new Player();
            var playerRef = await database.ref("Player_Count").once("value");
            if(playerRef.exists()) {
                playerCount = playerRef.val();
                player.Get_Count();
            }
            form = new Form();
            form.display();
            c1 = createSprite(250, 200);
            c1.addImage(c1img);
            c2 = createSprite(500, 200);
            c2.addImage(c2img);
            c3 = createSprite(750, 200);
            c3.addImage(c3img);
            c4 = createSprite(1000, 200);
            c4.addImage(c4img);
            cars = [c1, c2, c3, c4];
        }
        passedfinish = false;
    }

    Play() {
        form.Hide();
        Player.Get_Player_Info();
        this.Track();
        player.Get_Finished_Players();
        if(allplayers !== undefined) {
            var index = 0, x = 0;
            for(var plr in allplayers) {
                index += 1;
                x = (index*250) + allplayers[plr].X_Pos;
                cars[index - 1].x = x;
                cars[index - 1].y = innerHeight - allplayers[plr].Distance;
                if(index === player.index) {
                    cars[index-1].x += player.xpos;
                    ellipseMode(CENTER);
                    fill("red");
                    ellipse(cars[index - 1].x, cars[index - 1].y, 90);
                    fill("white");
                    strokeWeight(5);
                    text(player.name, cars[index - 1].x - 15, cars[index - 1].y - 65);
                    camera.position.x = displayWidth/2;
                    camera.position.y = cars[index - 1].y;
                    if(cars[index - 1].isTouching(obGroup)) {
                        flag = false;
                        slid.play();
                    } else {
                        flag = true;
                    }
                    if(player.distance > 3560 && passedfinish === false) {
                        Player.Update_Finished_Players();
                        player.rank = finished;
                        player.Get_Finished_Players();
                        player.Update();
                        passedfinish = true;
                    }
                }
            }
        }
        if(player.distance <= 3560) {
            this.Navigation();
        }
        drawSprites();
    }

    Leaderboard() {
        form.Hide();
        //background("#F04D4E");
        camera.position.y = 0;
        camera.position.x = 0;
        image(bronzeimg, displayWidth/-4 - 150, -200 + displayHeight/9, 200, 240);
        image(silverimg, displayWidth/4 - 150, -200 + displayHeight/10, 225, 270);
        image(goldimg, -150, -225, 250, 300);
        Player.Get_Player_Info();
        fill(0);
        textAlign(CENTER);
        textSize(25);
        for(var plr in allplayers) {
            if(allplayers[plr].Rank == 1) {
                text(allplayers[plr].Name, -15, 100);
                console.log("1");
            } else if(allplayers[plr].Rank == 2) {
                text(allplayers[plr].Name, displayWidth/4 - 25, displayHeight/9 + 100);
            } else if(allplayers[plr].Rank == 3) {
                text(allplayers[plr].Name, displayWidth/-4 - 40, displayHeight/10 + 100);
            } else if(allplayers[plr].Rank == 4) {
                text("Honorable Mention - " + allplayers[plr].Name, -25, 250);
            }
        }
    }

    Track() {
        image(groundimg, -200, displayHeight, displayWidth + 400, displayHeight + 250);
        image(trackimg, -200, (-displayHeight) * 4, displayWidth + 400, displayHeight * 5);
    }

    Navigation() {
        if(keyDown(38) && player.index != null) {//Up Arrow//
            if(flag)
                player.distance += 50;
            else
                player.distance += 10;
            player.Update();
        }
        if(keyDown(37) && player.index != null) {//Left Arrow//
            player.xpos -= 50;
            mov.play();
            player.Update();
        }
        if(keyDown(39) && player.index != null) {//Right Arrow//
            player.xpos += 50;
            mov.play();
            player.Update();
        }
        if(keyDown(40) && player.index != null && player.distance > 0) {//Down Arrow//
            if(flag)
                player.distance -= 50;
            else
                player.distance -= 10;
            player.Update();
        }
    }
}