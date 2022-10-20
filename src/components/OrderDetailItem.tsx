import { Fragment } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { LocalMall, QueryBuilder } from "@material-ui/icons";
import { FONT_SIZE } from "../style_constants";

const LineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AmountText = styled.p`
  font-size: ${FONT_SIZE.STAND_BODY};
  font-weight: bold;
`;

type Props = {
  restaurantId: number;
  restaurantName: string;
  restaurantFee: number;
  timeRequired: number;
  foodCount: number;
  price: number;
};

export const OrderDetailItem = (props: Props) => {
  const {
    restaurantId,
    restaurantName,
    restaurantFee,
    timeRequired,
    foodCount,
    price,
  } = props;
  return (
    <Fragment>
      <LineWrapper>
        <LocalMall />
        <Link to={`/restaurants/${restaurantId}/foods`}>{restaurantName}</Link>
      </LineWrapper>
      <LineWrapper>
        <QueryBuilder />
        {timeRequired}分で到着予定
      </LineWrapper>
      <LineWrapper>
        <p>商品数</p>
        <p>{foodCount}</p>
      </LineWrapper>
      <LineWrapper>
        <p>商品数:{foodCount}</p>
        <p>¥ {price}</p>
      </LineWrapper>
      <LineWrapper>
        <p>配送料</p>
        <p>¥ {restaurantFee}</p>
      </LineWrapper>
      <LineWrapper>
        <AmountText>合計</AmountText>
        <AmountText>¥ {price + restaurantFee}</AmountText>
      </LineWrapper>
    </Fragment>
  );
};
