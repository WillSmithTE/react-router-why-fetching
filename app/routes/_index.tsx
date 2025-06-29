import { redirect, type LoaderFunction } from "react-router";

export const loader: LoaderFunction = () => {
  return redirect(`/${encodeURIComponent("https://willsmithte.com")}`);
};
