#version 300 es

precision highp float;
in vec2 texCoord;
out vec4 fragColor;
uniform sampler2D tx1;
uniform sampler2D tx2;
uniform vec2 mouse;

void main() {
    //  vec4(texCoord,1.0f, 1.0f);
    vec2 shift = mouse;
    vec4 r = texture(tx1, texCoord-shift);
    fragColor = (texture(tx2, texCoord) + r.yxzw)/2.;
    // fragColor.y=fragColor.x;
}