import React from "react";
import marked from "marked";
import DEFAULT_ELEMENT_HANDLERS from "../handlers";
import walkTokens from "./walk-tokens";
export const tokenWalker = (context) => (unknownToken, parent) => {
    const token = unknownToken;
    const handlerDefinition = DEFAULT_ELEMENT_HANDLERS[token.type];
    let extraTags = "";
    let extraClasses = "";
    if (handlerDefinition) {
        const handlerResult = handlerDefinition(token, context, marked.parser);
        const index = token.type === "heading" ? 0 : 1;
        if (handlerResult) {
            if (Array.isArray(handlerResult)) {
                let handler;
                if (handlerResult.length === 2 && (typeof (handlerResult[1]) === "string" || Array.isArray(handlerResult[1]))) {
                    if (typeof (handlerResult[1]) === "string") {
                        extraTags = handlerResult[1];
                    }
                    else if (typeof (handlerResult[1][0]) === "string") {
                        extraTags = handlerResult[1][0];
                        extraClasses = handlerResult[1].slice(1).join(" ");
                    }
                    if (Array.isArray(handlerResult[0])) {
                        handler = handlerResult[0];
                    }
                    else {
                        context.currSection[1].push(handlerResult[0]);
                    }
                }
                else {
                    handler = handlerResult;
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
            }
            else if (handlerResult === true) {
                let html = marked.parser([token]);
                html = html.replace(/<td>/g, "<td tabIndex='1'>");
                context.currSection[index].push(() => (React.createElement("div", { className: "basic-slide-part", key: `${context.currSection.length}:${token.type}`, dangerouslySetInnerHTML: {
                        __html: html,
                    } })));
            }
            else {
                context.currSection[index].push(handlerResult);
            }
            switch (token.type) {
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
};
const processMarkdown = (path, setSections, setNotes, setSectionTags, setSectionClasses) => {
    fetch(path)
        .then((response) => response.text())
        .then((md) => {
        const context = {
            headingIndex: 0,
            newSections: [],
            currSection: [[], []],
            notes: [],
            sectionTags: [[]],
            sectionClasses: [[]]
        };
        const tokens = marked.Lexer.lex(md);
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
};
export default processMarkdown;
//# sourceMappingURL=../../src/lib/process-markdown.js.map