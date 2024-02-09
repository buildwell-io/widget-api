export function assert(condition: boolean, exception: () => Error) {
    if (!condition) {
        throw exception();
    }
}
