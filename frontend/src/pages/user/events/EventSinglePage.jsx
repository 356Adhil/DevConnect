import React from 'react'
import EventView from '../../../components/user/events/EventView'
import Navbar from '../../../components/user/navbar/Navbar'

function EventSinglePage() {
  return (
    <>
      <div className='mt-10'>
      <EventView />
      </div>
      <Navbar />
    </>
  )
}

export default EventSinglePage
