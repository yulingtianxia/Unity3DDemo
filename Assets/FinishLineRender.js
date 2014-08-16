#pragma strict

// The finish line posts
var post1 : Transform;
var post2 : Transform;
var lineColor : Color = Color.green;
function Start () {
    // Set the visual for the finish line posts
    var lineRenderer : LineRenderer = gameObject.AddComponent(LineRenderer);
    lineRenderer.SetPosition(0, post1.position);
    lineRenderer.SetPosition(1, post2.position);
    lineRenderer.material = new Material (Shader.Find("Particles/Additive"));
    lineRenderer.SetColors(lineColor, lineColor);
}