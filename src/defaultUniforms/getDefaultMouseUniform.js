import { uniformTypes } from "../types";

export function getDefaultMouseUniform(element, name = "mouse") {
    let pos = [0, 0];
    const getDefaultValue = () => pos;
    element.addEventListener('mousemove', e => {
        const rect = element.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const normalizedMouseX = mouseX / rect.width;
        const normalizedMouseY = mouseY / rect.height;

        pos = [normalizedMouseX, normalizedMouseY]
    });
    return { name, type: uniformTypes.vec[2], getDefaultValue }
}