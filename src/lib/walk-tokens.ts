import { FixedToken } from "../types";
import { TokensList } from "marked"

type Callback = (token: FixedToken, parent?: FixedToken) => boolean | undefined;

const walkTokens = (tokens: TokensList, callback: Callback, parent?: FixedToken) => {
  for (const token of tokens) {
    const recurse = callback(token as FixedToken, parent);

		if (recurse !== false) {
	    switch ((token as any).type) {
	      case 'table': {
	        for (const cell of (token as any).tokens.header) {
						walkTokens(cell, callback, token as FixedToken);
	        }
	        for (const row of (token as any).tokens.cells) {
	          for (const cell of row) {
	            walkTokens(cell, callback, token as FixedToken);
	          }
	        }
	        break;
	      }
	      case 'list': {
	        walkTokens((token as any).items, callback, token as FixedToken);
	        break;
	      }
	      default: {
	        if ((token as any).tokens) {
	          walkTokens((token as any).tokens, callback, token as FixedToken);
	        }
	      }
			}
    }
  }
};

export default walkTokens;
