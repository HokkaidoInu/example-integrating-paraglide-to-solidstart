import { RouteObject } from "react-router-dom"
import IndexPage from "./index/Page.tsx"
import SettingsPage from "./settings/Page.tsx"
import ChangesPage from "./changes/Page.tsx";
import ConflictsPage from "./conflicts/Page.tsx";

export const routes: RouteObject[] = [
	{
		path: "/",
		element: <IndexPage />,
	},
	{
		path: "/conflicts",
		element: <ConflictsPage />,
	},
	{
		path: "/settings",
		element: <SettingsPage />,
	},
	{
		path: "/changes",
		element: <ChangesPage />,
	},
];
