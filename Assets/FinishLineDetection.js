#pragma strict
var gameControllerScript : GameController;
function OnTriggerEnter(other : Collider) {
 
    if (other.gameObject.tag == "Player") 
    { 
        Debug.Log("You made it!!!"); 
        gameControllerScript.MissionComplete();
    } 
}
@script RequireComponent(Collider)