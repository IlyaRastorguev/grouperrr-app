const { ipcRenderer } = require("electron");
const { config } = require("./events.js");

/**
 * @param {WebGL2RenderingContext} gl
 */
function loadShaders(gl) {
  const shaders = ipcRenderer.sendSync(config.shaders);

  for (const source of shaders) {
    console.log(source);
    const shader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    console.log(shader);

    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS) === false) {
      console.error("shaderLoadingError", gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
    }
  }
}

module.exports = {
  loadShaders,
};
