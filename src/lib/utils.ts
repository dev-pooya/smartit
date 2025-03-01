import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}
// export const API_BASE_URL = "https://api.smartitgroups.com";
export const API_BASE_URL = "http://127.0.0.1:8000";

export async function getComments(blogId) {
  const res = await fetch(`${API_BASE_URL}/api/comments/?post_id=${blogId}`, {
    method: "get",
  })
    .then((res) => res.json())
    .catch((e) => "error fetching data");
  return res.data;
}
