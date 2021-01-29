const initKeyupHandler = (internalKeyupHandler: (event: KeyboardEvent) => void) => {
	const handler = internalKeyupHandler;

	window.document.addEventListener("keyup", handler);

	return () => {
		window.document.removeEventListener("keyup", handler);
	};
}

export default initKeyupHandler;
