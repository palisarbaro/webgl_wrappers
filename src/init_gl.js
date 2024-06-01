
/**
 * @returns {WebGL2RenderingContext}
 */
export function makeGL(id, width, height) {
    const cnv = document.querySelector(id);
    Object.assign(cnv, { width, height });
    const gl = cnv.getContext("webgl2");
    return gl
}


export function initGL(cnv_id, width, height) {
    let gl = makeGL(cnv_id, width, height)

    gl.getExtension('EXT_color_buffer_float');
    gl.getExtension('EXT_float_blend');
    gl.getExtension('OES_texture_float_linear');
    gl.viewport(0, 0, width, height);

    return gl
}