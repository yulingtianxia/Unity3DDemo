#pragma strict

static var gameRunning : boolean = false;
var gameTimeAllowed : float = 20.0;
private var gameMessageLabel = "";
private var gameMessageDisplay : Rect;
private var timedOut : boolean = false;
private var gameTimeRemaining : float = gameTimeAllowed;
private var missionCompleted : boolean = false;
private var missionCompleteTime : float = gameTimeAllowed;
var gameMessageFont : Font;
private var playButtonText = "Play";
var gameObjectsToReset : GameObject [];
var intro : Transform;
var fanReactionScript : FanReaction;

function Awake() {
    gameMessageDisplay = Rect(10, 10, Screen.width - 20, 40);
}
function OnGUI() { 
    GUI.skin.font = gameMessageFont;
    GUI.color = Color.yellow;
    GUI.backgroundColor = Color.black;
 
    var text : String = ""; 
    if (missionCompleted) {
        text = String.Format( "{0:00}:{1:00}", parseInt( missionCompleteTime / 60.0 ), parseInt( missionCompleteTime % 60.0 ) );
        gameMessageLabel = "Mission completed in: " + text;
    } else if (timedOut) {
        gameMessageLabel = "Time's up!!";
    } else {
        text = String.Format( "{0:00}:{1:00}", parseInt( gameTimeRemaining / 60.0 ), parseInt( gameTimeRemaining % 60.0 ) );
        gameMessageLabel = "Time left: " + text;
    }
    GUI.Box(gameMessageDisplay, gameMessageLabel);
    // The menu button
    if (!gameRunning) {
        var xPos = Screen.width / 2 - 100;
        var yPos = Screen.height / 2 + 100;
        if( GUI.Button( new Rect( xPos, yPos, 200, 50 ), playButtonText ) ) {
            startGame();
        }
    }    
}
function Update() { 
    if (!gameRunning)
        return; 
 
    // Keep track of time and display a countdown
    gameTimeRemaining -= Time.deltaTime;
    if (gameTimeRemaining <= 0) {
        timedOut = true; 
        gameRunning = false;
        // Play the sound of defeat
        fanReactionScript.playSoundOfVictory(false);
    }
}
function MissionComplete() { 
    if (!gameRunning)
        return;
 
    missionCompleted = true; 
    gameRunning = false;
 	// Play the sound of victory
    fanReactionScript.playSoundOfVictory(true);
    missionCompleteTime =  gameTimeAllowed - gameTimeRemaining;
}
function startGame() {
    // Reset if starting a new game
    gameTimeRemaining = gameTimeAllowed; 
    timedOut = false;
    missionCompleted = false;
 
    // Change button text after the initial run
    playButtonText = "Play Again";
 	
 	// Turn off the intro text
    for (var child : Transform in intro ) {
        child.gameObject.renderer.enabled = false;
    }
    
    // Clean out any enemy objects
    var enemies = GameObject.FindGameObjectsWithTag("Enemy");
    for (var enemy : GameObject in enemies) {
        Destroy ( enemy);
    }
    // Call all game reset methods
    for (var gameObjectReceiver : GameObject in gameObjectsToReset) {
        gameObjectReceiver.SendMessage("resetGame", null, SendMessageOptions.DontRequireReceiver);
    }
 
    // Kick off the game
    gameRunning = true;
}