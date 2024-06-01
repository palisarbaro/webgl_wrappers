import { clearScreen, colors, drawCircle, drawRect, seq, useStyle, makeCanvasTexure } from "./drawing";
import { initGL } from "./init_gl";
import vertex from "./shaders/vertex.vert";
import fragment from "./shaders/fragment.frag";
import { createMakeProgram, createRunProgram } from "./program";
import { uniformTypes } from "./types";
import { getDefaultMouseUniform } from "./defaultUniforms/getDefaultMouseUniform";
const cnv_id = "#cnv"
const source_id = "#source"
const makeRenderProgram = createMakeProgram(vertex, fragment,
    [
        { name: "tx1", type: uniformTypes.sampler2D },
        { name: "tx2", type: uniformTypes.sampler2D },
        getDefaultMouseUniform(document.querySelector("#cnv"), "mouse")
    ],
    []
)
function update(runProgram, { tx1, tx2 }) {
    runProgram({ tx1, tx2 });
}
export function init() {
    let gl = initGL(cnv_id, 900, 600)
    let renderProgram = makeRenderProgram(gl)
    const tx1 = makeCanvasTexure(gl, source_id, 900, 600,
        useStyle(
            { fillStyle: colors.RED },
            seq(clearScreen(colors.WHITE), drawRect(1, 1, 20, 20))
        )
    )
    const tx2 = makeCanvasTexure(gl, source_id, 900, 600,
        useStyle(
            { fillStyle: colors.RED },
            seq(clearScreen(colors.WHITE), drawCircle(21, 21, 20))
        )
    )
    let runRender = createRunProgram(gl, renderProgram)
    setInterval(() => update(runRender, { tx1, tx2 }), 30)
}