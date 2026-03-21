import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { Product } from "../product";
import { Cart } from "../cart";

@Injectable({
	providedIn: "root",
})
export class CatalogueService {
	private readonly apiUrl = "http://localhost:3000";
	constructor(private httpClient: HttpClient) {}

	getProducts() {
		return this.httpClient.get<Product[]>(`${this.apiUrl}/products`);
	}

	getCartDetails() {
		return this.httpClient.get<Cart[]>(`${this.apiUrl}/cart`);
	}

	getProductsByCategory(category: string) {
		return this.httpClient
			.get<Product[]>(`${this.apiUrl}/products`)
			.pipe(
				map((products) =>
					products.filter((p) => p.category === category),
				),
			);
	}

	addToCart(product: Cart) {
		this.httpClient.post(`${this.apiUrl}/cart`, product).subscribe({
			next: () => alert("Added to Cart Successfully!"),
			error: (err) => console.error("Error adding to cart", err),
		});
	}

	updateCartItem(productId: number, cartItem: Cart) {
		this.httpClient
			.put<Cart>(`${this.apiUrl}/cart/${productId}`, cartItem)
			.subscribe({
				next: () => console.log("Cart updated successfully"),
				error: (err) => console.error("Error updating cart", err),
			});
	}
}
