import { FC, memo, ReactNode } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MainLogo from '../images/logo.png';

type Props = {
  children: ReactNode
}

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 8px 32px;
`;

const MainLogoImage = styled.img`
  height: 90px;
`

export const HeaderLayout: FC<Props> = memo((props) => {
  const {children} = props
  return (
    <>
      <HeaderWrapper>
        <Link to="/restaurants">
          <MainLogoImage src={MainLogo} alt="main logo" />
        </Link>
      </HeaderWrapper>
      {children}
    </>
  )

})