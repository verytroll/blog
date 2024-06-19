
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
import axios from "axios";
import "./home.css";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const {search} = useLocation();

    useEffect(() => {
        let fetchPosts = async () => {
            let res = await axios.get("/posts"+search);
            setPosts(res.data);
        }

        fetchPosts();
    }, [search])

    return(
        <>
            <Header />
            <div className="home">
                <Posts posts={posts} />
                <Sidebar />
            </div>
        </>
    );
}
