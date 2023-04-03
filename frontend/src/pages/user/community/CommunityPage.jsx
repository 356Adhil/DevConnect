import React from 'react'
import Navbar from '../../../components/user/navbar/Navbar'
import Community from '../../../components/user/community/Community'
import Footer from '../../../components/user/footer/Footer'

function CommunityPage() {
  return (
    <div className='min-h-screen flex flex-col'> {/* Set the container to the full height of the viewport */}
      <div className='flex-grow mt-24 mb-24'>
        <Community />
      </div>
      <Navbar />
      <div className='mt-auto'>
        <Footer />
      </div>
    </div>
  )
}

export default CommunityPage
