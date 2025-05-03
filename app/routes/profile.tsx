import { NavLink } from "react-router";

export const loader = async () => {
  await sleep(1000);
  return { user: "bob" };
};
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function Component() {
  return (
    <div className="flex p-4 gap-4">
      <NavLink to=".">Main</NavLink>
      <NavLink to="nested">nested</NavLink>
      <NavLink to="test">test</NavLink>
    </div>
  );
}
