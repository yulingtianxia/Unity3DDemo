#pragma strict

var projectile : Rigidbody;
var speed = 5;
var maxObstacles = 2;
var launchInterval : float = 5.0;
var target : Transform;
private var nextLaunch : float = 0.0;
private var numObstaclesLaunched = 0;
function Start () {
    if (target == null) {
        // Find the player transform
        target = GameObject.FindGameObjectWithTag("Player").transform;
    }
}
function Update () {
	if (GameController != null && !GameController.gameRunning)
       	return;
    if ((numObstaclesLaunched < maxObstacles) && (Time.time > nextLaunch)) {
        // Set up the next launch time
        nextLaunch = Time.time + launchInterval;
 
        // Set up for launch direction
        var hit : RaycastHit;
        var ray : Ray;
        var hitDistance : float;
 
        // Instantiate the projectile
        var instantiatedProjectile : Rigidbody = Instantiate(projectile, transform.position, transform.rotation);
 
        // Simple block, try to get in front of the player
        instantiatedProjectile.velocity = target.TransformDirection(Vector3.forward * speed);     
 
        // Increment the launch count
        numObstaclesLaunched++;   
    }
}
function resetGame() {
    // Reset to original data
    numObstaclesLaunched = 0;
}