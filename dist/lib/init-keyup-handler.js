const initKeyupHandler = (internalKeyupHandler) => {
    const handler = internalKeyupHandler;
    window.document.addEventListener("keyup", handler);
    return () => {
        window.document.removeEventListener("keyup", handler);
    };
};
export default initKeyupHandler;
//# sourceMappingURL=../../src/lib/init-keyup-handler.js.map