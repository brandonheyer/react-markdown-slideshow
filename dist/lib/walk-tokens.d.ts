import { FixedToken } from "../types";
import { TokensList } from "marked";
declare type Callback = (token: FixedToken, parent?: FixedToken) => boolean | undefined;
declare const walkTokens: (tokens: TokensList, callback: Callback, parent?: import("marked").Tokens.Space | import("marked").Tokens.Code | import("marked").Tokens.Table | import("marked").Tokens.Hr | import("marked").Tokens.Blockquote | import("marked").Tokens.BlockquoteStart | import("marked").Tokens.BlockquoteEnd | import("marked").Tokens.Paragraph | import("marked").Tokens.HTML | import("marked").Tokens.Text | import("marked").Tokens.Escape | import("marked").Tokens.Tag | import("marked").Tokens.Link | import("marked").Tokens.Strong | import("marked").Tokens.Em | import("marked").Tokens.Codespan | import("marked").Tokens.Br | import("marked").Tokens.Del | import("../types").FixedHeading | import("../types").FixedList | import("../types").FixedListItem | undefined) => void;
export default walkTokens;
