import React, {
  FC,
	ReactNode,
  useCallback,
  useState,
  useEffect,
} from "react";

import {SectionClasses, SectionEntry, SectionTags, Notes, MutableSectionIndex, MutableIndexSetter, Sections } from "./types";

import initKeyupHandler from "./lib/init-keyup-handler";
import keyupHandler from "./lib/keyup-handler";
import updateNotesWindow from "./lib/update-notes-window";

interface MarkdownPresentationProps {
  sections: Sections;
  startingSection: number;
  notesWindow?: Window | null;
  notes?: Notes;
	sectionTags?: SectionTags;
	sectionClasses?: SectionClasses;
}

const updateIndex = (
  change: number,
  current: MutableSectionIndex,
  setCurrentSection: MutableIndexSetter
) => () => {
  setCurrentSection({ index: current.index + change });
	window.location.hash = `#${current.index + change}`;
};

const sectionMapper = (S: ReactNode) => {
	if (typeof S === "function") {
		return (<S />);
	}

	return S;
};

interface SlidePartProps {
	section: SectionEntry;
	className: string;
	index: 0 | 1;
}

const SlidePart: FC<SlidePartProps> = ({ section, index, className }) => {
	if (section) {
		const currentSection = section[index];

		if (currentSection && currentSection.length) {
			return (
				<div className={className}>
					{currentSection.map(sectionMapper)}
				</div>
			);
		}
	}

	return null;
}

const MarkdownPresentation: FC<MarkdownPresentationProps> = ({
  notes,
  notesWindow,
  sections,
	sectionTags = [],
	sectionClasses = [],
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

	console.log(sectionClasses);

  return (
		<section className="slide">
			<div className={`slide-container ${sectionClasses[currentSection.index] && sectionClasses[currentSection.index].join(" ")}`} data-tags={sectionTags[currentSection.index] && sectionTags[currentSection.index].join("-")}>
				<SlidePart
					className="slide-header"
					section={sections[currentSection.index]}
					index={0}
				/>

				<SlidePart
					className="slide-body"
					section={sections[currentSection.index]}
					index={1}
				/>
			</div>
		</section>
	);
};

export default MarkdownPresentation;
