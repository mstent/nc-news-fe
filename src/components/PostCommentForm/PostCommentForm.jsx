import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/User";
import styles from "./PostCommentForm.module.css";
import { useState } from "react";
import { postComment } from "../../utils/apis";
import CommentCard from "../CommentCard/CommentCard";

const PostCommentForm = ({ article_id }) => {
    const commentAuthor = useContext(UserContext).user;
    const [newComment, setNewComment] = useState("");

    const [addedComment, setAddedComment] = useState([]);

    const handleNewComment = (e) => {
        setNewComment(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newComment !== "") {
            postComment(article_id, commentAuthor.username, newComment);
            setAddedComment((curr) => {
                const previousComments = [...curr];
                const newCommentInfo = {
                    comment_id: Date(),
                    body: newComment,
                    article_id: article_id,
                    author: commentAuthor.username,
                    votes: 0,
                    created_at: null,
                };
                return [
                    <CommentCard comment={newCommentInfo} key={Date.now()} />, previousComments
                ];
            });
            setNewComment('');
        }
    };


    return (
        <>
            <form
                className={styles["post-comment-main-container"]}
                onSubmit={handleSubmit}
            >
                <div className={styles["post-comment-upper-row"]}>
                    <img
                        src={useContext(UserContext).user.avatar_url}
                        alt="user avatar"
                        className={styles["user-avatar"]}
                    />
                    <button className={styles["btn-post-comment"]}>
                        Post Comment
                    </button>
                </div>
                <textarea
                    placeholder="new comment..."
                    className={styles["input-field"]}
                    onChange={handleNewComment}
                    value={newComment}
                />
            </form>
            {addedComment.length !== 0
                ? addedComment.map((comment) => {
                    return comment;
                })
                : null}
        </>
    );
};

export default PostCommentForm;
