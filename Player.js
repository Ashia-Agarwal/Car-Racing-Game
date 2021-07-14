class Player {
    constructor() {
        this.name = "";
        this.distance = 0;
        this.index = 0;
        this.xpos = 0;
        this.rank = 0;
    }

    Get_Count() {
        database.ref("Player_Count").on("value", (data) => {
            playerCount = data.val()
        });
    }

    static Get_Player_Info() {
        database.ref("Players").on("value", (data) => {
            allplayers = data.val();// allplayers = [[name: ___, distance: ___], [], []] //
        });
    }

    Get_Finished_Players() {
        database.ref("Finished_Players").on("value", (data) => {
            finished = data.val();// allplayers = [[name: ___, distance: ___], [], []] //
        });
    }

    static Update_Finished_Players() {
        database.ref("/").update({'Finished_Players' : finished + 1});
        this.rank += 1;
    }

    Update() {
        var r = "Players/Player" + this.index;
        database.ref(r).set({Name : this.name, Distance : this.distance, X_Pos: this.xpos, Rank: this.rank});
    }

    Update_Count(c) {
        database.ref("/").update({'Player_Count' : c});
    }

    static Delete_Players() {
        database.ref("Players").set('');
    }
}