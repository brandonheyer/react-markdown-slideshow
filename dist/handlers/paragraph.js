const paragraph = (t, context) => {
    const { text } = t;
    // Not -1 here since we push new sections on after they are done processing
    context.notes[context.newSections.length] =
        context.notes[context.newSections.length] || [];
    context.notes[context.newSections.length].push(text);
    return false;
};
export default paragraph;
//# sourceMappingURL=paragraph.js.map