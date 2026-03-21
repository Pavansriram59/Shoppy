import { Component, OnInit, DestroyRef, inject } from "@angular/core";
import { NgFor, NgIf } from "@angular/common";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Cart } from "../../cart";
import { CartService } from "../../services/cart.service";

@Component({
	selector: "app-cart",
	standalone: true,
	imports: [NgFor, NgIf],
	templateUrl: "./cart.component.html",
	styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
	readonly cartTitles: string[] = [
		"Product",
		"Description",
		"Quantity",
		"Total",
	];
	cartItems: Cart[] = [];
	totalAmount = 0;

	private readonly destroyRef = inject(DestroyRef);

	constructor(private cartService: CartService) {}

	ngOnInit(): void {
		this.cartService
			.getCartDetails()
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe((data) => {
				this.cartItems = data;
				this.totalAmount = this.calcTotalAmount();
			});
	}

	decreaseQuant(itemId: number, cartItem: Cart): void {
		if (cartItem.quantity > 1) {
			cartItem.quantity--;
			this.totalAmount = this.calcTotalAmount();
			this.cartService.updateCartItem(itemId, cartItem);
		} else if (window.confirm("Do you want to delete the item?")) {
			this.deleteItem(itemId);
		}
	}

	increaseQuant(itemId: number, cartItem: Cart): void {
		if (cartItem.quantity > 0 && cartItem.quantity < 10) {
			cartItem.quantity++;
			this.totalAmount = this.calcTotalAmount();
			this.cartService.updateCartItem(itemId, cartItem);
		} else {
			alert("Items not more than 10");
		}
	}

	deleteItem(itemId: number): void {
		this.cartService.deleteCartItem(itemId).subscribe(() => {
			this.cartItems = this.cartItems.filter(
				(item) => item.id !== itemId,
			);
			this.totalAmount = this.calcTotalAmount();
		});
	}

	calcTotalAmount(): number {
		return this.cartItems.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0,
		);
	}
}
