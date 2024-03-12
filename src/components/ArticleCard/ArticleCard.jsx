import styles from "./ArticleCard.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticleById, getUserInfo } from "../../utils/apis";

const ArticleCard = () => {
    const [article, setArticle] = useState({});
    const [authorInfo, setAuthorInfo] = useState({});
    const { article_id } = useParams();

    useEffect(() => {
        getArticleById(article_id).then((article) => {
            setArticle(article);
            getUserInfo(article.author).then((authorInfo) => {
                setAuthorInfo(authorInfo);
            });
        });
    }, []);

    return (
        <div className={styles["article-card-container"]}>
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
            <p className={styles["article-card-body"]}>{article.body}</p>
            <div className={styles["article-card-vote-count"]}>
                Votes: {article.votes}
            </div>
        </div>
    );
};

export default ArticleCard;
