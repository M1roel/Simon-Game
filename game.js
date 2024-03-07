var buttonColours = ["red", "blue", "green", "yellow"]; // Array mit den verfügbaren Farben
var gamePattern = []; // Leeres Array zur Speicherung des Spielverlaufs
var userClickedPattern = [];
var level = 0;

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4); // Zufällige Zahl von 0 bis 3 generieren
    var randomChoosenColour = buttonColours[randomNumber]; // Nächste Farbe im Spielverlauf generieren
    gamePattern.push(randomChoosenColour); // Generierte Farbe zum Spielverlauf hinzufügen
    var button = $("#" + randomChoosenColour);
    button.addClass("pressed");
    setTimeout(function() { // Timeout-Funktion, um die Klasse "pressed" nach einer Verzögerung zu entfernen
        button.removeClass("pressed"); // Entfernt die Klasse "pressed" nach 100ms
    }, 100);
    var audio = new Audio("sounds/" + randomChoosenColour + ".mp3");
    audio.play(); // Sound abspielen
    level += 1;
    $("h1").text("Level " + level); // Ändert nach jeder Sequence den H1 Text
}

$(".btn").click(function () { // Event-Handler für den Klick auf einen Button mit der Klasse "btn"
    var buttonColor = $(this).attr("id"); // Farbe des angeklickten Buttons ermitteln
    var audio = new Audio("sounds/" + buttonColor + ".mp3"); // Pfad zur entsprechenden Sounddatei erstellen
    audio.play(); // Sound abspielen
    var button = $(this); // Das angeklickte Element als jQuery-Objekt speichern
    button.addClass("pressed"); // Fügt die Klasse "pressed" zum angeklickten Button hinzu
    setTimeout(function() { // Timeout-Funktion, um die Klasse "pressed" nach einer Verzögerung zu entfernen
        button.removeClass("pressed"); // Entfernt die Klasse "pressed" nach 100ms
    }, 100);
    var userChoosenColour = $(this).attr("id"); // Erfasse den Wert des angeklickten Eingabeelements
    userClickedPattern.push(userChoosenColour);// Führe weitere Aktionen basierend auf userChoosenColour aus
    checkAnswer();
});

var keyPressed = false; // Variable, um den Zustand des Tastendrucks zu verfolgen

$(document).keydown(function(event) {
    if (!keyPressed) { // Überprüfe, ob der Tastendruck bereits erfolgt ist
        keyPressed = true; // Setze den Zustand des Tastendrucks auf true
        nextSequence(); // Führe die Funktion aus
        $("h1").text("Level " + level); // Ändert nach dem Spielstart den H1 Text
    }
});

function checkAnswer() {
    var currentLevel = userClickedPattern.length - 1; // Aktuelle Position im Muster des Benutzers
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() { 
                nextSequence();
                userClickedPattern = [];
            }, 1000); // Fügen Sie hier den Timeout-Wert ein, den Sie benötigen
        }
        return true; // Antwort ist richtig
    } else {
        $("h1").text("Game Over - Press a key to restart")
        var audio = new Audio("sounds/wrong.mp3"); // Pfad zur entsprechenden Sounddatei erstellen
        audio.play(); // Sound abspielen
        $("body").addClass("game-over");
        setTimeout(function() { 
            $("body").removeClass("game-over"); // Entfernen Sie die Klasse nach 200 ms
        }, 200);
        startOver();
        return false; // Antwort ist falsch
    }
}

function startOver() {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    $("h1").text("Press A Key to Start"); // Zurücksetzen des H1-Textes
    keyPressed = false; // Erlaubt einen weiteren Tastendruck, um das Spiel zu starten
}