
/**
 * @returns {WebGL2RenderingContext}
 */
export function makeGL(id, width, height) {
    const cnv = document.querySelector(id);
    Object.assign(cnv, { width, height });
    const gl = cnv.getContext("webgl2");
    return gl
}
/**
 * @param {WebGL2RenderingContext} gl
 */
export function makeCanvasTexure(gl,id, width, height, draw) {
    const cnv = document.querySelector(id);
    Object.assign(cnv, { width, height });
    const ctx = cnv.getContext('2d');
    draw(ctx)

    let texture = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, cnv);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    return texture
}

export function initGL(cnv_id, width, height) {
    let gl = makeGL(cnv_id, width, height)

    gl.getExtension('EXT_color_buffer_float');
    gl.getExtension('EXT_float_blend');
    gl.getExtension('OES_texture_float_linear');
    gl.viewport(0, 0, width, height);

    return gl
}