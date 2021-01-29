const updateNotesWindow = (currentSection, numSections, notesWindow, notes) => {
    if (notesWindow) {
        const html = [
            `<div>Slide ${currentSection + 1}/${numSections}`,
        ];
        if (notes &&
            notes[currentSection] &&
            notes[currentSection].length) {
            html.push(`<div>${notes[currentSection].join("<br />")}</div>`);
        }
        notesWindow.document.body.innerHTML = html.join("");
    }
};
export default updateNotesWindow;
//# sourceMappingURL=update-notes-window.js.map