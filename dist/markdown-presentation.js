import React, { useCallback, useState, useEffect, } from "react";
import initKeyupHandler from "./lib/init-keyup-handler";
import keyupHandler from "./lib/keyup-handler";
import updateNotesWindow from "./lib/update-notes-window";
const updateIndex = (change, current, setCurrentSection) => () => {
    setCurrentSection({ index: current.index + change });
    window.location.hash = `#${current.index + change}`;
};
const MarkdownPresentation = ({ notes, notesWindow, sections, sectionTags = [], startingSection = 0, }) => {
    const [currentSection, setCurrentSection] = useState({
        index: startingSection,
    });
    const incrementIndex = useCallback(updateIndex(1, currentSection, setCurrentSection), [currentSection]);
    const decrementIndex = useCallback(updateIndex(-1, currentSection, setCurrentSection), [currentSection]);
    const internalKeyupHandler = useCallback(keyupHandler(sections.length, currentSection.index, decrementIndex, incrementIndex), [sections.length, currentSection, incrementIndex, decrementIndex]);
    useEffect(() => initKeyupHandler(internalKeyupHandler), [internalKeyupHandler]);
    useEffect(() => {
        updateNotesWindow(currentSection.index, sections.length, notesWindow, notes);
    }, [notes, notesWindow, currentSection.index, sections.length]);
    return (React.createElement("section", null,
        React.createElement("div", { "data-tags": sectionTags[currentSection.index] && sectionTags[currentSection.index].join("-") }, sections[currentSection.index])));
};
export default MarkdownPresentation;
//# sourceMappingURL=markdown-presentation.js.map