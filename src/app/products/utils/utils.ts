import {ProductModel} from "../models/product-model.model";

export const calcTaxedPrice = (basePrice: number): number => {
    return Number((basePrice * 1.21).toFixed(2));
}

export const calcPriceSubTotal = (products : ProductModel[]): number => {
    return products.reduce((accumulator, currentValue)=>{
        return accumulator + (+currentValue.basePrice)
    },0)
}