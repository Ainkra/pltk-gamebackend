export interface IGooglePaymentInterface {
    verifyPayment(item: string, purchaseToken: string, playerId: string, orderId: string): Promise<boolean>;
}

export interface IApplePaymentInterface {
    verifyPayment(receiptData: string, playerId: string, productId: string): Promise<boolean>;
}

export interface IStripePaymentInterface {
    createPayment(item: string, currency: string, playerId: string): Promise<string>
}