import React from 'react'
import Corprate from '../Corprate'
import Banner from './Banner'
import PricePage from './PricingPage'
import ProductShowcase from './ProductShowcase'
import ContactUs from './ContactusPage'
import LocationPage from './LocationPage'
import Footer from './Footer'
import { Suspense } from 'react'

function Homepage() {
  return (
   <Corprate>
    <Suspense fallback={<p>Loading...</p>}>
    <Banner/>
    </Suspense>
    <ProductShowcase/>
    <PricePage/>
    <ContactUs/>
    <LocationPage/>
   </Corprate>
  )
}

export default Homepage