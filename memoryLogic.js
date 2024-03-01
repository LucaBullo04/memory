window.onload = function () {
    assignValue();
    hideValues();
    firstPlayerName();
    secondPlayerName();
    nextPlayer();
};

function assignValue() {
    $("button").addClass("hiddenElements");
    const array = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];
    const length = array.length;

    for (let i = 0; i < length; i++) {
        let n = Math.floor(Math.random() * (array.length - 1));
        let value = document.createElement("p");
        let p = document.createElement("p");
        $(p).text("?");
        $(p).addClass("hiddenParagraph");
        $(value).text(array[n]);
        $(value).addClass("values");
        array.splice(n, 1);
        $("#" + (i + 1)).append(p, value);
    }
}

function hideValues() {
    $(".hiddenElements").children("p.hiddenParagraph").show();
    $(".hiddenElements").children("p.values").hide();
    $(".selected").children("p.hiddenParagraph").hide();
    $(".selected").children("p.values").show();
}


const nextPlayer = (function () {
    let checkPlayer = true;
    return function () {
        if (checkPlayer) {
            $("#player1").addClass("myTurn");
            $("#player2").removeClass("myTurn");
            checkPlayer = false;
        } else {
            $("#player2").addClass("myTurn");
            $("#player1").removeClass("myTurn");
            checkPlayer = true;
        }
        return checkPlayer;
    };
})();

const scoreCount = (function () {
    let scorePlayer1 = 0;
    let scorePlayer2 = 0;
    return function (checkPlayer) {
        if (checkPlayer) {
            scorePlayer1++;
            $("#scorePlayer1").text(scorePlayer1);
        } else {
            scorePlayer2++;
            $("#scorePlayer2").text(scorePlayer2);
        }

        let maxScore = scorePlayer1 + scorePlayer2;

        if (maxScore == 9) {
            checkVittoria(scorePlayer1, scorePlayer2);
        }
    };
})();

const checkMatch = (function () {
    try {
        let checkScore = false;

        return function () {
            let hiddenElements = $(".hiddenElements").length;
            let knownElements = $(".selected").children("p.values").text();

            if (hiddenElements < 17) {
                $("button").attr("disabled", true);
                setTimeout(function () {
                    if (knownElements[0] == knownElements[1]) {
                        $("button.selected").text("V");
                        $("button.hiddenElements").css("height", "123px");
                        scoreCount(!checkScore);
                    }
                    $("button").removeClass("selected").addClass("hiddenElements");
                    $("button").attr("disabled", false);
                    hideValues();
                    checkScore = nextPlayer();
                }, 1500);
            }
        };
    } catch (err) {
        console.log(err);
    }
})();

$(document).ready(function () {
    $("button").click(function () {
        if ($(this).text() != "V") {
            $(this).removeClass("hiddenElements").addClass("selected");
            hideValues();
            checkMatch();
        }
    });
});

function checkVittoria(scorePlayer1, scorePlayer2) {
    if (scorePlayer1 > scorePlayer2) {
        $("#player1").css("color", "green");
        $("#player2").css("color", "red");
        setTimeout(function () {
            alert($("#player1").text().toUpperCase() + " WINS WITH " + scorePlayer1 + " POINTS");
            location.reload();
        }, 100);
    } else {
        $("#player2").css("color", "green");
        $("#player1").css("color", "red");
        setTimeout(function () {
            alert($("#player2").text().toUpperCase() + " WINS WITH " + scorePlayer2 + " POINTS");
            location.reload();
        }, 100);
    }
}

function firstPlayerName(){
    let person = window.prompt("PLAYER 1: please insert your name","Player 1");
    $("#player1").text(person.replaceAll(/\s+/g, ""));
}

function secondPlayerName(){
    let person = window.prompt("PLAYER 2: please insert your name","Player 2");
    $("#player2").text(person.replaceAll(/\s+/g, ""));
}
