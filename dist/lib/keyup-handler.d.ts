declare const keyupHandler: (numSections: number, currentSection: number, decrementIndex: () => void, incrementIndex: () => void) => (event: KeyboardEvent) => void;
export default keyupHandler;
