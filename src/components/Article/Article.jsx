import { useSearchParams } from "react-router-dom";
import ArticleCard from "../ArticleCard.jsx/ArticleCard";
import CommentsList from "../CommentsList/CommentsList";

const Article = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <div>
            Article
            <ArticleCard />
            <CommentsList />
        </div>
    );
};

export default Article;