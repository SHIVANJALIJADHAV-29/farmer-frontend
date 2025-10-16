import React from 'react'
import FarmerHeader from './FarmerHeader'
import { Outlet } from 'react-router-dom'
import FarmerFooter from './FarmerFooter'

const FarmerLayout = () => {
  return (
    <>
      <FarmerHeader />
      <Outlet />
      <FarmerFooter />
    </>
  )
}

export default FarmerLayout
