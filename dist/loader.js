import React, { useState, useEffect, useMemo } from "react";
import MarkdownPresentation from "./markdown-presentation";
import processMarkdown from "./lib/process-markdown";
import combineOptions from "./lib/combine-options";
import initNotesWindow from "./lib/init-notes-window";
const Loader = ({ path, presentationOptions = {} }) => {
    const [sections, setSections] = useState([]);
    const [sectionTags, setSectionTags] = useState([]);
    const [notes, setNotes] = useState([]);
    const [notesWindow, setNotesWindow] = useState(null);
    // Get options with defaults
    const options = useMemo(() => combineOptions(presentationOptions), [presentationOptions]);
    const showNotes = (typeof (options.notesOptions) === "object") ? options.notesOptions.enabled : options.notesOptions;
    // Initialize the notes window
    useEffect(() => {
        initNotesWindow(showNotes, notesWindow, setNotesWindow);
    }, [showNotes]);
    // Process the provided markdown at `path`
    useEffect(() => {
        processMarkdown(path, setSections, setNotes, setSectionTags);
    }, [path]);
    return (React.createElement(MarkdownPresentation, { sections: sections, notes: notes, notesWindow: notesWindow, startingSection: parseInt(window.location.hash.replace("#", ""), 10) || 0, sectionTags: sectionTags }));
};
export default Loader;
//# sourceMappingURL=loader.js.map