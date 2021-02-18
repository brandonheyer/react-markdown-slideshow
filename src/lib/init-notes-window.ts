import { WindowSetter } from "../types";

const initNotesWindow = (showNotes: boolean, notesWindow: Window | null, setNotesWindow: WindowSetter) => {
	if (showNotes) {
		const w = window.open(
			undefined,
			"_blank",
			"toolbar=0,location=0,menubar=0,modal=yes,alwaysRaised=yes"
		);

		if (w) {
			setNotesWindow(w);

			w.document.body.setAttribute(
				"style",
				"background-color: #000000; font-size: 1.5em; color: #eeeeee; font-family: Helvetica; padding: 1.5em;"
			);

			const styleChild = w.document.createElement("style");
			styleChild.innerHTML = "div {padding-bottom: 1em; line-height: 2em;}";

			w.document.head.appendChild(styleChild);
		}
	}
	else if (notesWindow) {
		notesWindow.close();
		setNotesWindow(null);
	}
}

export default initNotesWindow;
