import React from "react";
import marked from "marked";
const heading = (t, context) => {
    const { depth, tokens } = t;
    let { text } = t;
    const headingIndex = context.headingIndex++;
    if (tokens.length > 1) {
        const lastToken = tokens[tokens.length - 1];
        if (lastToken.type === "link" && lastToken.title === null) {
            text = marked.parser(tokens.slice(0, -1));
        }
    }
    const element = React.createElement(`h${depth}`, {
        key: headingIndex,
        dangerouslySetInnerHTML: {
            __html: text
        }
    });
    if (depth === 1) {
        return [element];
    }
    return element;
};
export default heading;
//# sourceMappingURL=heading.js.map