
import {useContext, useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";
import {Context} from "../../context/Context";
import axios from "axios";
import "./singlepost.css";

export default function SinglePost() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const params = useParams();
    const [post, setPost] = useState({});
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);
    const {user} = useContext(Context);
    
    useEffect(() => {
        let fetchPost = async () => {
            let res = await axios.get("/posts/"+params.postId);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        }

        fetchPost();
    }, [params])

    let handleDelete = async () => {
        try {
            await axios.delete("/posts/"+params.postId, {data: {username: user.username}});
            window.location.replace("/");
        } catch(err) {
            console.log(err);
        }
    }

    let handleUpdate = async () => {
        if(title && desc) {
            try {
                await axios.put("/posts/"+params.postId, {username: user.username, title, desc});
                setUpdateMode(false);
            } catch(err) {
                console.log(err);
            }
        }
    }

    return(
        <div className="singlePost">
            <div className="singlePostWrapper">
                {post.photo &&
                <img src={PF+post.photo} alt="" className="singlePostImage" />
                }
                {updateMode
                ? <input
                    type="text"
                    value={title}
                    className="singlePostTitleInput"
                    autoFocus={true}
                    onChange={(event) => {setTitle(event.target.value);}}
                />
                : <h1 className="singlePostTitle">
                    {title}
                    {(post.username === user?.username) && 
                    <div className="singlePostEdit">
                        <svg onClick={() => {setUpdateMode(true)}} className="singlePostIcon"  fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" fill="teal"/>
                        </svg>
                        <svg onClick={handleDelete} className="singlePostIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M19.5459 17.9541C19.7572 18.1654 19.876 18.4521 19.876 18.751C19.876 19.0499 19.7572 19.3365 19.5459 19.5479C19.3346 19.7592 19.0479 19.8779 18.749 19.8779C18.4501 19.8779 18.1635 19.7592 17.9521 19.5479L12 13.5938L6.0459 19.546C5.83455 19.7573 5.54791 19.8761 5.24902 19.8761C4.95014 19.8761 4.66349 19.7573 4.45215 19.546C4.2408 19.3346 4.12207 19.048 4.12207 18.7491C4.12207 18.4502 4.2408 18.1636 4.45215 17.9522L10.4062 12L4.45402 6.04598C4.24268 5.83464 4.12395 5.54799 4.12395 5.2491C4.12395 4.95022 4.24268 4.66357 4.45402 4.45223C4.66537 4.24089 4.95201 4.12215 5.2509 4.12215C5.54978 4.12215 5.83643 4.24089 6.04777 4.45223L12 10.4063L17.954 4.45129C18.1654 4.23995 18.452 4.12122 18.7509 4.12122C19.0498 4.12122 19.3364 4.23995 19.5478 4.45129C19.7591 4.66264 19.8778 4.94928 19.8778 5.24817C19.8778 5.54705 19.7591 5.8337 19.5478 6.04504L13.5937 12L19.5459 17.9541Z" fill="tomato"/>
                        </svg>
                    </div>
                    }
                </h1>
                }
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">
                        <span>Author: </span>
                        <Link className="link" to={`/?user=${post.username}`}><b>{post.username}</b></Link>
                    </span>
                    <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
                </div>
                {updateMode 
                ? <textarea
                    className="singlePostDescInput"
                    value={desc}
                    onChange={(event) => {setDesc(event.target.value);}}
                ></textarea>
                : <p className="singlePostDesc">{desc}</p>
                }
                {updateMode && <button type="button" className="singlePostBuitton" onClick={handleUpdate}>Update</button>}
            </div>
        </div>
    );
}
