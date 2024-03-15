import styles from "./SortBy.module.css";
import { useState } from "react";

const SortBy = ({ searchParams, setSearchParams }) => {

    const [isDate, setIsDate] = useState(false);
    const [isCommentCount, setIsCommentCount] = useState(false);
    const [isVotes, setIsVotes] = useState(false);
    const [order, setOrder] = useState("desc");


    const selectedDate = () => {
        return isDate ? "btn-selected" : null;
    };
    const selectedComments = () => {
        return isCommentCount ? "btn-selected" : null;
    };
    const selectedVotes = () => {
        return isVotes ? "btn-selected" : null;
    };
    const setSortOrder = () => {
        const newParams = new URLSearchParams(searchParams);
        
        newParams.set("order", order);

        if (isDate) newParams.set("sort_by", "created_at");
        if (isCommentCount) newParams.set("sort_by", "comment_count");
        if (isVotes) newParams.set("sort_by", "votes");
        
        
        setSearchParams(newParams);
    };

    return (
        <>
            <div className={styles["sort-by-container"]}>
                <div className={styles["btn-container"]}>
                    <button
                        className={[
                            styles["sort-btn"],
                            styles[selectedDate()],
                        ].join(" ")}
                        onClick={(e) => {
                            setIsDate(true);
                            setIsCommentCount(false);
                            setIsVotes(false);
                            setSortOrder();
                        }}
                    >
                        Date
                    </button>
                    <button
                        className={[
                            styles["sort-btn"],
                            styles[selectedComments()],
                        ].join(" ")}
                        onClick={(e) => {
                            setIsCommentCount(true);
                            setIsDate(false);
                            setIsVotes(false);
                            setSortOrder();
                        }}
                    >
                        Comment Count
                    </button>
                    <button
                        className={[
                            styles["sort-btn"],
                            styles[selectedVotes()],
                        ].join(" ")}
                        onClick={(e) => {
                            setIsVotes(true);
                            setIsCommentCount(false);
                            setIsDate(false);
                            setSortOrder();
                        }}
                    >
                        Votes
                    </button>
                </div>
                {order === "asc" ? (
                    <button
                        className={[
                            styles["sort-btn"],
                            styles["order-btn-selected"],
                        ].join(" ")}
                        onClick={(e) => {
                            setOrder("desc");
                            setSortOrder();
                        }}
                    >
                        Asc
                    </button>
                ) : (
                    <button
                        className={[
                            styles["sort-btn"],
                            styles["order-btn-selected"],
                        ].join(" ")}
                        onClick={(e) => {
                            setOrder("asc");
                            setSortOrder();
                        }}
                    >
                        Desc
                    </button>
                )}
            </div>
            <h3 className={styles["sort-by-header"]}>Sort By</h3>
        </>
    );
};

export default SortBy;
