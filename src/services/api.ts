import axios from "axios";
import { User } from "../types/user";

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
};
