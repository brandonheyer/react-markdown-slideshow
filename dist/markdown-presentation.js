import React, { useCallback, useState, useEffect, } from "react";
import initKeyupHandler from "./lib/init-keyup-handler";
import keyupHandler from "./lib/keyup-handler";
import updateNotesWindow from "./lib/update-notes-window";
const updateIndex = (change, current, setCurrentSection) => () => {
    setCurrentSection({ index: current.index + change });
    window.location.hash = `#${current.index + change}`;
};
const sectionMapper = (S) => {
    if (typeof S === "function") {
        return (React.createElement(S, null));
    }
    return S;
};
const SlidePart = ({ section, index, className }) => {
    if (section) {
        const currentSection = section[index];
        if (currentSection && currentSection.length) {
            return (React.createElement("div", { className: className }, currentSection.map(sectionMapper)));
        }
    }
    return null;
};
const MarkdownPresentation = ({ notes, notesWindow, sections, sectionTags = [], sectionClasses = [], startingSection = 0, }) => {
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
    console.log(sectionClasses);
    return (React.createElement("section", { className: "slide" },
        React.createElement("div", { className: `slide-container ${sectionClasses[currentSection.index] && sectionClasses[currentSection.index].join(" ")}`, "data-tags": sectionTags[currentSection.index] && sectionTags[currentSection.index].join("-") },
            React.createElement(SlidePart, { className: "slide-header", section: sections[currentSection.index], index: 0 }),
            React.createElement(SlidePart, { className: "slide-body", section: sections[currentSection.index], index: 1 }))));
};
export default MarkdownPresentation;
//# sourceMappingURL=../src/markdown-presentation.js.map