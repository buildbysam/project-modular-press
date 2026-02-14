import { redirect, RedirectType } from "next/navigation";

export default function BlogPage() {
  redirect("/", RedirectType.replace);
}
