import styled from '@emotion/styled'

const Wrapper = styled.div`
  display: grid;
  gap: 2rem;

  @media screen and (min-width: 1270px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const Article = styled.article`
  text-align: center;
  background-color: #26262f;
  padding: 2rem;
  border-radius: 0.25em;
  box-shadow: 0 1px 6px rgba(255, 255, 255, 0.035);

  header {
    font-size: 3rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 1.5rem;
    margin: 0;
  }
`

const Stats = ({ stats, isFindingNewStats = false }) => (
  <Wrapper>
    {isFindingNewStats ? (
      <p>Loading new stats</p>
    ) : (
      <>
        <Article>
          <header>Confirmed</header>
          <p>{stats.confirmed.value.toLocaleString('en-US')}</p>
        </Article>
        <Article>
          <header>Recovered</header>
          <p>{stats.recovered.value.toLocaleString('en-US')}</p>
        </Article>
        <Article>
          <header>Deaths</header>
          <p>{stats.deaths.value.toLocaleString('en-US')}</p>
        </Article>
      </>
    )}
  </Wrapper>
)

export default Stats
