#version 300 es

in vec2 position;
out vec2 texCoord;

void main() {
    gl_Position = vec4(position, 0.0f, 1.0f);
    texCoord = 0.5f * (position + 1.0f);
    texCoord.y = 1.0f - texCoord.y;
}