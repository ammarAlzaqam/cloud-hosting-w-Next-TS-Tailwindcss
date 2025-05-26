import { UserDocument } from "@/models/user";
import { API_DOMAIN } from "@/utils/constants";
import axios from "axios";

// get user data
export async function getUserData(cookie: any) {
  try {
    const response = await axios.get(
      `${API_DOMAIN}/users/profile`,
      {
        headers: {
          Cookie: cookie,
        },
      }
    );

    if (response.status !== 200) {
      return null;
    }
    
    return response.data;
  } catch (e) {
    console.log(`Can't fetching user data: ${(e as Error).message}`);
    return null;
  }
}

// get user data
export async function getUserDataClient(setCurrentUser: any) {
  try {
    const response = await axios.get(`${API_DOMAIN}/users/profile`);

    if (response.status !== 200) {
      return null;
    }

    setCurrentUser(response.data);
  } catch (e) {
    console.log(`Can't fetching user data: ${(e as Error).message}`);
    return null;
  }
}
