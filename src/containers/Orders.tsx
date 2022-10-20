import { Fragment, memo, useEffect } from "react";
import { useLineFood } from "../api/useLineFood";
import { REQUEST_STATE } from "../constants";
import styled from "styled-components";
import { CircularProgress } from "@material-ui/core";
import { useOrder } from "../api/useOrder";
import { OrderButton } from "../components/Button/OrderButton";
import { OrderDetailItem } from "../components/OrderDetailItem";

const OrderListWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const OrderItemWrapper = styled.div`
  margin-bottom: 50px;
`;

export const Orders = memo(() => {
  const { getLines, lines, fetchState } = useLineFood();
  const { postOrder, postState } = useOrder();

  useEffect(() => {
    getLines();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const postLineFoods = () => {
    const ids = lines?.line_food_ids ?? [];
    postOrder({ line_food_ids: ids });
    window.location.reload();
  };

  const orderButtonLabel = () => {
    switch (postState) {
      case REQUEST_STATE.LOADING:
        return "注文中...";
      case REQUEST_STATE.OK:
        return "注文が完了しました！";
      default:
        return "注文を確定する";
    }
  };

  return (
    <Fragment>
      <OrderListWrapper>
        <div>
          <OrderItemWrapper>
            {
              // APIローディング中はくるくる回るローディングコンポーネントを表示
              fetchState === REQUEST_STATE.LOADING ? (
                <CircularProgress />
              ) : (
                lines && (
                  <OrderDetailItem
                    restaurantFee={lines.restaurant.fee}
                    restaurantName={lines.restaurant.name}
                    restaurantId={lines.restaurant.id}
                    timeRequired={lines.restaurant.time_required}
                    foodCount={lines.count}
                    price={lines.amount}
                  />
                )
              )
            }
          </OrderItemWrapper>
          <div>
            {fetchState === REQUEST_STATE.OK && lines && (
              <OrderButton
                onClick={() => postLineFoods()}
                disabled={
                  postState === REQUEST_STATE.LOADING ||
                  postState === REQUEST_STATE.OK
                }
              >
                {orderButtonLabel()}
              </OrderButton>
            )}
            {fetchState === REQUEST_STATE.OK && !lines && (
              <p>注文予定の商品はありません。</p>
            )}
          </div>
        </div>
      </OrderListWrapper>
    </Fragment>
  );
});
