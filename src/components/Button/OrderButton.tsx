import styled from 'styled-components';
import { BaseButton } from './SharedButton';
import { FONT_SIZE } from '../../style_constants';

// 関数コンポーネントではなく、styled-componentsで作った関数
// propsや関数が不要な場合にはこれだけでもOK
export const OrderButton = styled(BaseButton)`
  width: 390px;
  background-color: black;
  color: white;
  border-style: none;
  padding: 8px 16px;
  font-size: ${FONT_SIZE.BODY1};
`;