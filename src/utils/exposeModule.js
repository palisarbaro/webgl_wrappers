export function exposeModule(modulePromise) {
    modulePromise = new Promise((r) => r(modulePromise))
    modulePromise.then(module => Object.assign(window, module))
}