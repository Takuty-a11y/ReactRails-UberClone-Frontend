import axios from "axios";
import { useCallback, useState } from "react";
import { Restaurant } from "../types/restaurant";
import { restaurantsIndex } from "../urls";

export const useRestaurant = () => {
  const [loading, setLoading] = useState(false);
  const [restaurants, setRestaurants] = useState<Array<Restaurant>>([]);

  const getRestaurants = useCallback(() => {
    setLoading(true);
    axios
      .get(restaurantsIndex)
      .then((res) => {
        setRestaurants(res.data.restaurants);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return { getRestaurants, loading, restaurants };
};
