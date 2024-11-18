in vec3 vPosition;

out vec3 color;

void main() 
{
    gl_Position = vec4(vPosition, 1.0);
    color = vec3(vPosition.x + 0.5, 1.0, vPosition.y + 0.5);
}