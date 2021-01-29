import heading from "./heading";
import paragraph from "./paragraph";
const returnTrue = () => true;
const DEFAULT_ELEMENT_HANDLERS = {
    heading,
    paragraph,
    code: returnTrue,
    table: returnTrue,
    list: returnTrue
};
export default DEFAULT_ELEMENT_HANDLERS;
//# sourceMappingURL=index.js.map