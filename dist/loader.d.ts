import { FC } from "react";
import { ConfigurablePresentationOptions } from "./types";
interface LoaderProps {
    path: string;
    presentationOptions?: ConfigurablePresentationOptions;
}
declare const Loader: FC<LoaderProps>;
export default Loader;
