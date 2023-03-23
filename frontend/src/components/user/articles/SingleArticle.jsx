import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import profile from "../../../assets/Profile.jpg";
import articleCover from "../../../assets/articleCover.webp";


function SingleArticle() {

    const location = useLocation();
    const article = location.state.article;
  
    return (

      <div className="max-w-3xl mx-auto my-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={profile}
            alt={article.userName}
            className="w-10 h-10 rounded-full mr-4"
          />
          <div>
            <p className="text-gray-700 font-medium">{article.userName}</p>
            <p className="text-gray-500 text-sm">{article.createdDate}</p>
          </div>
        </div>
        <div>
          <FontAwesomeIcon icon={faBookmark} className="text-gray-500" />
        </div>
      </div>
      <h1 className="text-3xl font-bold my-4">{article.title}</h1>
      <img src={articleCover} alt={article.title} className="w-full h-64 object-cover" />
      <div className="mt-4 prose">
        <p>{article.content}</p>
      </div>
    </div>
    );
}

export default SingleArticle
