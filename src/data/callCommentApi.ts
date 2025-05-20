import { API_DOMAIN } from "@/utils/constants";

export const getAllComments = async (token: string) => {
  const response = await fetch(`${API_DOMAIN}/comments`, {
    headers: { Cookie: `token=${token}` },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch comments.");
  }

  return response.json();
};
