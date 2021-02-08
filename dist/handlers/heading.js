import React from "react";
import marked from "marked";
const heading = (t, context) => {
    const { depth, tokens } = t;
    let { text } = t;
    const headingIndex = context.headingIndex++;
    let classNames = [];
    if (tokens.length > 1) {
        const lastToken = tokens[tokens.length - 1];
        if (lastToken.type === "link" && lastToken.title === null) {
            text = marked.parser(tokens.slice(0, -1));
            classNames = lastToken.href.split(",");
        }
    }
    const element = () => React.createElement(`h${depth}`, {
        key: headingIndex,
        dangerouslySetInnerHTML: {
            __html: text
        }
    });
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
//# sourceMappingURL=../../src/handlers/heading.js.map