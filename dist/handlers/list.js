import React, { useEffect, useState, useCallback, useRef } from "react";
import code from "./code";
const getListItems = (list) => {
    const counts = {
        code: 0,
        table: 0
    };
    list.items.reduce((acc, listItem) => {
        listItem.tokens.forEach(token => {
            switch (token.type) {
                case "code":
                case "table":
                    counts[token.type]++;
                    break;
                default:
            }
        });
        return acc;
    }, counts);
    return "-" + Object.keys(counts).reduce((acc, k) => {
        if (counts[k]) {
            acc.push(`${k}-${counts[k]}`);
        }
        return acc;
    }, []).join("-");
};
const keyupHandler = (ulElement, setCurrentFocus) => (event) => {
    let currentFocusIndex = -1;
    if (ulElement.current) {
        const childCount = ulElement.current.children.length;
        for (let i = 0; i < childCount; i++) {
            if (ulElement.current.children[i] === document.activeElement) {
                currentFocusIndex = i;
            }
        }
        switch (event.key) {
            case "ArrowDown":
                setCurrentFocus((currentFocusIndex + 1) % childCount);
                break;
            case "ArrowUp":
                setCurrentFocus((currentFocusIndex - 1 + childCount) % childCount);
                break;
        }
    }
};
const list = (t, context, parser) => [
    () => {
        const [currentFocus, setCurrentFocus] = useState(0);
        const ulElement = useRef(null);
        const onKeyUp = useCallback(keyupHandler(ulElement, setCurrentFocus), [ulElement, ulElement.current]);
        const { items } = t;
        useEffect(() => {
            if (ulElement.current && ulElement.current.children[currentFocus]) {
                ulElement.current.children[currentFocus].focus();
            }
        }, [ulElement, currentFocus]);
        return (React.createElement("ul", { onKeyUp: onKeyUp, ref: ulElement },
            React.createElement("li", { tabIndex: 1, className: "list-blank" }),
            items.map((i, n) => (React.createElement("li", { key: n + 1, tabIndex: n + 1 }, i.tokens.map(token => {
                switch (token.type) {
                    case "code":
                        token.ignore = true;
                        const CodeComponent = code(token, context, parser);
                        if (typeof CodeComponent === "function") {
                            return (React.createElement(CodeComponent, null));
                        }
                        break;
                    default:
                        return (React.createElement("span", { dangerouslySetInnerHTML: { __html: parser([token]) } }));
                }
            }))))));
    },
    `li-${t.items.length}${getListItems(t)}`
];
export default list;
//# sourceMappingURL=../../src/handlers/list.js.map