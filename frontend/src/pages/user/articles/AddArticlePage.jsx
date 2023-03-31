import React from 'react'
import AddArticle from '../../../components/user/articles/AddArticle'
import Navbar from '../../../components/user/navbar/Navbar'

function AddArticlePage() {
  return (
    <div>
      <div className='mt-20'>
      <AddArticle />
      </div>
      <Navbar />
    </div>
  )
}

export default AddArticlePage
