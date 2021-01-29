import { Dispatch, SetStateAction } from "react";
import { Token, Tokens } from "marked";
/**
 * Adjustments to @types/marked
 */
/**
 *  `Tokens.Heading` is missing `tokens` array
 */
export declare type FixedHeading = Tokens.Heading & {
    tokens: Array<FixedToken>;
};
/**
 * `Tokens.List` has `type` set to "list_start", should be "list"
 */
export declare type FixedList = Omit<Tokens.List, "type"> & {
    type: "list";
};
/**
 * The unioned members of `Token` are inconsistently implemented and sometimes
 * do not have the `type` property. Also:
 *  - replace `Tokens.List` with `FixedList`
 *  - replace `Tokens.Heading` with `FixedHeading` (for consistency)
 */
export declare type FixedToken = Exclude<Token, Tokens.Def | Tokens.Heading | Tokens.List> | FixedHeading | FixedList | Tokens.Link;
/**
 * Alias for all `Tokens` that have a `text` property
 */
export declare type TextToken = Exclude<FixedToken, Tokens.Space | Tokens.Table | Tokens.Hr | Tokens.BlockquoteStart | Tokens.BlockquoteEnd | Tokens.Br | Tokens.Del | FixedList>;
/**
 * Other Types
 */
export declare type SectionElements = Array<JSX.Element>;
export declare type Sections = Array<SectionElements>;
export declare type SectionTags = Array<Array<string>>;
export declare type Notes = Array<Array<string>>;
export declare type WindowSetter = Dispatch<SetStateAction<Window | null>>;
export declare type SectionTagSetter = Dispatch<SetStateAction<SectionTags>>;
export declare type NotesSetter = Dispatch<SetStateAction<Notes>>;
export declare type SectionsSetter = Dispatch<SetStateAction<Sections>>;
interface ParserContext {
    [key: string]: any;
}
export interface DefaultParserContext extends ParserContext {
    headingIndex: number;
    currSection: SectionElements;
    newSections: Sections;
    sectionTags: SectionTags;
    notes: Array<Array<string>>;
}
export declare type ElementHandler<T extends ParserContext> = (token: FixedToken, context: T) => Array<JSX.Element> | JSX.Element | boolean;
export declare type DefaultElementHandler = ElementHandler<DefaultParserContext>;
export declare type ElementHandlersDefinition<T extends ParserContext> = Partial<Record<"blockquote" | "blockquote_start" | "blockquote_end" | "br" | "code" | "codespan" | "del" | "escape" | "em" | "heading" | "hr" | "html" | "image" | "link" | "list" | "list_item" | "paragraph" | "space" | "strong" | "table" | "text", ElementHandler<T>>>;
export interface NotesOptions {
    enabled: boolean;
}
export interface PresentationOptions<N = NotesOptions> {
    notesOptions: N | boolean;
}
export declare type ConfigurablePresentationOptions = Partial<PresentationOptions<Partial<NotesOptions>>>;
export interface MutableSectionIndex {
    index: number;
}
export declare type MutableIndexSetter = Dispatch<SetStateAction<MutableSectionIndex>>;
export {};
