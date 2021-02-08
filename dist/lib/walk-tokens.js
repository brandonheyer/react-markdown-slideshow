const walkTokens = (tokens, callback, parent) => {
    for (const token of tokens) {
        const recurse = callback(token, parent);
        if (recurse !== false) {
            switch (token.type) {
                case 'table': {
                    for (const cell of token.tokens.header) {
                        walkTokens(cell, callback, token);
                    }
                    for (const row of token.tokens.cells) {
                        for (const cell of row) {
                            walkTokens(cell, callback, token);
                        }
                    }
                    break;
                }
                case 'list': {
                    walkTokens(token.items, callback, token);
                    break;
                }
                default: {
                    if (token.tokens) {
                        walkTokens(token.tokens, callback, token);
                    }
                }
            }
        }
    }
};
export default walkTokens;
//# sourceMappingURL=../../src/lib/walk-tokens.js.map