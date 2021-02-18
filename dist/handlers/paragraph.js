import marked from "marked";
const tokensLinkOrText = (tokens) => !tokens.find((t) => {
    const token = t;
    return token.type === "text" || token.type === "link";
});
/**
 * Paragraph elements are translated into notes and fed to the optionally
 * visible notes window
 */
const paragraph = (t, context) => {
    const { text } = t;
    // Not -1 here since we push new sections on after they are done processing
    context.notes[context.newSections.length] =
        context.notes[context.newSections.length] || [];
    if (tokensLinkOrText(t.tokens)) {
        context.notes[context.newSections.length].push(marked.parser(t.tokens));
    }
    else {
        context.notes[context.newSections.length].push(text);
    }
    return false;
};
export default paragraph;
//# sourceMappingURL=../../src/handlers/paragraph.js.map