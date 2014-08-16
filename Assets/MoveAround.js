#pragma strict

var speed : float = 30.0;
var rotateSpeed : float = 3.0;
var moveJoystick : Joystick;
var rotateJoystick : Joystick;
var originalPosition : Vector3;
var originalRotation : Quaternion;
function Awake() {
    originalPosition = transform.position;
    originalRotation = transform.rotation;
}
function resetGame() {
    // Reset to original position
    transform.position = originalPosition;
    transform.rotation = originalRotation;
}
function Update () {
	if (GameController != null && !GameController.gameRunning)
       return;
    var controller : CharacterController = GetComponent(CharacterController);
    // Rotate around y - axis
    var rotatePos = Input.GetAxis ("Horizontal") ? 
                       Input.GetAxis ("Horizontal") : joyStickInput(rotateJoystick);
    transform.Rotate(0, rotatePos * rotateSpeed, 0);
 
    // Move forward / backward
    var forward : Vector3 = transform.TransformDirection(Vector3.forward);
    var movePos = Input.GetAxis ("Vertical") ? 
                     Input.GetAxis ("Vertical") : joyStickInput(moveJoystick);
    var curSpeed = speed * movePos;
    controller.SimpleMove(forward * curSpeed);
}
function joyStickInput (joystick : Joystick) {
    var absJoyPos = Vector2 (Mathf.Abs(joystick.position.x),
                                   Mathf.Abs(joystick.position.y));
    var xDirection = (joystick.position.x > 0) ? 1 : -1;
    var yDirection = (joystick.position.y > 0) ? 1 : -1;
    return ( ( absJoyPos.x > absJoyPos.y) ? absJoyPos.x * xDirection : absJoyPos.y * yDirection);
}
@script RequireComponent(CharacterController)