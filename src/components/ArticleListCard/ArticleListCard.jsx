import { getUserInfo } from "../../utils/apis";
import styles from "./ArticleListCard.module.css";
import { useEffect, useState } from "react";
import dateConverter from "../../utils/dateConverter";
import { Link } from "react-router-dom";

const ArticleListCard = ({ article }) => {
    const [authorInfo, setAuthorInfo] = useState({});

    useEffect(() => {
        getUserInfo(article.author).then((authorData) => {
            setAuthorInfo(authorData);
        });
    }, []);

    return (
        <li className={styles["article-card-container"]}>
            <img
                src={article.article_img_url}
                alt="background article image"
                className={styles["article-background-img"]}
            />
            <div className={styles["article-card-author-info"]}>
                <img
                    src={authorInfo.avatar_url}
                    alt="user avatar"
                    className={styles["author-avatar"]}
                />
                <p className={styles["author-username"]}>
                    {authorInfo.username}
                </p>
            </div>
            <div className={styles["article-card-title-date"]}>
                <Link to={`/${article.article_id}`} className={styles["link"]}>
                    <h3 className={styles["article-title"]}>{article.title}</h3>
                </Link>
                <p className={styles["date-created"]}>
                    {dateConverter(article.created_at)}
                </p>
                <div className={styles["article-card-comments-votes"]}>
                    <div className={styles["comment-count"]}>
                        comments: {article.comment_count}
                    </div>
                    <div className={styles["vote-count"]}>
                        votes: {article.votes}
                    </div>
                </div>
            </div>
        </li>
    );
};

export default ArticleListCard;
