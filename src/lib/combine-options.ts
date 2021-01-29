import {PresentationOptions,ConfigurablePresentationOptions,NotesOptions} from "../types";

const DEFAULT_OPTIONS: PresentationOptions = {
	notesOptions: {
		enabled: false
	}
};

const combineOptions = (options: ConfigurablePresentationOptions): PresentationOptions => {
	const { notesOptions, ...restOptions } = options;

	const combinedOptions: PresentationOptions = {
		...DEFAULT_OPTIONS,
		...restOptions
	};

	combinedOptions.notesOptions = {
		...DEFAULT_OPTIONS.notesOptions as NotesOptions,
		...(typeof(notesOptions) === "object" ? notesOptions : {}),
	};

	return combinedOptions;
};

export default combineOptions;
