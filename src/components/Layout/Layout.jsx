import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'


export default function Layout() {
  return (
    <>
    <Sidebar/>
    <div className='min-h-screen ml-20'>
    <Outlet/> 
    </div>
    
    </>
  )
}
  