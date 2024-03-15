import ArticlesList from "../ArticlesList/ArticlesList";
import TopicsList from "../TopicsList/TopicsList";
import SortBy from "../SortBy/SortBy";
import { useSearchParams } from "react-router-dom";

const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    return (
        <div>
            <TopicsList/>
            <SortBy searchParams={searchParams} setSearchParams={setSearchParams}/>
            <ArticlesList searchParams={searchParams}/>
        </div>
    );
};

export default Home;