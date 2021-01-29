import { Notes } from "../types";

const updateNotesWindow = (currentSection: number, numSections: number, notesWindow?: Window | null, notes?: Notes) => {
	if (notesWindow) {
		const html = [
			`<div>Slide ${currentSection + 1}/${numSections}`,
		];

		if (
			notes &&
			notes[currentSection] &&
			notes[currentSection].length
		) {
			html.push(`<div>${notes[currentSection].join("<br />")}</div>`);
		}

		notesWindow.document.body.innerHTML = html.join("");
	}
}

export default updateNotesWindow;
