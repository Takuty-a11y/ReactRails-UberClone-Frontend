import { Foods } from "../containers/Foods";
import { Orders } from "../containers/Orders";
import { Restaurants } from "../containers/Restaurants";

export const RoutePaths = [
  {
    path: "restaurants",
    children: <Restaurants />,
  },
  {
    path: "foods",
    children: <Foods />,
  },
  {
    path: "restaurants/:restaurantid/foods",
    children: <Foods />,
  },
  {
    path: "orders",
    children: <Orders />,
  },
];