const keyupHandler = (numSections: number, currentSection: number, decrementIndex: () => void, incrementIndex: () => void) => (event: KeyboardEvent) => {
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
}

export default keyupHandler;
