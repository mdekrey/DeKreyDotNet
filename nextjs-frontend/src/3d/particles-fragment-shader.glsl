
uniform vec3 color;
uniform vec3 emissionColor;
uniform sampler2D pointTexture;
uniform sampler2D emissionTexture;
uniform int horizontalSprites;
uniform int verticalSprites;

varying float vTime;

void main() {
	int spriteIndex = int( vTime * float(horizontalSprites * verticalSprites) );
	int xSprite = spriteIndex % horizontalSprites;
	int ySprite = spriteIndex / horizontalSprites;

	vec2 vUv = vec2(
		(gl_PointCoord.x + float(xSprite)) / float(horizontalSprites),
		1.0 - (gl_PointCoord.y + float(ySprite)) / float(verticalSprites)
	);

	gl_FragColor = vec4( color , 1.0 );
	gl_FragColor = gl_FragColor * texture2D( pointTexture, vUv );
	gl_FragColor = gl_FragColor + vec4( emissionColor, 1.0 ) * texture2D( emissionTexture, vUv );

}
