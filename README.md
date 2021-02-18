# `react-markdown-slideshow`

**This package is currently in beta and under active development.**

## Usage

Use as module within your own react app:

```ts
import markdown from "./my-presentation.md"
import { Loader } from "react-markdown-slideshow"

ReactDOM.render(
  <React.StrictMode>
    <Loader path={markdown} />
  </React.StrictMode>
);
```
