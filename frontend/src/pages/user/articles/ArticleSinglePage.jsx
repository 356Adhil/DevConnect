import React from 'react'
import SingleArticle from '../../../components/user/articles/SingleArticle'
import Navbar from '../../../components/user/navbar/Navbar'

function ArticleSinglePage() {
  return (
    <div>
        <div className='mt-20 p-5'>
        <SingleArticle />
        </div>
      <Navbar />
    </div>
  )
}

export default ArticleSinglePage
