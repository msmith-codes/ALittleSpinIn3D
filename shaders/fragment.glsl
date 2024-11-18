in vec3 color;

out vec4 fragColor;

void main() 
{
    gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
    fragColor = vec4( color, 1.0 );
}