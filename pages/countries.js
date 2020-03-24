import fetch from 'isomorphic-unfetch'
import { useState } from 'react'

import Header from '../components/Header'
import CountrySelector from '../components/CountrySelector'
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

const Countries = ({ countries, stats }) => {
  const [currentStats, setCurrentStats] = useState(stats)
  const [currentCountry, setCurrentCountry] = useState('USA')
  const [loading, setLoading] = useState(false)

  const updateStats = async evt => {
    setLoading(true)

    const newCountryIso = evt.target.value
    const newStats = await getStats(newCountryIso)

    setCurrentCountry(newCountryIso)
    setCurrentStats(newStats)
    setLoading(false)
  }

  return (
    <main>
      <Header />
      <CountrySelector
        currentCountry={currentCountry}
        updateStats={updateStats}
        countries={countries.countries}
      />
      <Stats stats={currentStats} isFindingNewStats={loading} />
    </main>
  )
}

export async function getServerSideProps() {
  const c = getCountries()
  const s = getStats('USA')

  const [countries, stats] = await Promise.all([c, s])

  return {
    props: {
      stats,
      countries,
    },
  }
}

export default Countries
