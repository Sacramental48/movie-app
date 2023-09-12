import Decimal from 'decimal.js';

export const formattedRating = (num) => {
    const rating = new Decimal(num);
    let roundedRating = +rating.toDecimalPlaces(1);
    if(rating.d.length === 1) {
        roundedRating = roundedRating + '.0'
    }
    return roundedRating;
}