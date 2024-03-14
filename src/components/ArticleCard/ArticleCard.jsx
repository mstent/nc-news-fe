import styles from "./ArticleCard.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticleById, getUserInfo } from "../../utils/apis";
import dateConverter from "../../utils/dateConverter";
import { upvote, removeVote } from "../../utils/apis";

const ArticleCard = () => {
    const [article, setArticle] = useState({});
    const [authorInfo, setAuthorInfo] = useState({});
    const { article_id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [hasUpvoted, setHasUpvoted] = useState(false);
    const [articleVotes, setArticleVotes] = useState(0);

    useEffect(() => {
        setIsLoading(true);
        getArticleById(article_id).then((article) => {
            setArticle(article);
            setArticleVotes(article.votes);
            getUserInfo(article.author).then((authorInfo) => {
                setAuthorInfo(authorInfo);
                setIsLoading(false);
            });
        });
    }, []);

    const handleUpvote = (event) => {
        if (!hasUpvoted) {
            setHasUpvoted(true);
            setArticleVotes((currVotes) => currVotes + 1);
            upvote(article_id).catch((err) => {
                setArticleVotes((currVotes) => currVotes - 1);
            });
        } else if (hasUpvoted) {
            setHasUpvoted(false);
            setArticleVotes((currVotes) => currVotes -1);
            removeVote(article_id).catch((err) => {
                setArticleVotes((currVotes) => currVotes + 1)
            })
        }
        
    };

    return (
        <>
            {isLoading ? (
                <p className={styles["loading"]}>Loading Article...</p>
            ) : (
                <div className={styles["article-card-container"]}>
                    <button
                        className={
                            hasUpvoted
                                ? styles["btn-upvote-clicked"]
                                : styles["btn-upvote"]
                        }
                        onClick={handleUpvote}
                    >
                        {hasUpvoted? "upvoted" : "upvote"}
                    </button>
                    <div className={styles["article-card-author-info"]}>
                        <img
                            src={authorInfo.avatar_url}
                            alt=""
                            className={styles["article-author-avatar"]}
                        />
                        <h3 className={styles["article-card-author"]}>
                            {article.author}
                        </h3>
                    </div>
                    <h2 className={styles["article-card-title"]}>
                        {article.title}
                    </h2>
                    <p className={styles["article-card-body"]}>
                        {article.body}
                    </p>
                    <div className={styles["article-card-vote-count"]}>
                        Votes: {articleVotes}
                    </div>
                    <div className={styles["article-card-date"]}>
                        {dateConverter(String(article.created_at))}
                    </div>
                </div>
            )}
        </>
    );
};

export default ArticleCard;
