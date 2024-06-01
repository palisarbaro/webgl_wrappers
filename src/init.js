import { clearScreen, colors, drawCircle, drawRect, seq, useStyle } from "./drawing";
import { exposeModule } from "./utils/exposeModule";
import { initGL, makeCanvasTexure } from "./init_gl";
const cnv_id = "#cnv"
import vertex from "./shaders/vertex.vert"
import fragment from "./shaders/fragment.frag"
import { createMakeProgram, createRunProgram } from "./program"
import { uniformTypes } from "./types";
import { getDefaultMouseUniform } from "./defaultUniforms/getDefaultMouseUniform";




const source_id = "#source"
let t = 0;
const makeRenderProgram = createMakeProgram(vertex, fragment,
    [
        { name: "tx1", type: uniformTypes.sampler2D },
        { name: "tx2", type: uniformTypes.sampler2D },
        getDefaultMouseUniform(document.querySelector("#cnv"),"mouse")
    ],
    [])
function update(runProgram, { tx1, tx2 }) {
    runProgram({ tx1: tx2, tx2: tx1});
    t += 10;
}
export function init() {
    exposeModule(import("./drawing"))
    let gl = initGL(cnv_id, 900, 600)
    let renderProgram = makeRenderProgram(gl)
    const tx1 = makeCanvasTexure(gl, source_id, 900, 600,
        useStyle(
            { fillStyle: colors.RED },
            seq(clearScreen(colors.WHITE), drawRect(100, 100, 20, 20))
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