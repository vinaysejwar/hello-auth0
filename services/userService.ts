import axios from "../app/lib/axios";

export const getUsers = async () => {
  try {
    const response = await axios.get("/randomusers");

    
    // adjust based on what the response looks like
    console.log("API Response:", response.data.data);
    return response.data.data || []; // example: if users are under `data`
  } catch (error: unknown) {
    if (error && typeof error === "object" && "response" in error) {
      const err = error as { response?: { data?: { message?: string } } };
      const message = err.response?.data?.message || "Something went wrong";
      throw new Error(message);
    }
  
    throw new Error("Something went wrong");
  }
};