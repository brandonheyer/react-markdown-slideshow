import React, {
  FC,
  useCallback,
  useState,
  useEffect,
} from "react";

import { SectionTags, Notes, MutableSectionIndex, MutableIndexSetter, Sections } from "./types";

import initKeyupHandler from "./lib/init-keyup-handler";
import keyupHandler from "./lib/keyup-handler";
import updateNotesWindow from "./lib/update-notes-window";

interface MarkdownPresentationProps {
  sections: Sections;
  startingSection: number;
  notesWindow?: Window | null;
  notes?: Notes;
	sectionTags?: SectionTags;
}

const updateIndex = (
  change: number,
  current: MutableSectionIndex,
  setCurrentSection: MutableIndexSetter
) => () => {
  setCurrentSection({ index: current.index + change });
	window.location.hash = `#${current.index + change}`;
};

const MarkdownPresentation: FC<MarkdownPresentationProps> = ({
  notes,
  notesWindow,
  sections,
	sectionTags = [],
  startingSection = 0,
}) => {
  const [currentSection, setCurrentSection] = useState<MutableSectionIndex>({
    index: startingSection,
  });

  const incrementIndex = useCallback(
    updateIndex(1, currentSection, setCurrentSection),
    [currentSection]
  );

  const decrementIndex = useCallback(
    updateIndex(-1, currentSection, setCurrentSection),
    [currentSection]
  );

  const internalKeyupHandler = useCallback(
		keyupHandler(sections.length, currentSection.index, decrementIndex, incrementIndex),
    [sections.length, currentSection, incrementIndex, decrementIndex]
  );

  useEffect(() => initKeyupHandler(internalKeyupHandler), [internalKeyupHandler]);

  useEffect(() => {
    updateNotesWindow(currentSection.index, sections.length, notesWindow, notes)
  }, [notes, notesWindow, currentSection.index, sections.length]);

  return (
		<section>
			<div data-tags={sectionTags[currentSection.index] && sectionTags[currentSection.index].join("-")}>
				{sections[currentSection.index]}
			</div>
		</section>
	);
};

export default MarkdownPresentation;
