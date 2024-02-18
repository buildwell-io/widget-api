export function safeJSONParse(value: string, fallbackValue = null) {
    try {
        return JSON.parse(value);
    } catch (e) {
        return fallbackValue;
    }
}
