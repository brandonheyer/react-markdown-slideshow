import React, {useRef, useEffect} from "react";
import PrismJS from "prismjs";
import {Tokens} from "marked";
import {DefaultElementHandler} from "../types";

const addTS = (e:any) => {
	e.languages.typescript = e.languages.extend(
		"javascript",
		{
			"class-name":{
				pattern: /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
				lookbehind: !0,
				greedy: !0,
				inside: null
			},
			keyword: /\b(?:abstract|as|asserts|async|await|break|case|catch|class|const|constructor|continue|debugger|declare|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|is|keyof|let|module|namespace|new|null|of|package|private|protected|public|readonly|return|require|set|static|super|switch|this|throw|try|type|typeof|undefined|var|void|while|with|yield)\b/,
			builtin: /\b(?:string|Function|any|number|boolean|Array|symbol|console|Promise|unknown|never)\b/
		}
	);

	delete e.languages.typescript.parameter;
	var n=e.languages.extend("typescript", {});
	delete n["class-name"];
	e.languages.typescript["class-name"].inside=n;
	e.languages.insertBefore(
		"typescript",
		"function",
		{
			"generic-function": {
				pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
				greedy:!0,
				inside: {
					function: /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,
					generic: {
						pattern: /<[\s\S]+/,
						alias: "class-name",
						inside:n
					}
				}
			}
		}
	);

	e.languages.ts=e.languages.typescript;
};

addTS(PrismJS);

const code: DefaultElementHandler = (t) => {
	return () => {
		const codeRef = useRef<HTMLElement>(null);
		const { text, lang } = t as Tokens.Code;

		useEffect(() => {
			if (codeRef.current) {
				PrismJS.highlightElement(codeRef.current);
			}
		}, [codeRef]);

		return (
			<pre>
				<code ref={codeRef} className={lang ? `language-${lang}` : ""}>
					{text}
				</code>
			</pre>
		);
	};
}

export default code;
