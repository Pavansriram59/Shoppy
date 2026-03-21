import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Cart } from "../cart";

@Injectable({
	providedIn: "root",
})
export class CartService {
	private readonly apiUrl = "http://localhost:3000";
	constructor(private httpClient: HttpClient) {}

	getCartDetails() {
		return this.httpClient.get<Cart[]>(`${this.apiUrl}/cart`);
	}

	updateCartItem(itemId: number, cartItem: Cart) {
		this.httpClient
			.put<Cart>(`${this.apiUrl}/cart/${itemId}`, cartItem)
			.subscribe({
				next: () => console.log("Cart updated successfully"),
				error: (err) => console.error("Error updating cart", err),
			});
	}

	deleteCartItem(itemId: number) {
		return this.httpClient.delete(`${this.apiUrl}/cart/${itemId}`);
	}
}
