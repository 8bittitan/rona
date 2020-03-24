import fetch from 'isomorphic-unfetch'

import Header from '../components/Header'
import Stats from '../components/Stats'

const Home = ({ stats }) => (
  <main>
    <Header />
    <Stats stats={stats} />
  </main>
)

export async function getServerSideProps() {
  const res = await fetch('https://covid19.mathdro.id/api')
  const data = await res.json()

  return {
    props: {
      stats: data,
    },
  }
}

export default Home
