import React from "react";
import marked, {TokensList} from "marked";
import {FixedHeading, DefaultElementHandler} from "../types";

const heading:DefaultElementHandler = (t, context) => {
	const { depth, tokens } = t as FixedHeading;
	let { text } = t as FixedHeading;
	const headingIndex = context.headingIndex++;
	let classNames:Array<string> = [];

	if (tokens.length > 1) {
		const lastToken = tokens[tokens.length - 1];

		if (lastToken.type === "link" && lastToken.title === null) {
			text = marked.parser((tokens.slice(0, -1) as any) as TokensList);
			classNames = lastToken.href.split(",");
		}
	}

	const element = () => React.createElement(
		`h${depth}`,
		{
			key: headingIndex,
			dangerouslySetInnerHTML: {
				__html: text
			}
		}
	);

	if (depth === 1) {
		if (classNames.length) {
			console.log(classNames);

			return [[element], [""].concat(classNames)];
		}

		return [element];
	}

	return element;
};

export default heading;
