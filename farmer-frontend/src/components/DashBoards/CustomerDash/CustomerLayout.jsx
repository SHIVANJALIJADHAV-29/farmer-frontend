import React from 'react'
import CustomerHeader from './CustomerHeader'
import { Outlet } from 'react-router-dom'
import CustomerFooter from './CustomerFooter'

const CustomerLayout = () => {
  return (
    <>
      <CustomerHeader/>
      <Outlet  />
      <CustomerFooter />
    </>
  )
}

export default CustomerLayout
