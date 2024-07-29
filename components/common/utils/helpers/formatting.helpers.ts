export const toCurrency = (number = 0, currency = "INR", language = undefined) =>
    Intl.NumberFormat(language, { style: 'currency', currency: currency }).format(number);

export const getTruncatedText = (text: string, length: number) => {
    let smallText = text;
    let isToolTipNeeded = false;
    if (text.length > length) {
        isToolTipNeeded = true;
        smallText = text.substring(0, length - 3) + '...';
    }
    return { smallText, fullText: text, isToolTipNeeded };
}