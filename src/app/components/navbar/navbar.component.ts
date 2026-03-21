import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { NgFor } from "@angular/common";

@Component({
	selector: "app-navbar",
	standalone: true,
	imports: [RouterLink, RouterLinkActive, NgFor],
	templateUrl: "./navbar.component.html",
	styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent {
	readonly titles: string[] = [
		"Kitchen Appliances",
		"Electronics",
		"Fitness",
		"Fruits",
		"Vegetables",
		"Dairy",
		"Grains",
	];

	readonly navItems: string[] = ["Deals", "What's New", "Delivery"];
}
