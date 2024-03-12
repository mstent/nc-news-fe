import React, { useState } from 'react';
import ArticleListCard from '../ArticleListCard/ArticleListCard';
import { useEffect } from 'react';
import {getArticles} from '../../utils/apis';
import styles from './ArticlesList.module.css'

const ArticlesList = () => {
    const [articlesList, setArticlesList] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getArticles().then((data) => {
            setArticlesList(data);
        })
        setIsLoading(false);
    }, [])

    return (
        <div className={styles["article-list-container"]}>
            <ul>
                {articlesList.map((article) => {
                    return <ArticleListCard key={article.article_id} article={article}/>
                })}
            </ul>

        </div>
    );
};

export default ArticlesList;