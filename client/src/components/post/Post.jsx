

import {Link} from "react-router-dom";
import "./post.css";

export default function Post({post}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return(
        <div className="post">
            {post.photo &&
            <img src={PF+post.photo} alt="" className="postImage" />
            }
            <div className="postInfo">
                <div className="postCategories">
                    {post.categories.map((category) => {
                        return(
                            <span key={category._id} className="postCategory">{category.name}</span>
                        );
                    })}
                </div>
                <Link className="link" to={`/post/${post._id}`}>
                    <span className="postTitle">{post.title}</span>
                </Link>
                <hr />
                <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
            </div>
            <p className="postDesc">{post.desc}</p>
        </div>
    );
}
