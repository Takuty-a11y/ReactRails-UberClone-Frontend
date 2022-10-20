import { Restaurant } from "./restaurant";

export type Line = {
  line_food_ids: Array<number>;
  restaurant: Restaurant;
  count: number;
  amount: number;
};
