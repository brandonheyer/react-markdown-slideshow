import { FC } from "react";
import { SectionClasses, SectionTags, Notes, Sections } from "./types";
interface MarkdownPresentationProps {
    sections: Sections;
    startingSection: number;
    notesWindow?: Window | null;
    notes?: Notes;
    sectionTags?: SectionTags;
    sectionClasses?: SectionClasses;
}
declare const MarkdownPresentation: FC<MarkdownPresentationProps>;
export default MarkdownPresentation;
