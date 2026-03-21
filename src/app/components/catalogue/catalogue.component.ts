import { Component, OnInit, DestroyRef, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgFor } from "@angular/common";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Cart } from "../../cart";
import { Product } from "../../product";
import { CatalogueService } from "../../services/catalogue.service";

@Component({
	selector: "app-catalogue",
	standalone: true,
	imports: [NgFor],
	templateUrl: "./catalogue.component.html",
	styleUrls: ["./catalogue.component.css"],
})
export class CatalogueComponent implements OnInit {
	cartDetails: Cart[] | null = null;
	selectedCategory = "";
	catalogueProducts: Product[] = [];
	filteredProducts: Product[] = [];

	private readonly destroyRef = inject(DestroyRef);

	constructor(
		private catalogueService: CatalogueService,
		private route: ActivatedRoute,
	) {}

	ngOnInit(): void {
		this.route.paramMap
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe((params) => {
				this.selectedCategory = params.get("category") ?? "";
				this.catalogueService
					.getProductsByCategory(this.selectedCategory)
					.subscribe((products) => {
						this.catalogueProducts = products;
						this.filteredProducts = products;
					});
			});

		this.catalogueService
			.getCartDetails()
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe((data) => (this.cartDetails = data));
	}

	addProductToCart(product: Product): void {
		const cartItem: Cart = { ...product, quantity: 1 };
		if (!this.cartDetails) {
			this.catalogueService.addToCart(cartItem);
			return;
		}
		const existingCartItem = this.cartDetails.find(
			(item) => item.id === product.id,
		);
		if (existingCartItem) {
			if (existingCartItem.quantity < 10) {
				existingCartItem.quantity += 1;
				this.catalogueService.updateCartItem(
					product.id,
					existingCartItem,
				);
				alert("Added to Cart Successfully!");
			} else {
				alert("Can't add more than 10 items of same product to cart");
			}
		} else {
			this.catalogueService.addToCart(cartItem);
		}
	}

	filterProductsByPrice(minPrice: number, maxPrice: number): void {
		this.filteredProducts = this.catalogueProducts.filter(
			(product) => product.price >= minPrice && product.price <= maxPrice,
		);
	}

	sortProducts(sortBy: string): void {
		if (sortBy === "name") {
			this.filteredProducts = [...this.filteredProducts].sort((a, b) => {
				if (a.name < b.name) return -1;
				if (a.name > b.name) return 1;
				return 0;
			});
		} else if (sortBy === "price") {
			this.filteredProducts = [...this.filteredProducts].sort(
				(a, b) => a.price - b.price,
			);
		}
	}
}
