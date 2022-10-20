import axios, { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { REQUEST_STATE } from "../constants";
import { Food } from "../types/food";
import { Line } from "../types/linefood";

import { lineFoods, lineFoodsReplace } from "../urls";

type Props = {
  food: Food | null;
  count: number;
};

export const useLineFood = () => {
  const [lines, setLines] = useState<Line | null>(null);
  const [fetchState, setFetchState] = useState(REQUEST_STATE.INITIAL);
  const [errors, setErrors] = useState<AxiosError>();
  const navigate = useNavigate();

  const getLines = useCallback(() => {
    setFetchState(REQUEST_STATE.LOADING);
    axios
      .get(lineFoods)
      .then((res) => {
        setLines(res.data);
        setFetchState(REQUEST_STATE.OK);
      })
      .catch((e) => {
        throw e;
      });
  }, []);

  const postLines = useCallback(
    (params: Props) => {
      const foodId = params.food ? params.food.id : 0;
      console.log(foodId)
      axios
        .post(lineFoods, {
          food_id: foodId,
          count: params.count,
        })
        .then((res) => {
          navigate("/orders");
        })
        .catch((e) => {
          setErrors(e);
        });
    },
    [navigate]
  );

  const putReplaceLines = useCallback(
    (params: Props) => {
      const foodId = params.food ? params.food.id : 0;
      axios
        .put(lineFoodsReplace, {
          food_id: foodId,
          count: params.count,
        })
        .then((res) => {
          navigate("/orders");
        })
        .catch((e) => {
          setErrors(e);
        });
    },
    [navigate]
  );
  return { getLines, postLines, putReplaceLines, fetchState, lines, errors };
};
