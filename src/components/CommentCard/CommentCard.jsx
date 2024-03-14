import styles from "./CommentCard.module.css"
import dateConverter from "../../utils/dateConverter";
import { useEffect, useState } from "react";
import { getUserInfo, deleteComment} from "../../utils/apis";
import { useContext } from "react";
import { UserContext } from "../../contexts/User";

const CommentCard = ({comment}) => {
    const user = useContext(UserContext).user;
    const [commentAuthorInfo, setCommentAuthorInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true)
    const [isDeletedComment, setIsDeletedComment] = useState(false);
    
    useEffect(() => {
        setIsLoading(true)
        getUserInfo(comment.author).then((userInfo) => {
            setCommentAuthorInfo(userInfo);
            setIsLoading(false);
        })
    }, [])

    const handleDelete = (e) => {
        deleteComment(comment.comment_id)
        setIsDeletedComment(true);
    }

    return (
        isDeletedComment ? <p className={styles["deleted-comment"]}>Comment Deleted</p> : 
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
                {user.username === commentAuthorInfo.username ? <button className={styles["btn-delete-comment"]} onClick={handleDelete}>Delete</button> : null}
            
            </div>
        </li>
    );
};

export default CommentCard;