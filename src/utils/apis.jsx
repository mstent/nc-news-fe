import axios from "axios";

const ncNewsApi = axios.create({
    baseURL: "https://nc-news-23re.onrender.com/api",
});

const getArticles = () => {
    return ncNewsApi
        .get("/articles", {
            params: {
                limit: "null",
            },
        })
        .then(({ data }) => data.articles);
};

const getUserInfo = (username) => {
    return ncNewsApi.get(`/users/${username}`).then(({ data }) => data.user);
};

const getArticleById = (article_id) => {
    return ncNewsApi
        .get(`/articles/${article_id}`)
        .then(({ data }) => data.article);
};

const getComments = (article_id) => {
    return ncNewsApi
        .get(`/articles/${article_id}/comments`)
        .then(({ data }) => data.comments);
};

const upvote = (article_id) => {
    return ncNewsApi
        .patch(`/articles/${article_id}`, { inc_votes: 1 })
        .then(({ data }) => data.article);
};

const removeVote = (article_id) => {
    return ncNewsApi
        .patch(`/articles/${article_id}`, { inc_votes: -1 })
        .then(({ data }) => data.article);
};

const postComment = (article_id, username, postBody) => {
    return ncNewsApi
        .post(`/articles/${article_id}/comments`, {
            username: username,
            body: postBody,
        })
        .then(({ data }) => data.comment);
};

const deleteComment = (comment_id) => {
    return ncNewsApi.delete(`/comments/${comment_id}`).catch((err) => {
        return { error: err };
    });
};

export {
    getArticles,
    getUserInfo,
    getArticleById,
    getComments,
    upvote,
    removeVote,
    postComment,
    deleteComment,
};
