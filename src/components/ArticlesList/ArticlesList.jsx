import React, { useState } from "react";
import ArticleListCard from "../ArticleListCard/ArticleListCard";
import { useEffect } from "react";
import { getArticles } from "../../utils/apis";
import styles from "./ArticlesList.module.css";

const ArticlesList = ({ searchParams }) => {
    const [articlesList, setArticlesList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const topic = searchParams.get("topic");
    const sortBy = searchParams.get("sort_by");
    const orderBy = searchParams.get("order");

    useEffect(() => {
        setIsLoading(true);
        getArticles(topic, sortBy, orderBy).then((data) => {
            setArticlesList(data);
        });
        setIsLoading(false);
    }, [topic, sortBy, orderBy]);

    return (
        <>
            {isLoading ? (
                <p className={styles["article-loading"]}>Loading...</p>
            ) : (
                <div className={styles["article-list-container"]}>
                    <ul>
                        {articlesList.map((article) => {
                            return (
                                <ArticleListCard
                                    key={article.article_id}
                                    article={article}
                                />
                            );
                        })}
                    </ul>
                </div>
            )}
        </>
    );
};

export default ArticlesList;
