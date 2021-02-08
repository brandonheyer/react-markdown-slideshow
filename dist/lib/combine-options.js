const DEFAULT_OPTIONS = {
    notesOptions: {
        enabled: false
    }
};
const combineOptions = (options) => {
    const { notesOptions, ...restOptions } = options;
    const combinedOptions = {
        ...DEFAULT_OPTIONS,
        ...restOptions
    };
    combinedOptions.notesOptions = {
        ...DEFAULT_OPTIONS.notesOptions,
        ...(typeof (notesOptions) === "object" ? notesOptions : {}),
    };
    return combinedOptions;
};
export default combineOptions;
//# sourceMappingURL=../../src/lib/combine-options.js.map