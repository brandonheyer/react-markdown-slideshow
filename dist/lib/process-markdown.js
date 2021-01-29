import React from "react";
import marked from "marked";
import DEFAULT_ELEMENT_HANDLERS from "../handlers";
export const tokenWalker = (context) => (unknownToken) => {
    const token = unknownToken;
    const handler = DEFAULT_ELEMENT_HANDLERS[token.type];
    if (handler) {
        const handlerResult = handler(token, context);
        if (handlerResult) {
            if (Array.isArray(handlerResult)) {
                if (context.currSection.length) {
                    context.newSections.push(context.currSection);
                    context.sectionTags.push([]);
                }
                context.currSection = handlerResult;
            }
            else if (handlerResult === true) {
                context.currSection.push(React.createElement("div", { key: `${context.currSection.length}:${token.type}`, dangerouslySetInnerHTML: {
                        __html: marked.parser([token]),
                    } }));
            }
            else {
                context.currSection.push(handlerResult);
            }
            switch (token.type) {
                case "heading":
                    context.sectionTags[context.sectionTags.length - 1].push(`h${token.depth}`);
                    break;
                default:
                    context.sectionTags[context.sectionTags.length - 1].push(token.type);
            }
        }
    }
};
const processMarkdown = (path, setSections, setNotes, setSectionTags) => {
    fetch(path)
        .then((response) => response.text())
        .then((md) => {
        const context = {
            headingIndex: 0,
            newSections: [],
            currSection: [],
            notes: [],
            sectionTags: [[]]
        };
        const tokens = marked.Lexer.lex(md);
        marked.walkTokens(tokens, tokenWalker(context));
        // Add in last section
        if (context.currSection.length) {
            context.newSections.push(context.currSection);
        }
        setSections(context.newSections);
        setNotes(context.notes);
        setSectionTags(context.sectionTags);
    });
};
export default processMarkdown;
//# sourceMappingURL=process-markdown.js.map