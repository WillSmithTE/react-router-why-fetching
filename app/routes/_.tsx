import { NavLink, Outlet } from "react-router";

export const loader = async () => {
  await sleep(1000);
  return { item: 123 };
};
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function Component() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex p-4 gap-4">
        <NavLink to=".">Home</NavLink>
        <NavLink to="pages">Pages</NavLink>
        <NavLink to="settings">Settings</NavLink>
      </div>
      <Outlet />
    </div>
  );
}
