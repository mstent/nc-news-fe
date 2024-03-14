import CommentCard from "../CommentCard/CommentCard";
import PostCommentForm from "../PostCommentForm/PostCommentForm";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getComments } from "../../utils/apis";
import styles from "./CommentsList.module.css";

const CommentsList = () => {
    const [commentsListArr, setCommentsListArr] = useState([]);
    const { article_id } = useParams();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getComments(article_id).then((comments) => {
            setCommentsListArr(comments);
            setIsLoading(false);
        });
    }, []);

    return (
        <div>
            CommentsList
            {isLoading ? (
                <p className={styles["loading"]}>Loading Comments...</p>
            ) : (
                <>
                    <h2 className={styles["comments-header"]}>Comments</h2>
                    <ul className={styles["comments-list-container"]}>
                    <PostCommentForm article_id={article_id}/>
                        {commentsListArr.map((comment) => {
                            return (
                                <CommentCard
                                    comment={comment}
                                key={comment.comment_id}/>
                            );
                        })}
                    </ul>
                </>
            )}
        </div>
    );
};

export default CommentsList;
