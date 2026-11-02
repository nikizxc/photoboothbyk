const vertex = `
  in vec2 aPosition;
  out vec2 vTextureCoord;

  uniform vec4 uInputSize;
  uniform vec4 uOutputFrame;
  uniform vec4 uOutputTexture;

  vec4 filterVertexPosition(void) {
    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0 * uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;
    return vec4(position, 0.0, 1.0);
  }

  vec2 filterTextureCoord(void) {
    return aPosition * (uOutputFrame.zw * uInputSize.zw);
  }

  void main(void) {
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
  }
`;

import { Filter, GlProgram } from "pixi.js";

const vintageFragment = `
  in vec2 vTextureCoord;
  out vec4 finalColor;

  uniform sampler2D uTexture;
  uniform float uContrast;
  uniform float uVignette;
  uniform float uGrain;

  float rand(vec2 co) {
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec4 c = texture(uTexture, vTextureCoord);
    vec3 rgb = c.a > 0.0 ? c.rgb / c.a : c.rgb;

    // to grayscale, then deepen shadows
    float g = dot(rgb, vec3(0.299, 0.587, 0.114));
    g = clamp((g - 0.5) * uContrast + 0.5 - 0.06, 0.0, 1.0);
    g = pow(g, 1.15);

    // 3-tone brown palette: shadows, mids, highlights
    vec3 shadow = vec3(0.05, 0.03, 0.02);
    vec3 mid    = vec3(0.45, 0.32, 0.22);
    vec3 light  = vec3(0.90, 0.80, 0.66);
    vec3 col = g < 0.5
      ? mix(shadow, mid, g * 2.0)
      : mix(mid, light, (g - 0.5) * 2.0);

    // vignette
    float d = length(vTextureCoord - 0.5);
    col *= 1.0 - uVignette * smoothstep(0.25, 0.8, d);

    // film grain
    col += (rand(vTextureCoord * 900.0) - 0.5) * uGrain;

    col = clamp(col, 0.0, 1.0);
    finalColor = vec4(col * c.a, c.a);
  }
`;

const makeVintage = () =>
  new Filter({
    glProgram: GlProgram.from({ vertex, fragment: vintageFragment }),
    resources: {
      vintageUniforms: {
        uContrast: { value: 1.25, type: "f32" },
        uVignette: { value: 0.7, type: "f32" },
        uGrain: { value: 0.1, type: "f32" },
      },
    },
  });

export { makeVintage };
