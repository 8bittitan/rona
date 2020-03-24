import styled from '@emotion/styled'
import Link from 'next/link'

const StyledHeader = styled.header`
  background-color: #26262f;
  padding: 0.5rem 10rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    letter-spacing: 0.075em;
  }

  a {
    color: #0090e7;
    text-decoration: none;
    background-color: rgba(255, 255, 255, 0.05);
    padding: 0.45em 0.85rem;
    border-radius: 0.5em;
    text-transform: uppercase;
    font-weight: 300;
    letter-spacing: 0.05em;
  }
`

const Header = () => (
  <StyledHeader>
    <h1>CoronaVirus stats</h1>
    <Link href="/countries">
      <a>View countries</a>
    </Link>
  </StyledHeader>
)

export default Header
