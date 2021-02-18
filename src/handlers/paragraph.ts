import marked, {TokensList, Tokens} from "marked";
import {DefaultElementHandler, FixedToken} from "../types";

const tokensLinkOrText = (tokens: TokensList): boolean =>
	!tokens.find((t) => {
		const token = t as FixedToken;

		return token.type === "text" || token.type ==="link";
	});


/**
 * Paragraph elements are translated into notes and fed to the optionally
 * visible notes window
 */
const paragraph: DefaultElementHandler = (t, context) => {
	const { text } = t as Tokens.Paragraph;

	// Not -1 here since we push new sections on after they are done processing
	context.notes[context.newSections.length] =
		context.notes[context.newSections.length] || [];

	if (tokensLinkOrText((t as any).tokens as TokensList)) {
		context.notes[context.newSections.length].push(
			marked.parser((t as any).tokens as TokensList)
		);
	}
	else {
		context.notes[context.newSections.length].push(text);
	}

	return false;
};

export default paragraph;
