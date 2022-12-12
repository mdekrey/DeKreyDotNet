
precision highp float;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform int horizontalSprites;
uniform int verticalSprites;


in vec3 position;
in vec2 uv;
in vec3 translate;
in float rotation;
in float size;
in float time;
in float isActive;

out float vActive;
out vec2 vUv;

vec3 rotate(vec3 v, float a) {
	float s = sin(a);
	float c = cos(a);
	mat3 m = mat3(c, -s, 0, s, c, 0, 0, 0, 1);
	return m * v;
}

void main() {
	vActive = isActive;

	vec4 mvPosition = modelViewMatrix * vec4( translate, 1.0 );

	mvPosition.xyz += rotate(position, rotation) * size;
	gl_Position = projectionMatrix * mvPosition;

	int spriteIndex = int( time * float(horizontalSprites * verticalSprites) );
	int xSprite = spriteIndex % horizontalSprites;
	int ySprite = spriteIndex / horizontalSprites;

	vUv = vec2(
		(uv.x + float(xSprite)) / float(horizontalSprites),
		1.0 - (uv.y + float(ySprite)) / float(verticalSprites)
	);

	// vUv = uv;

}