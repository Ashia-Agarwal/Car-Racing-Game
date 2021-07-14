class Form {
    constructor() {
        this.input = createInput("Name");
        this.button = createButton('Let\'s Play!');
        this.greeting = createElement('h2');
        this.reset = createButton('R E S E T');
    }

    Hide() {
        this.input.hide();
        this.button.hide();
        this.greeting.hide();
    }

    display() {
        var title = createElement('h1').html("Car Racing Game!");
        title.position(displayWidth / 2 - 50, 25);
        title.style("font-size: 250%; font-family: Georgia; background-color: #EABE36; color: white; border: 3px double #F50D8F; padding: 10px;");
        this.input.position(displayWidth / 2 + 50, displayHeight / 2 - 50);
        this.input.style("font-size: 150%; font-family: Times New Roman;");
        this.button.style("font-size: 150%; font-family: Comic Sans MS;");
        this.button.position(displayWidth / 2 + 215, displayHeight / 2);
        this.button.mousePressed(() => {
            this.input.hide();
            this.button.hide();
            playerCount += 1;
            player.name = this.input.value();
            player.index = playerCount;
            player.Update();
            player.Update_Count(playerCount);
            this.greeting.html("Welcome " + player.name + "!");
            this.greeting.position(displayWidth / 2 - 37, displayHeight / 2 - 100);
            this.greeting.style("font-size: 350%; font-family: Lucretia; color: #0DC7A4;");
        });
        this.reset.position(innerWidth - 175, 50);
        this.reset.style("font-size: 150%; font-family: Lucretia;");
        this.reset.mousePressed(() => {
            game.Update_State(0);
            player.Update_Count(0);
            database.ref('/').update({
                Finished_Players: 0
            })
            Player.Delete_Players();
            game.Start();
            this.greeting.hide();
            for(var i = 0;i < cars.length;i++) {
                cars[i].destroy();
            }
        });
    }
}