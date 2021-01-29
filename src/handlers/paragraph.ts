import {Tokens} from "marked";
import {DefaultElementHandler} from "../types";

const paragraph: DefaultElementHandler = (t, context) => {
	const { text } = t as Tokens.Paragraph;

	// Not -1 here since we push new sections on after they are done processing
	context.notes[context.newSections.length] =
		context.notes[context.newSections.length] || [];
	context.notes[context.newSections.length].push(text);

	return false;
};

export default paragraph;
