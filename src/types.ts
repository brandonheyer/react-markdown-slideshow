import { ReactNode, Dispatch, SetStateAction } from "react";
import { Token, Tokens, TokensList, MarkedOptions } from "marked";

/**
 * Adjustments to @types/marked
 */

/**
 *  `Tokens.Heading` is missing `tokens` array
 */
export type FixedHeading = Tokens.Heading & {
  tokens: Array<FixedToken>;
};

export type FixedListItem = Tokens.Heading & {
	tokens: Array<FixedToken>;
}

/**
 * `Tokens.List` has `type` set to "list_start", should be "list"
 */
export type FixedList = Omit<Tokens.List, "type" | "items"> & {
  type: "list";
	items: Array<FixedListItem>;
};

/**
 * The unioned members of `Token` are inconsistently implemented and sometimes
 * do not have the `type` property. Also:
 *  - replace `Tokens.List` with `FixedList`
 *  - replace `Tokens.Heading` with `FixedHeading` (for consistency)
 */
export type FixedToken =
  | Exclude<Token, Tokens.Def | Tokens.Heading | Tokens.List | Tokens.ListItem>
  | FixedHeading
  | FixedList
	| FixedListItem
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

export type SectionElements = Array<ReactNode>;
export type SectionEntry = [SectionElements, SectionElements];
export type Sections = Array<SectionEntry>;
export type SectionTags = Array<Array<string>>;
export type SectionClasses = Array<Array<string>>;
export type Notes = Array<Array<string>>;

export type WindowSetter = Dispatch<SetStateAction<Window | null>>;
export type SectionTagSetter = Dispatch<SetStateAction<SectionTags>>;
export type SectionClassSetter = Dispatch<SetStateAction<SectionClasses>>;
export type NotesSetter = Dispatch<SetStateAction<Notes>>;
export type SectionsSetter = Dispatch<SetStateAction<Sections>>;

interface ParserContext {
	[key: string]: any;
}

export interface DefaultParserContext extends ParserContext {
	headingIndex: number;
	currSection: SectionEntry;
	newSections: Sections;
	sectionTags: SectionTags;
	sectionClasses: SectionClasses;
	notes: Array<Array<string>>;
}

export type ElementHandler<T extends ParserContext> = (
  token: FixedToken,
  context: T,
	parser: (src: TokensList, options?: MarkedOptions) => string
) => [ReactNode, string | Array<string>] | ReactNode;

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
