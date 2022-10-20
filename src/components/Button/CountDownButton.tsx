import { FC } from 'react';
import { RoundButton } from './SharedButton';

type Props = {
  onClick: () => void
  isDisabled: boolean
}

export const CountDownButton: FC<Props> = (props) => {
  const {onClick, isDisabled} = props
  return (
    <RoundButton onClick={onClick} disabled={isDisabled}>
      ー
    </RoundButton>
  )
}