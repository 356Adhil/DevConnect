import axios from '../../../axios';
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

function SingleArticle() {
    const { id } = useParams();
    const [article, setArticle] = useState({});
  
    useEffect(() => {
      axios
        .get(`/articles/${id}`)
        .then((response) => setArticle(response.data))
        .catch((error) => console.log(error));
    }, [id]);
  
    return (
      <div className="mx-auto max-w-7xl py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">{article.title}</h1>
        <p className="mt-2 text-gray-500">{article.publishedAt}</p>
        <div className="mt-6 prose prose-lg text-gray-500">
          {article.content}
        </div>
      </div>
    );
}

export default SingleArticle
