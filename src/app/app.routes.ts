import { Routes } from "@angular/router";

export const routes: Routes = [
	{
		path: "",
		loadComponent: () =>
			import("./components/home/home.component").then(
				(m) => m.HomeComponent,
			),
	},
	{ path: "home", redirectTo: "", pathMatch: "full" },
	{
		path: "catalogue/:category",
		loadComponent: () =>
			import("./components/catalogue/catalogue.component").then(
				(m) => m.CatalogueComponent,
			),
	},
	{
		path: "cart",
		loadComponent: () =>
			import("./components/cart/cart.component").then(
				(m) => m.CartComponent,
			),
	},
	{
		path: "**",
		loadComponent: () =>
			import("./components/page-not-found/page-not-found.component").then(
				(m) => m.PageNotFoundComponent,
			),
	},
];
