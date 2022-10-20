import styled from 'styled-components';
import { StyledText } from './StyledText';
import { COLORS } from '../style_constants';
import { FC } from 'react';
import { Food } from '../types/food';

const Wrapper = styled.div`
  display: flex;
  width: 450px;
  height: 180px;
  border-width: 1px;
  border-style: solid;
  border-color: ${COLORS.BORDER};
  border-image: initial;
  cursor: pointer;
`;

const FoodDetail = styled.div`
  padding: 24px 16px;
  width: 250px;
`;

const DescriptionWrapper = styled.div`
  height: 75px;
`

const PriceWrapper = styled.div`
  margin-top: 16px;
`

const FoodImageNode = styled.img`
  width: 250px;
`;

type Props = {
  food: Food
  onClickFoodWrapper: (food: Food) => void
  imageUrl: string
}

export const FoodWrapper: FC<Props> = (props) => {
  const {food, onClickFoodWrapper, imageUrl,} = props
  return (
    <Wrapper onClick={() => onClickFoodWrapper(food)}>
      <FoodDetail>
        {food.name}
        <DescriptionWrapper>
          <StyledText>
            {food.description}
          </StyledText>
        </DescriptionWrapper>
        <PriceWrapper>
          ¥{food.price}
        </PriceWrapper>
      </FoodDetail>
      <FoodImageNode src={imageUrl} />
    </Wrapper>
  )
}