import styles from './TopicsList.module.css'
import { getTopics } from '../../utils/apis';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

const TopicsList = () => {
    const [searchParams] = useSearchParams();
    const currentTopic = searchParams.get('topic');
    const [topicsArray, setTopicsArray] = useState([])
    useEffect(() => {
        getTopics().then((topics) => {
            setTopicsArray(topics)
        })
    }, [])

    let allTopicsSelected = null;
    if (!currentTopic) {
        allTopicsSelected = styles["topic-selected"]
    } 

    return (
        <>
        <div className={styles["topics-list-container"]}>
            <Link to={`/`}><li className={[styles["topic"], allTopicsSelected].join(' ')}>All Topics</li></Link>
            {topicsArray.map((topic) => {
                let highlight = null
                if (topic.slug === currentTopic) {
                    highlight = styles["topic-selected"]
                }
                return <Link to={`/?topic=${topic.slug}`} key={topic.slug}><li className={[styles["topic"], highlight].join(" ")}>{topic.slug}</li></Link>
            })}
        </div>
            <h3 className={styles["topics-header"]}>Topics</h3>
        </>
    );
};

export default TopicsList;