export const colors = {
    RED: "#ff0000",
    WHITE: "#ffffff"
}
function pushStyle(ctx, { fillStyle }) {
    let prev = {
        fillStyle: ctx.fillStyle
    }
    if (fillStyle) {
        ctx.fillStyle = fillStyle
    }
    return function pop() {
        Object.assign(ctx, prev)
    }
}
export function useStyle(style, draw) {
    return (ctx) => {
        const pop = pushStyle(ctx, style)
        draw(ctx)
        pop();
    }
}
export function seq(...arr) {
    return (ctx) => {
        arr.forEach((f) => f(ctx))
    }
}
export function getSize(ctx) {
    return [ctx.canvas.width, ctx.canvas.height]
}
export function ctxEnv(draw) {
    return (ctx) => {
        draw(ctx)(ctx)
    }
}
export function sizeEnv(draw) {
    return ctxEnv(ctx => draw(getSize(ctx)))
}
export function clearScreen(color) {
    return useStyle({ fillStyle: color },
        sizeEnv((size) => drawRect(0, 0, ...size))
    )
}
export function arrayArgs(f) {
    return (...args) => {
        return args[0] instanceof Array ?
            f(...args[0]) : f(...args)
    }
}
function _drawRect(...coords) {
    return (ctx) => {
        ctx.beginPath();
        ctx.rect(...coords);
        ctx.fill();
    }
}
function _drawCircle(x, y, r) {
    return (ctx) => {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI, false);
        ctx.fill();
    }
}
export const drawRect = arrayArgs(_drawRect)
export const drawCircle = arrayArgs(_drawCircle)


/**
 * @param {WebGL2RenderingContext} gl
 */
export function makeCanvasTexure(gl, id, width, height, draw) {
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