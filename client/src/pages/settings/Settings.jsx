
import {useContext, useState} from "react";
import {Context} from "../../context/Context";
import {UpdateStart, UpdateSuccess, UpdateFailure} from "../../context/Actions";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import "./settings.css";

export default function Setting() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const {user, dispatch} = useContext(Context);

    let handleSubmit = async (event) => {
        setSuccess(false);
        event.preventDefault();

        if(username || email || password || file) {
            dispatch(UpdateStart());

            let updatedUser = {userId: user._id};
            if(username) {updatedUser.username = username;}
            if(email) {updatedUser.email = email;}
            if(password) {updatedUser.password = password;}

            if(file) {
                let data = new FormData();
                let filename = Date.now() + file.name;
                data.append("name", filename);
                data.append("file", file);
                updatedUser.profilePicture = filename;

                try {
                    await axios.post("/upload", data);
                } catch(err) {
                    console.log(err);
                }
            }

            try {
                let res = await axios.put("/users/"+user._id, updatedUser);
                dispatch(UpdateSuccess(res.data));
                setSuccess(true);
            } catch(err) {
                dispatch(UpdateFailure(res.data));
            }
        }
    }

    return(
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Your Account</span>
                    <span className="settingsDeleteTitle">Delete Account</span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingsProfilePicture">
                        <img 
                            src={file ? URL.createObjectURL(file) : user.profifePicture ? PF+user.profifePicture : PF+"noAvatar.png"}
                            alt=""
                        />
                        <label htmlFor="fileInput">
                            <svg className="settingsProfilePictureIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M21.9731 19.6876C20.6878 17.4317 18.6807 15.674 16.275 14.6973C17.4713 13.8001 18.355 12.5492 18.8009 11.1218C19.2468 9.69437 19.2322 8.16286 18.7593 6.74419C18.2865 5.32552 17.3792 4.0916 16.166 3.21721C14.9529 2.34283 13.4954 1.87231 12 1.87231C10.5046 1.87231 9.04706 2.34283 7.83392 3.21721C6.62078 4.0916 5.7135 5.32552 5.24061 6.74419C4.76772 8.16286 4.75319 9.69437 5.19907 11.1218C5.64496 12.5492 6.52865 13.8001 7.72498 14.6973C5.31928 15.674 3.31221 17.4317 2.02686 19.6876C1.94721 19.8157 1.89413 19.9585 1.87076 20.1075C1.8474 20.2564 1.85423 20.4086 1.89084 20.5549C1.92746 20.7012 1.99312 20.8387 2.08392 20.9591C2.17472 21.0795 2.2888 21.1804 2.41938 21.2559C2.54996 21.3313 2.69438 21.3797 2.84405 21.3982C2.99373 21.4168 3.14559 21.405 3.29062 21.3636C3.43566 21.3223 3.57089 21.2522 3.6883 21.1575C3.8057 21.0629 3.90288 20.9456 3.97404 20.8126C5.67279 17.8764 8.67279 16.1251 12 16.1251C15.3272 16.1251 18.3272 17.8773 20.0259 20.8126C20.1802 21.0606 20.4248 21.2389 20.7081 21.3098C20.9914 21.3807 21.2912 21.3387 21.544 21.1926C21.7969 21.0465 21.9831 20.8078 22.0631 20.5269C22.1432 20.2461 22.1109 19.9451 21.9731 19.6876ZM7.12498 9.00013C7.12498 8.03594 7.41089 7.09341 7.94657 6.29172C8.48224 5.49003 9.24361 4.86519 10.1344 4.49621C11.0252 4.12724 12.0054 4.0307 12.951 4.2188C13.8967 4.4069 14.7653 4.8712 15.4471 5.55298C16.1289 6.23476 16.5932 7.1034 16.7813 8.04906C16.9694 8.99472 16.8729 9.97492 16.5039 10.8657C16.1349 11.7565 15.5101 12.5179 14.7084 13.0535C13.9067 13.5892 12.9642 13.8751 12 13.8751C10.7075 13.8736 9.4684 13.3595 8.55448 12.4456C7.64056 11.5317 7.12647 10.2926 7.12498 9.00013Z" fill="white"/>
                            </svg>
                        </label>
                        <input
                            hidden
                            type="file"
                            id="fileInput"
                            onChange={(event) => {setFile(event.target.files[0]);}}
                        />
                    </div>
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder={user.username}
                        onChange={(event) => {setUsername(event.target.value);}}
                    />
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder={user.email}
                        onChange={(event) => {setEmail(event.target.value);}}
                    />
                    <label>Password</label>
                    <input type="password" onChange={(event) => {setPassword(event.target.value);}} />
                    <button className="settingsSubmit" type="submit">Update</button>
                    {success && <span style={{color: "green", marginTop: "20px", textAlign: "center"}}>Profile has been updated...</span>}
                </form>
            </div>
            <Sidebar />
        </div>
    );
}
