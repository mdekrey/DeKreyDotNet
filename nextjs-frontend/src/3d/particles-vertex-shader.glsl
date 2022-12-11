attribute float rotation;
attribute float size;
attribute float time;

varying float vTime;

void main() {
	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

	gl_PointSize = size * 300.0 / -mvPosition.z; // * ( 300.0 / -mvPosition.z );

	// mvPosition.xyz += position * size;

	gl_Position = projectionMatrix * mvPosition;
	vTime = time;
}