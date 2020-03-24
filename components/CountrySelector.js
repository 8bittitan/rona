import styled from '@emotion/styled'

const Container = styled.div`
  width: 70%;
  margin: 4rem auto 0;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5em;
`

const StyledSelect = styled.select`
  background-color: #44474f;
  border: 0;
  padding: 0.25em 0.5em;
  color: inherit;
  border-radius: 0.15em;
`

const CountrySelector = ({ currentCountry, updateStats, countries }) => (
  <Container>
    <Label htmlFor="country">Filter by country</Label>
    <StyledSelect
      name="country"
      id="country"
      defaultValue={currentCountry}
      onChange={updateStats}
    >
      {countries.map(({ name, iso3: iso, iso2 }) => (
        <option key={iso2} value={iso}>
          {name}
        </option>
      ))}
    </StyledSelect>
  </Container>
)

export default CountrySelector
