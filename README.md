# `react-markdown-slideshow`

This package is currenlty in beta and under active devlopment.

Use as module within your own react app:

```
import markdown from "./my-presentation.md"
import { Loader } from "react-markdown-slideshow"

```
ReactDOM.render(
  <React.StrictMode>
    <Loader path={markdown} />
  </React.StrictMode>
);
```
