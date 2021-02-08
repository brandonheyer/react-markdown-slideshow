import {ElementHandlersDefinition,DefaultParserContext} from "../types";

import code from "./code";
import heading from "./heading";
import paragraph from "./paragraph";
import list from "./list";

const returnTrue = () => true;

const DEFAULT_ELEMENT_HANDLERS: ElementHandlersDefinition<DefaultParserContext> = {
  heading,
	paragraph,
	code,
	list,
	table: returnTrue,
};

export default DEFAULT_ELEMENT_HANDLERS;
