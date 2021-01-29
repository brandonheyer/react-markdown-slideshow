import { Dispatch, SetStateAction } from "react";
import { Token, Tokens } from "marked";

/**
 * Adjustments to @types/marked
 */

/**
 *  `Tokens.Heading` is missing `tokens` array
 */
export type FixedHeading = Tokens.Heading & {
  tokens: Array<FixedToken>;
};

/**
 * `Tokens.List` has `type` set to "list_start", should be "list"
 */
export type FixedList = Omit<Tokens.List, "type"> & {
  type: "list";
};

/**
 * The unioned members of `Token` are inconsistently implemented and sometimes
 * do not have the `type` property. Also:
 *  - replace `Tokens.List` with `FixedList`
 *  - replace `Tokens.Heading` with `FixedHeading` (for consistency)
 */
export type FixedToken =
  | Exclude<Token, Tokens.Def | Tokens.Heading | Tokens.List>
  | FixedHeading
  | FixedList
  | Tokens.Link;

/**
 * Alias for all `Tokens` that have a `text` property
 */
export type TextToken = Exclude<
  FixedToken,
  | Tokens.Space
  | Tokens.Table
  | Tokens.Hr
  | Tokens.BlockquoteStart
  | Tokens.BlockquoteEnd
  | Tokens.Br
  | Tokens.Del
  | FixedList
>;


/**
 * Other Types
 */

export type SectionElements = Array<JSX.Element>;
export type Sections = Array<SectionElements>;
export type SectionTags = Array<Array<string>>;
export type Notes = Array<Array<string>>;

export type WindowSetter = Dispatch<SetStateAction<Window | null>>;
export type SectionTagSetter = Dispatch<SetStateAction<SectionTags>>;
export type NotesSetter = Dispatch<SetStateAction<Notes>>;
export type SectionsSetter = Dispatch<SetStateAction<Sections>>;

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

export type ElementHandler<T extends ParserContext> = (
  token: FixedToken,
  context: T
) => Array<JSX.Element> | JSX.Element | boolean;

export type DefaultElementHandler = ElementHandler<DefaultParserContext>;

 export type ElementHandlersDefinition<T extends ParserContext> = Partial<
   Record<
     | "blockquote"
     | "blockquote_start"
     | "blockquote_end"
     | "br"
     | "code"
     | "codespan"
     | "del"
     | "escape"
     | "em"
     | "heading"
     | "hr"
     | "html"
     | "image"
     | "link"
     | "list"
     | "list_item"
     | "paragraph"
     | "space"
     | "strong"
     | "table"
     | "text",
     ElementHandler<T>
   >
 >;


 export interface NotesOptions {
 	enabled: boolean;
 }

 export interface PresentationOptions<N = NotesOptions> {
 	notesOptions: N | boolean;
 }

 export type ConfigurablePresentationOptions = Partial<PresentationOptions<Partial<NotesOptions>>>;

 export interface MutableSectionIndex {
   index: number;
 }

export type MutableIndexSetter = Dispatch<SetStateAction<MutableSectionIndex>>;
