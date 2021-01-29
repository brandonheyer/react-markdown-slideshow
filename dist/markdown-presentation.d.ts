import { FC } from "react";
import { SectionTags, Notes, Sections } from "./types";
interface MarkdownPresentationProps {
    sections: Sections;
    startingSection: number;
    notesWindow?: Window | null;
    notes?: Notes;
    sectionTags?: SectionTags;
}
declare const MarkdownPresentation: FC<MarkdownPresentationProps>;
export default MarkdownPresentation;
