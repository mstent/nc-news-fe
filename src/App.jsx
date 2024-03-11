import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Article from "./components/Article/Article";

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/:article_id" element={<Article />} />
            </Routes>
        </>
    );
}

export default App;
