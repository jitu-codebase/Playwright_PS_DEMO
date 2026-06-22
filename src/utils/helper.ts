/* Utility class providing static helper methods for finding min/max price indices and verifying product sort order */
export class Helper {

    static getIndexOfMinMaxPriceOfItems(...prices: number[]) {
        let minPrice = prices[0];
        let maxPrice = prices[0];

        let minIndex = 0;
        let maxIndex = 0;

        prices.forEach((price, index) => {
            if (price > maxPrice) {
                maxPrice = price;
                maxIndex = index;
            }

            if (price < minPrice) {
                minPrice = price;
                minIndex = index;
            }
        });
        console.log(`✅ max price is ${maxPrice} and minPrice is ${minPrice}`)
        return {
            minPrice,
            maxPrice,
            minIndex,
            maxIndex
        };
    }

    static verifyItemsAreSorted(items: number[]): boolean {
        for (let i = 0; i < items.length - 1; i++) {
            if ((items[i] > items[i + 1])) { // 7.99 < 8.99
                return false;
            }
        }
        return true;
    }

}