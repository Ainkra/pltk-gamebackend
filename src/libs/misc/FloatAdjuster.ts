/**
 * Force Int to float conversion
 * @param input 
 * @param precision 
 * @returns 
 */
export const ajustUnroundedNumber = (input: number, precision: number): number => {
    const numberToString = input.toString();
    const [integerPart, decimalPart] = numberToString.split('.');
    const newDecimalPart = decimalPart ? decimalPart.slice(0, precision) : '';
    const stringResult = integerPart + (newDecimalPart.length > 0 ? '.' + newDecimalPart : '');

    const result = parseFloat(stringResult);

    return result;
}