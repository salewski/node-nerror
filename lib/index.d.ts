export class VError extends Error {
    static VError: typeof VError;

    static cause(err: Error): Error | null;
    static info(err: Error): VError.Info;
    static fullStack(err: Error): string;
    static findCauseByName(err: Error, name: string): Error | null;
    static hasCauseWithName(err: Error, name: string): boolean;
    static errorFromList<T extends Error>(
        errors: T[]
    ): null | T | VError.MultiError;
    static errorForEach(err: Error, func: (err: Error) => void): void;

    cause(): Error | undefined;
    constructor(
        options: VError.Options | Error,
        message: string,
        ...params: any[]
    );
    constructor(message?: string, ...params: any[]);
}

export namespace VError {
    interface Info {
        [key: string]: any;
    }

    interface Options {
        cause?: Error | null;
        name?: string;
        strict?: boolean;
        constructorOpt?(...args: any[]): void;
        info?: Info;
    }

    /*
     * SError is like VError, but stricter about types.  You cannot pass "null" or
     * "undefined" as string arguments to the formatter.  Since SError is only a
     * different function, not really a different class, we don't set
     * SError.prototype.name.
     */
    class SError extends VError {}

    /*
     * PError is like VError, but the message is not run through printf-style
     * templating.
     */
    class PError extends VError {}

    /*
     * Represents a collection of errors for the purpose of consumers that generally
     * only deal with one error.  Callers can extract the individual errors
     * contained in this object, but may also just treat it as a normal single
     * error, in which case a summary message will be printed.
     */
    class MultiError extends VError {
        constructor(errors: Error[]);
        errors(): Error[];
    }

    /*
     * Like JavaScript's built-in Error class, but supports a "cause" argument which
     * is wrapped, not "folded in" as with VError.	Accepts a printf-style message.
     * The cause argument can be null.
     */
    class WError extends VError {}
}
