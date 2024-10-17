import axios from "axios";
import { Toast } from "../hooks/use-toast";

export const fetchPokemonData = async <T>(urls: string | string[], toast?: (props: Toast) => void): Promise<T[]> => {
  try {
    const urlsArray = Array.isArray(urls) ? urls : [urls];
    const responses = await Promise.all(urlsArray.map((url) => axios.get<T>(url)));
    return responses.map((response) => response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
    if (toast) {
      toast({
        title: "Error",
        description: "Failed to fetch data. Please try again.",
        variant: "destructive",
      });
    }
    throw new Error(errorMessage);
  }
};
