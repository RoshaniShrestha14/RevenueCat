import React from 'react'
import Landing from '../component/Homepage/Landing'
import TeamTools from '../component/Homepage/TeamTools'
import CrossPlatform from '../component/Homepage/CrossPlatform'
import GetStarted from '../component/Homepage/GetStarted'
import PaywallSection from '../component/Homepage/PaywallSection'
import OptimizeSection from '../component/Homepage/OptimizeSection'
import ABTesting from '../component/Homepage/ABTesting'
import CaseStudyHighlight from '../component/Homepage/CaseStudyHighlight'
import Growth from '../component/Homepage/Growth'
import GrowthTestimonial from '../component/Homepage/GrowthTestimonial'
import Retention from '../component/Homepage/Retention'
import TrustedSection from '../component/Homepage/TrustedSection'

const Home = () => {
  return (
    <div>
      <Landing/>
      <TeamTools/>
      <CrossPlatform/>
      <GetStarted/>
      <PaywallSection/>
      <OptimizeSection/>
      <ABTesting/>
      <CaseStudyHighlight/>
      <Growth/>
      <GrowthTestimonial/>
      <Retention  />
      <TrustedSection />
    </div>
  )
}

export default Home
