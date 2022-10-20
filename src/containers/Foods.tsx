import { Fragment, memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Skeleton } from "@material-ui/lab";
import styled from "styled-components";
import { useFood } from "../api/useFood";
import FoodImage from "../images/food-image.jpg";
import { FoodWrapper } from "../components/FoodWrapper";
import { Food } from "../types/food";
import { FoodOrderDialog } from "../components/FoodOrderDialog";
import { NewOrderConfirmDialog } from "../components/NewOrderConfirmDialog";
import { useLineFood } from "../api/useLineFood";
import { HTTP_STATUS_CODE } from "../constants";
import { LineError } from "../types/lineError";

type URLParam = {
  restaurantid?: string;
};

const FoodsList = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 50px;
`;

const ItemWrapper = styled.div`
  margin: 16px;
`;

export const Foods = memo(() => {
  const params = useParams<URLParam>();
  const { getFoods, loading, foods } = useFood();
  const { postLines, putReplaceLines, errors } = useLineFood();
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [selectedFoodCount, setSelectedFoodCount] = useState(1);
  const [existingResutaurautName, setExistingResutaurautName] = useState('');
  const [newResutaurautName, setNewResutaurautName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);

  useEffect(() => {
    if (params.restaurantid) {
      getFoods(params.restaurantid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedFood(null);
    setSelectedFoodCount(1);
  };
  const onClickFood = (food: Food) => {
    setSelectedFood(food);
    setIsDialogOpen(true);
  };
  const onClickFoodCountUp = () => {
    setSelectedFoodCount(selectedFoodCount + 1);
  };
  const onClickFoodCountDown = () => {
    setSelectedFoodCount(selectedFoodCount - 1);
  };
  const onClickSubmitOrder = () => {
    postLines({
      food: selectedFood,
      count: selectedFoodCount
    })
    if (errors?.response?.status === HTTP_STATUS_CODE.NOT_ACCEPTABLE) {
      setIsDialogOpen(false)
      setIsNewDialogOpen(true)
      const errData = errors.response.data as LineError
      if (errData) {
        setExistingResutaurautName(errData.existing_restaurant);
        setNewResutaurautName(errData.new_restaurant);
      }
    }
  };
  const onClickSubmitNewOrder = () => {
    putReplaceLines({
      food: selectedFood,
      count: selectedFoodCount
    })
  };

  return (
    <>
      <FoodsList>
        {loading ? (
          <Fragment>
            {[...Array(12)].map((i) => (
              <ItemWrapper key={i}>
                <Skeleton key={i} variant="rect" width={450} height={180} />
              </ItemWrapper>
            ))}
          </Fragment>
        ) : (
          foods.map((food, index) => (
            <ItemWrapper key={index}>
              <FoodWrapper
                food={food}
                onClickFoodWrapper={(food) => onClickFood(food)}
                imageUrl={FoodImage}
              />
            </ItemWrapper>
          ))
        )}
      </FoodsList>
      {isDialogOpen && (
        <FoodOrderDialog
          food={selectedFood}
          countNumber={selectedFoodCount}
          isOpen={isDialogOpen}
          onClose={() => onCloseDialog()}
          onClickCountUp={() => onClickFoodCountUp()}
          onClickCountDown={() => onClickFoodCountDown()}
          onClickOrder={() => onClickSubmitOrder()}
        />
      )}
      {isNewDialogOpen && (
        <NewOrderConfirmDialog
          isOpen={isNewDialogOpen}
          onClose={() => setIsNewDialogOpen(false)}
          existingResutaurautName={existingResutaurautName}
          newResutaurautName={newResutaurautName}
          onClickSubmit={() => onClickSubmitNewOrder()}
        />
      )}
    </>
  );
});
