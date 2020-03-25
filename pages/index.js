import fetch from 'isomorphic-unfetch'
import { useState } from 'react'
import styled from '@emotion/styled'
import Head from 'next/head'

import CountrySelector from '../components/CountrySelector'
import Header from '../components/Header'
import Stats from '../components/Stats'

const getCountries = async () => {
  const res = await fetch('https://covid19.mathdro.id/api/countries')

  return res.json()
}

const getStats = async (country = '') => {
  const endpoint =
    country !== ''
      ? `https://covid19.mathdro.id/api/countries/${country}`
      : 'https://covid19.mathdro.id/api'
  const res = await fetch(endpoint)

  return res.json()
}

const Container = styled.main`
  margin: 4rem auto;
  width: 90%;

  @media screen and (min-width: 1270px) {
    width: 70%;
  }
`

const Home = ({ stats, countries }) => {
  const [currentStats, setCurrentStats] = useState(stats)
  const [currentCountry, setCurrentCountry] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const updateStats = async evt => {
    setLoading(true)
    setError('')

    const newCountryIso = evt.target.value
    try {
      const newStats = await getStats(newCountryIso)

      setCurrentCountry(newCountryIso)
      setCurrentStats(newStats)
    } catch (err) {
      console.error(err)
      setError('No records found for that country.')
    }
    setLoading(false)
  }

  const getCountryName = () => {
    let name = 'Global'

    if (currentCountry !== '' && countries.countries.length) {
      const c = countries.countries.find(
        country => country.iso3 === currentCountry,
      )

      if (c && c.name) {
        name = c.name
      }
    }

    return name
  }

  return (
    <div>
      <Head>
        <meta property="og:title" content="Corona Virus Stats" />
        <meta
          property="og:description"
          contetnt="Up to date Corona Virus stats from around the world."
        />
        <meta property="og:image" content="https://covid19.mathdro.id/api/og" />
        <meta property="og:url" content="https://rona19.now.sh" />
        <meta property="og:type" content="website" />
      </Head>
      <Header />
      <Container>
        <CountrySelector
          currentCountry={currentCountry}
          updateStats={updateStats}
          countries={countries.countries}
        />
        <h2>{getCountryName()}</h2>
        {error === '' && (
          <Stats stats={currentStats} isFindingNewStats={loading} />
        )}
        {error !== '' && <p>{error}</p>}
      </Container>
    </div>
  )
}

export async function getServerSideProps() {
  const c = getCountries()
  const s = getStats()

  const [countries, stats] = await Promise.all([c, s])

  return {
    props: {
      stats,
      countries,
    },
  }
}

export default Home
