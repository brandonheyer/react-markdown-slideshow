import { Token } from "marked";
import { DefaultParserContext, SectionsSetter, NotesSetter, SectionTagSetter } from "../types";
export declare const tokenWalker: (context: DefaultParserContext) => (unknownToken: Token) => void;
declare const processMarkdown: (path: string, setSections: SectionsSetter, setNotes: NotesSetter, setSectionTags: SectionTagSetter) => void;
export default processMarkdown;
