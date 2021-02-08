import React, {RefObject, Dispatch, SetStateAction, useEffect, useState, useCallback, useRef, FC, KeyboardEvent } from "react";
import {DefaultElementHandler, FixedList} from "../types";
import { TokensList } from "marked";

import code from "./code";

type HandledElements = "code" | "table";

const getListItems = (list: FixedList) => {
	const counts: Record<HandledElements, number> = {
		code: 0,
		table: 0
	};

	list.items.reduce((acc, listItem) => {
		listItem.tokens.forEach(token => {
			switch(token.type) {
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
		if (counts[k as HandledElements]) {
			acc.push(`${k}-${counts[k as HandledElements]}`);
		}

		return acc;
	}, [] as Array<string>).join("-");
}

const keyupHandler = (ulElement: RefObject<HTMLUListElement>, setCurrentFocus: Dispatch<SetStateAction<number>>) => (event: KeyboardEvent<HTMLUListElement>) => {
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
}

const list: DefaultElementHandler = (t, context, parser): [FC, string] => [
	() => {
		const [currentFocus, setCurrentFocus] = useState(0);
		const ulElement = useRef<HTMLUListElement>(null);
		const onKeyUp = useCallback(
			keyupHandler(ulElement, setCurrentFocus),
			[ulElement, ulElement.current]
		);

		const { items } = t as FixedList;

		useEffect(() => {
			if (ulElement.current && ulElement.current.children[currentFocus]) {
				(ulElement.current.children[currentFocus] as HTMLUListElement).focus();
			}

		}, [ulElement, currentFocus]);

		return (
			<ul onKeyUp={onKeyUp} ref={ulElement}>
				<li tabIndex={1} className="list-blank"></li>
				{items.map((i, n) => (
					<li
						key={n + 1}
						tabIndex={n + 1}

					>
						{i.tokens.map(token => {
							switch (token.type) {
								case "code":
									(token as any).ignore = true;
									const CodeComponent = code(token, context, parser);

									if (typeof CodeComponent === "function") {
										return (<CodeComponent />);
									}

									break;

								default:
									return (<span dangerouslySetInnerHTML={{__html: parser(([token] as any) as TokensList)}} />);
							}
						})}
					</li>
				))}
			</ul>
		);
	},
	`li-${(t as FixedList).items.length}${getListItems(t as FixedList)}`
];

export default list;
