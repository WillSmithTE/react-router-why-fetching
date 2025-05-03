import { redirect } from "react-router";

export const loader = () => {
  return redirect(`/${encodeURIComponent("https://willsmithte.com")}`);
};
