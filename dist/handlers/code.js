import React, { useRef, useEffect } from "react";
import PrismJS from "prismjs";
const addTS = (e) => {
    e.languages.typescript = e.languages.extend("javascript", {
        "class-name": {
            pattern: /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
            lookbehind: !0,
            greedy: !0,
            inside: null
        },
        keyword: /\b(?:abstract|as|asserts|async|await|break|case|catch|class|const|constructor|continue|debugger|declare|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|is|keyof|let|module|namespace|new|null|of|package|private|protected|public|readonly|return|require|set|static|super|switch|this|throw|try|type|typeof|undefined|var|void|while|with|yield)\b/,
        builtin: /\b(?:string|Function|any|number|boolean|Array|symbol|console|Promise|unknown|never)\b/
    });
    delete e.languages.typescript.parameter;
    var n = e.languages.extend("typescript", {});
    delete n["class-name"];
    e.languages.typescript["class-name"].inside = n;
    e.languages.insertBefore("typescript", "function", {
        "generic-function": {
            pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
            greedy: !0,
            inside: {
                function: /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,
                generic: {
                    pattern: /<[\s\S]+/,
                    alias: "class-name",
                    inside: n
                }
            }
        }
    });
    e.languages.ts = e.languages.typescript;
};
addTS(PrismJS);
const code = (t) => {
    return () => {
        const codeRef = useRef(null);
        const { text, lang } = t;
        useEffect(() => {
            if (codeRef.current) {
                PrismJS.highlightElement(codeRef.current);
            }
        }, [codeRef]);
        return (React.createElement("pre", null,
            React.createElement("code", { ref: codeRef, className: lang ? `language-${lang}` : "" }, text)));
    };
};
export default code;
//# sourceMappingURL=../../src/handlers/code.js.map