import React, {ReactNode} from "react";
import marked, { Token, TokensList } from "marked";
import DEFAULT_ELEMENT_HANDLERS from "../handlers";
import { FixedToken, DefaultParserContext , SectionsSetter, NotesSetter, SectionTagSetter, SectionClassSetter } from "../types";
import walkTokens from "./walk-tokens";

export const tokenWalker = (context: DefaultParserContext) => (unknownToken: FixedToken, parent?: FixedToken): boolean | undefined => {
	const token: FixedToken = (unknownToken as unknown) as FixedToken;
	const handlerDefinition = DEFAULT_ELEMENT_HANDLERS[token.type];
	let extraTags: string = "";
	let extraClasses: string = "";

	if (handlerDefinition) {
		const handlerResult = handlerDefinition(token, context, marked.parser);
		const index: 0 | 1 = token.type === "heading" ? 0 : 1;

		if (handlerResult) {
			if (Array.isArray(handlerResult)) {
				let handler: ReactNode | Array<ReactNode>;

				if (handlerResult.length === 2 && (typeof(handlerResult[1]) === "string" || Array.isArray(handlerResult[1]))) {
					if (typeof(handlerResult[1]) === "string") {
						extraTags = handlerResult[1];
					} else if (typeof(handlerResult[1][0]) === "string") {
						extraTags = handlerResult[1][0];
						extraClasses = handlerResult[1].slice(1).join(" ");
					}

					if (Array.isArray(handlerResult[0])) {
						handler = handlerResult[0];
					}
					else {
						context.currSection[1].push(handlerResult[0]);
					}
				} else {
					handler = handlerResult as ReactNode;
				}

				// Technically this is an array already
				if (Array.isArray(handler)) {
					if (context.currSection && context.currSection[0].length || context.currSection[1].length) {
						context.newSections.push(context.currSection);
						context.sectionTags.push([]);
						context.sectionClasses.push([]);
					}

					context.currSection = [[], []];
					context.currSection[index] = handler;
				}
			} else if (handlerResult === true) {
				context.currSection[index].push(() => (
					<div className="basic-slide-part"
						key={`${context.currSection.length}:${token.type}`}
						dangerouslySetInnerHTML={{
							__html: marked.parser(([token] as any) as TokensList),
						}}
					/>
				));
			} else {
				context.currSection[index].push(handlerResult);
			}

			switch(token.type) {
				case "heading":
					context.sectionTags[context.sectionTags.length - 1].push(`h${token.depth}`);
					break;
				default:
					context.sectionTags[context.sectionTags.length - 1].push(token.type);
			}

			if (extraTags) {
				context.sectionTags[context.sectionTags.length - 1].push(extraTags);
			}

			if (extraClasses) {
				context.sectionClasses[context.sectionClasses.length - 1].push(extraClasses);
			}
		}
	}

	return token.type === "list";
}

const processMarkdown = (path: string, setSections: SectionsSetter, setNotes: NotesSetter, setSectionTags: SectionTagSetter, setSectionClasses: SectionClassSetter) => {
	fetch(path)
		.then((response) => response.text())
		.then((md) => {
			const context: DefaultParserContext = {
				headingIndex: 0,
				newSections: [],
				currSection: [[], []],
				notes: [],
				sectionTags: [[]],
				sectionClasses: [[]]
			};

			const tokens = marked.Lexer.lex((md as any) as TokensList);

			walkTokens(tokens, tokenWalker(context));

			// Add in last section
			if (context.currSection.length) {
				context.newSections.push(context.currSection);
			}

			setSections(context.newSections);
			setNotes(context.notes);
			setSectionTags(context.sectionTags);
			setSectionClasses(context.sectionClasses);
		});
}

export default processMarkdown;
