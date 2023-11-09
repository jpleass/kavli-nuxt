precision mediump float;

uniform sampler2D u_texture;

void main() {
  vec4 color = texture2D(u_texture, v_texCoord);
  
  // Check if the pixel is white (R, G, and B channels are all 1.0)
  if (all(equal(color.rgb, vec3(1.0)))) {
    // Set alpha channel (transparency) to 0 for white pixels
    gl_FragColor = vec4(0, 0, 0, 0);
  } else {
    // For non-white pixels, set alpha channel to 1 (fully opaque)
    // Set color for non-white
    gl_FragColor = vec4(0.952941, 0.694118, 0.505882, 1.0);
  }
}
