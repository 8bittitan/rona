import styled from '@emotion/styled'

const StyledHeader = styled.header`
  background-color: #26262f;
  padding: 0.5rem 5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    letter-spacing: 0.075em;
  }

  @media screen and (min-width: 660px) {
    padding: 0.5rem 10rem;
  }
`

const Header = () => (
  <StyledHeader>
    <h1>CoronaVirus stats</h1>
  </StyledHeader>
)

export default Header
