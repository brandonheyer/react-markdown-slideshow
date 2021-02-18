const makeTime = (time) => {
    const minuteValue = Math.floor(time / 1000 / 60);
    let minutes = minuteValue + "";
    let seconds = Math.floor(time / 1000) - (minuteValue * 60) + "";
    if (minutes.length < 2) {
        minutes = `0${minutes}`;
    }
    if (seconds.length < 2) {
        seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
};
const updateNotesWindow = (currentSection, numSections, notesWindow, notes, ellapsedTime) => {
    if (notesWindow) {
        const header = [
            "<header>",
            `<div>Slide ${currentSection + 1}/${numSections}</div>`,
            ellapsedTime ? `<div>${makeTime(ellapsedTime)}</div>` : "",
            "</header>",
        ];
        const html = [
            header.join("")
        ];
        if (notes &&
            notes[currentSection] &&
            notes[currentSection].length) {
            html.push(`<div>${notes[currentSection].join("</div><div>").replace(/\n/g, "<br />")}</div>`);
        }
        if (notesWindow.timerHandle) {
            clearTimeout(notesWindow.timerHandle);
        }
        notesWindow.timerHandle = setTimeout(() => {
            updateNotesWindow(currentSection, numSections, notesWindow, notes, (ellapsedTime || 0) + 1000);
        }, 1000);
        notesWindow.document.body.innerHTML = html.join("");
    }
};
export default updateNotesWindow;
//# sourceMappingURL=../../src/lib/update-notes-window.js.map