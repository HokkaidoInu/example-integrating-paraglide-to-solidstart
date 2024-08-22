import { Link } from "react-router-dom";
import clsx from "clsx";
import { conflictsAtom, pendingChangesAtom } from "../state.ts";
import { useAtom } from "jotai";

const data: { path: string; name: string }[] = [
	{
		path: "/",
		name: "Edit",
	},
	{
		path: "/changes",
		name: "Changes",
	},
	{ path: "/conflicts", name: "Conflicts" },
];

const SubNavigation = () => {
	const [pendingChanges] = useAtom(pendingChangesAtom);
    const [conflicts] = useAtom(conflictsAtom);

		return (
			<div className="flex px-[2px] gap-3 items-center -mb-[1px] -ml-[6px]">
				{data.map((item) => {
					if (item.path === "/conflicts" && conflicts.length > 0) {
						return (
							<NavItem
								key={item.path}
								path={item.path}
								name={item.name}
								numUncommittedChanges={pendingChanges.length}
							/>
						);
					} else if (item.path === "/changes" && pendingChanges.length > 0) {
						return (
							<NavItem
								key={item.path}
								path={item.path}
								name={item.name}
								numUncommittedChanges={pendingChanges.length}
							/>
						);
					} else if (item.path === "/") {
						return (
							<NavItem
								key={item.path}
								path={item.path}
								name={item.name}
								numUncommittedChanges={pendingChanges.length}
							/>
						);
					}
				})}
			</div>
		);
};

export default SubNavigation;

const NavItem = (props: {
	path: string;
	name: string;
	numUncommittedChanges: number;
}) => {
	const [conflicts] = useAtom(conflictsAtom);

	return (
		<Link key={props.path} to={props.path} className={clsx("pb-1 relative")}>
			<div
				className={clsx(
					"h-8 items-center px-2 flex text-[14px]! box-border text-zinc-500 hover:bg-zinc-100 rounded",
					window && window.location.pathname === props.path
						? "text-zinc-950"
						: ""
				)}
			>
				{props.name}
				{props.path === "/changes" && (
					<div
						className={clsx(
							"ml-2 text-xs!  h-5 rounded flex items-center px-2 font-medium",
							props.numUncommittedChanges === 0
								? "text-zinc-700 bg-zinc-300"
								: "text-blue-700 bg-blue-200"
						)}
					>
						{props.numUncommittedChanges}
					</div>
				)}
				{props.path === "/conflicts" && (
					<div
						className={clsx(
							"ml-2 text-xs!  h-5 rounded flex items-center px-2 font-medium",
							conflicts.length === 0
								? "text-zinc-700 bg-zinc-300"
								: "text-blue-700 bg-blue-200"
						)}
					>
						{conflicts.length}
					</div>
				)}
			</div>
			<div
				className={clsx(
					"w-[calc(100%_-_8px)] mx-[4px] h-[2px] bottom-0 right-0 absolute",
					window && window.location.pathname === props.path
						? "bg-zinc-950"
						: "bg-transparent"
				)}
			></div>
		</Link>
	);
};
