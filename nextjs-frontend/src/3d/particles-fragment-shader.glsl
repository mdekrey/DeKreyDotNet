
precision highp float;
#define gl_FragColor pc_fragColor
layout(location = 0) out highp vec4 pc_fragColor;

uniform sampler2D pointTexture;
uniform vec3 emissionColor;
uniform sampler2D emissionTexture;

in vec2 vUv;
in float vActive;

// HSL to RGB Convertion helpers
vec3 HUEtoRGB(float H){
	H = mod(H,1.0);
	float R = abs(H * 6.0 - 3.0) - 1.0;
	float G = 2.0 - abs(H * 6.0 - 2.0);
	float B = 2.0 - abs(H * 6.0 - 4.0);
	return clamp(vec3(R,G,B),0.0,1.0);
}

vec3 HSLtoRGB(vec3 HSL){
	vec3 RGB = HUEtoRGB(HSL.x);
	float C = (1.0 - abs(2.0 * HSL.z - 1.0)) * HSL.y;
	return (RGB - 0.5) * C + HSL.z;
}

void main() {
	if ( vActive <= 0. ) discard;

	vec4 diffuseColor = texture( pointTexture, vUv );

	if ( diffuseColor.w == 0. ) discard;
	gl_FragColor = diffuseColor + vec4( emissionColor, 1.0 ) * texture( emissionTexture, vUv );
}
