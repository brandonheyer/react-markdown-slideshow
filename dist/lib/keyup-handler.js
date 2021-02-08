const keyupHandler = (numSections, currentSection, decrementIndex, incrementIndex) => (event) => {
    switch (event.key) {
        case "ArrowLeft":
            if (currentSection > 0) {
                decrementIndex();
            }
            break;
        case " ":
        case "ArrowRight":
            if (currentSection !== numSections - 1) {
                incrementIndex();
            }
            break;
    }
};
export default keyupHandler;
//# sourceMappingURL=../../src/lib/keyup-handler.js.map