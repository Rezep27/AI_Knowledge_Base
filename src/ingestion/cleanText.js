export function cleanText(text) {
    return text
        // Normalize line endings
        .replace(/\r\n/g, "\n")
        .replace(/\r/g, "\n")

        // Normalize different dash characters
        .replace(/[‐-‒–—]/g, "-")

        // Remove page markers such as:
        // -- 315 of 350 --
        .replace(/\\?--\s*\d+\s+of\s+\d+\s*--/g, "")

        // Remove excessive blank lines
        .replace(/\n{3,}/g, "\n\n")

        // Remove trailing whitespace
        .replace(/[ \t]+$/gm, "")

        .trim();
}