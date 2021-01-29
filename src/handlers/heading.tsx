import React from "react";
import marked, {TokensList} from "marked";
import {FixedHeading, DefaultElementHandler} from "../types";

const heading:DefaultElementHandler = (t, context) => {
	const { depth, tokens } = t as FixedHeading;
	let { text } = t as FixedHeading;
	const headingIndex = context.headingIndex++;

	if (tokens.length > 1) {
		const lastToken = tokens[tokens.length - 1];

		if (lastToken.type === "link" && lastToken.title === null) {
			text = marked.parser((tokens.slice(0, -1) as any) as TokensList);
		}
	}

	const element = React.createElement(
		`h${depth}`,
		{
			key: headingIndex,
			dangerouslySetInnerHTML: {
				__html: text
			}
		}
	);

	if (depth === 1) {
		return [element];
	}

	return element;
};

export default heading;
