/**
 * @param {object} allStyles
 * @param {number} width
 * @returns {object}
 */
export function getStylesForWidth(allStyles, width) {
    const styles = allStyles[width];
    if (!styles) {
        throw new Error(`Styles for resolution ${width}px not found in fixture!`);
    }
    return styles;
}