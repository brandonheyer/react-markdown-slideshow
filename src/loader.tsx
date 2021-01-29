import React, { FC, useState, useEffect, useMemo } from "react";

import MarkdownPresentation from "./markdown-presentation";
import { Sections, Notes, PresentationOptions, ConfigurablePresentationOptions } from "./types";

import processMarkdown from "./lib/process-markdown";
import combineOptions from "./lib/combine-options";
import initNotesWindow from "./lib/init-notes-window";

interface LoaderProps {
  path: string;
	presentationOptions?: ConfigurablePresentationOptions;
}

const Loader: FC<LoaderProps> = ({ path, presentationOptions = {} }) => {
  const [sections, setSections] = useState<Sections>([]);
	const [sectionTags, setSectionTags] = useState<Notes>([]);
  const [notes, setNotes] = useState<Notes>([]);
  const [notesWindow, setNotesWindow] = useState<Window|null>(null);

	// Get options with defaults
	const options: PresentationOptions = useMemo(
		() => combineOptions(presentationOptions),
		[presentationOptions]
	);

	const showNotes = (typeof(options.notesOptions) === "object") ? options.notesOptions.enabled : options.notesOptions;

	// Initialize the notes window
  useEffect(() => {
		initNotesWindow(showNotes, notesWindow, setNotesWindow);
	 }, [showNotes]);

	// Process the provided markdown at `path`
  useEffect(() => {
		processMarkdown(path, setSections, setNotes, setSectionTags);
  }, [path]);

  return (
    <MarkdownPresentation
      sections={sections}
      notes={notes}
      notesWindow={notesWindow}
      startingSection={parseInt(window.location.hash.replace("#", ""), 10) || 0}
			sectionTags={sectionTags}
    />
  );
};

export default Loader;
