import { FC } from 'react';
import { RoundButton } from './SharedButton';

type Props = {
  onClick: () => void
  isDisabled: boolean
}

export const CountUpButton: FC<Props> = (props) => {
  const {onClick, isDisabled} = props
  return (
    <RoundButton onClick={onClick} disabled={isDisabled}>
      ＋
    </RoundButton>
  )
}