import axios from "axios";
import { useCallback, useState } from "react";
import { Food } from "../types/food";
import { foodsIndex } from "../urls";

export const useFood = () => {
  const [loading, setLoading] = useState(false);
  const [foods, setFoods] = useState<Array<Food>>([]);

  const getFoods = useCallback((restaurantId: string) => {
    setLoading(true);
    axios
      .get(foodsIndex(restaurantId))
      .then((res) => {
        setFoods(res.data.foods);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return { getFoods, loading, foods };
};
