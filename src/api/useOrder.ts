import axios from "axios";
import { useCallback, useState } from "react";
import { REQUEST_STATE } from "../constants";
import { ordersPost } from "../urls";

type Props = {
  line_food_ids: Array<number>;
};

export const useOrder = () => {
  const [postState, setPostState] = useState(REQUEST_STATE.INITIAL);

  const postOrder = useCallback((params: Props) => {
    setPostState(REQUEST_STATE.LOADING);
    axios
      .post(ordersPost, {
        line_food_ids: params?.line_food_ids,
      })
      .then(() => {
        setPostState(REQUEST_STATE.OK);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);
  return { postOrder, postState };
};
