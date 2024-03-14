import styles from "./CommentCard.module.css"
import dateConverter from "../../utils/dateConverter";
import { useEffect, useState } from "react";
import { getUserInfo } from "../../utils/apis";

const CommentCard = ({comment}) => {
    const [commentAuthorInfo, setCommentAuthorInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setIsLoading(true)
        getUserInfo(comment.author).then((userInfo) => {
            setCommentAuthorInfo(userInfo);
            setIsLoading(false);
        })
    }, [])

    return (
        <li className={styles["comment-card-container"]}>
            <div className={styles["comment-author-container"]}>
                {isLoading ? <p className={styles["loading-avatar"]}>Loading {comment.author} avatar...</p> : <>
                <img src={commentAuthorInfo.avatar_url} className={styles["comment-user-avatar"]}/>
                <p className={styles["comment-user-username"]}>{commentAuthorInfo.username}</p></>
                }

            </div>
            <div className={styles["comment-info-container"]}>
                <div className={styles["comment-date-delete-container"]}>
                    <p className={styles["date-made"]}>{ comment.created_at ? dateConverter(String(comment.created_at)): null}</p>
                </div>
                <p className={styles["comment-body"]}>{comment.body}</p>
            </div>
        </li>
    );
};

export default CommentCard;