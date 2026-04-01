import React from 'react'
import Landing from '../component/Homepage/Landing'
import TeamTools from '../component/Homepage/TeamTools'
import CrossPlatform from '../component/Homepage/CrossPlatform'
import GetStarted from '../component/Homepage/GetStarted'
import PaywallSection from '../component/Homepage/PaywallSection'

const Home = () => {
  return (
    <div>
      <Landing/>
      <TeamTools/>
      <CrossPlatform/>
      <GetStarted/>
      <PaywallSection/>
    </div>
  )
}

export default Home
