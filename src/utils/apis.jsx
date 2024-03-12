import axios from 'axios';

const ncNewsApi = axios.create({
    baseURL: "https://nc-news-23re.onrender.com/api"
})

const getArticles = () => {
    return ncNewsApi.get('/articles', {
        params: {
            limit: "null"
        }
    })
    .then(({data}) => data.articles);
}

const getUserInfo = (username) => {
    return ncNewsApi.get(`/users/${username}`)
    .then(({data}) => data.user)
}

const getArticleById = (article_id) => {
    return ncNewsApi.get(`/articles/${article_id}`)
    .then(({data}) => data.article);
}

export {getArticles, getUserInfo, getArticleById}