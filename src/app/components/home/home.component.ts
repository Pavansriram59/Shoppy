import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { NgFor } from "@angular/common";

interface Category {
	name: string;
	image_url: string;
}

@Component({
	selector: "app-home",
	standalone: true,
	imports: [RouterLink, NgFor],
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.css"],
})
export class HomeComponent {
	readonly categories: Category[] = [
		{
			name: "Kitchen Appliances",
			image_url: "assets/images/kitchen_appliances.jpg",
		},
		{ name: "Electronics", image_url: "assets/images/electronics.jpg" },
		{ name: "Fitness", image_url: "assets/images/fitness.jpg" },
		{ name: "Fruits", image_url: "assets/images/fruits.jpg" },
		{ name: "Vegetables", image_url: "assets/images/vegetables.jpg" },
		{ name: "Dairy", image_url: "assets/images/dairy.avif" },
		{ name: "Grains", image_url: "assets/images/grains.avif" },
	];
}
