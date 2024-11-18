attribute vec4 vPosition;
uniform float userPointSize;

void main() {
    gl_PointSize = userPointSize; 
    gl_Position = vPosition;
}