import { assert } from "./utils/assert";
import { deepFreeze } from "./utils/deepFreeze";

export const uniformTypes = deepFreeze({
    sampler2D: {
        name: "sampler2D",
        bind: (gl, { location, index, name }, value) => {
            assert(value instanceof WebGLTexture, `sampler2D ${name} uniform expects WebGLTexture. Got ${value}`)
            gl.activeTexture(gl["TEXTURE" + index]);
            gl.bindTexture(gl.TEXTURE_2D, value);
            gl.uniform1i(location, index);
        }
    },
    vec: [0, 1, 2, 3, 4].map(d => ({
        name: "vec" + d,
        bind: (gl, { location, name }, value) => {
            assert(value instanceof Array, `vec${d} ${name} uniform expects array. Got: ${value}`)
            assert(value.length == d, `Excpected ${d}-dim array for vec${d} uniform. Got: ${value}`)
            gl["uniform" + d + "f"](location, ...value)
        }
    }))
})