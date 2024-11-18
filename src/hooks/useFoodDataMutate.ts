import axios from "axios";
import { FoodData } from "../interface/FoodData";
import { useMutation } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080/food';

export function useFoodDataMutate() {
    return useMutation({
        mutationFn: async (data: FoodData) => {
            const response = await axios.post(API_URL, data);
            return response.data;
        },
    });
}
