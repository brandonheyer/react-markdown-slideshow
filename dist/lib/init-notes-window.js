const initNotesWindow = (showNotes, notesWindow, setNotesWindow) => {
    if (showNotes) {
        const w = window.open(undefined, "_blank", "toolbar=0,location=0,menubar=0,modal=yes,alwaysRaised=yes,width=500,height=500");
        if (w) {
            setNotesWindow(w);
            w.document.body.setAttribute("style", "background-color: #000000; font-size: 2em; color: #eeeeee; font-family: Helvetica; padding: 5em;");
        }
    }
    else if (notesWindow) {
        notesWindow.close();
        setNotesWindow(null);
    }
};
export default initNotesWindow;
//# sourceMappingURL=init-notes-window.js.map