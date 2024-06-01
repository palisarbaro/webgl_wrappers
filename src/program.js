import { assert, assertValIsNotNull } from "./utils/assert";

function createCompileShader(source, type) {
    /**
     * @param {WebGL2RenderingContext} gl
     */
    return (gl) => {
        const shader = gl.createShader(gl[type])
        gl.shaderSource(shader, source)
        gl.compileShader(shader)
        const log = gl.getShaderInfoLog(shader);
        if (log) {
            console.log(source + "\nFAILED " + type)
            console.error(log);
            throw new Error()
        }
        else {
            console.log(source + "\nCOMPILED " + type)
        }
        return shader
    }
}

export function createMakeProgram(vertexShaderSource, fragmentShaderSource, uniforms, framebuffers) {
    const shaderDefs = [
        {
            source: vertexShaderSource,
            type: "VERTEX_SHADER",
        },
        {
            source: fragmentShaderSource,
            type: "FRAGMENT_SHADER",
        },
    ];
    const doCompiles = shaderDefs.map(def => createCompileShader(def.source, def.type))
    /**
     * @param {WebGL2RenderingContext} gl
     */
    return (gl) => {
        const program = gl.createProgram()
        doCompiles.map(
            comp => gl.attachShader(program, comp(gl))
        )
        const createLocationAssert = (uni) => assertValIsNotNull(`Can't find uniform ${uni.name} location. Maybe it's not used in shader?`)
        const getUniformDecription = (uni, index) => ({
            ...uni,
            index,
            location: createLocationAssert(uni)(gl.getUniformLocation(program, uni.name)),
        })
        gl.linkProgram(program)
        return {
            program,
            uniform_descriptions: uniforms.map((uni, index) => (getUniformDecription(uni, index))),
            // framebuffer_descriptions: 
        }
    }
}
const vertices = new Float32Array([
    -1.0, 1.0,
    -1.0, -1.0,
    1.0, -1.0,
    -1.0, 1.0,
    1.0, -1.0,
    1.0, 1.0
]);

/**
 * @param {WebGL2RenderingContext} gl
 */
export function createRunProgram(gl, programInstance) {
    const { program, uniform_descriptions } = programInstance
    return (uniforms) => {
        gl.useProgram(program);

        const vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        const positionAttribLocation = gl.getAttribLocation(program, 'position');
        gl.vertexAttribPointer(positionAttribLocation, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(positionAttribLocation);

        for (let uni_descr of uniform_descriptions) {
            let uni_name = uni_descr.name
            let uni_type = uni_descr.type
            let uni_value = uniforms[uni_name]
            assert(uni_value == undefined || typeof uni_descr.getDefaultValue != "function", `${uni_name} ${uni_type.name} uniform is not provided and getDefaultValue function is not provided`)
            uni_type.bind(gl, uni_descr, uni_value || uni_descr.getDefaultValue())
        }

        gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2);
    }
}