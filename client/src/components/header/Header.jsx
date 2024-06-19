
import "./header.css";

export default function Header() {
    return(
        <div className="header">
            <div className="headerTitles">
                <span className="headerTitle">React & Node</span>
                <span className="headerTitle">Blog</span>
            </div>
            <img src="/assets/1.webp" alt="" className="headerImage" />
        </div>
    );
}
