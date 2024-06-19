
import {Context} from "../../context/Context";
import {useContext, useState} from "react";
import axios from "axios";
import "./write.css";

export default function Write() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const {user} = useContext(Context);

    let handleSubmit = async (event) => {
        event.preventDefault();
        if(title, desc) {
            let post = {title, desc, username: user.username};
            if(file) {
                let data = new FormData();
                let filename = Date.now() + file.name;
                data.append("name", filename);
                data.append("file", file);
                post.photo = filename;

                try {
                    await axios.post("/upload", data);
                } catch(err) {
                    console.log(err);
                }
            }

            try {
                let res = await axios.post("/posts", post);
                window.location.replace("/post/"+res.data._id);
            } catch(err) {
                console.log(err);
            }
        }
    }

    return(
        <div className="write">
            {file &&
            <img src={URL.createObjectURL(file)} alt="" className="writeImage" />
            }
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <svg className="writeIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M20.2959 7.455L15.0459 2.205C14.9415 2.10039 14.8174 2.0174 14.6808 1.96078C14.5442 1.90416 14.3978 1.87501 14.25 1.875H5.25C4.75272 1.875 4.27581 2.07254 3.92417 2.42417C3.57254 2.77581 3.375 3.25272 3.375 3.75V20.25C3.375 20.7473 3.57254 21.2242 3.92417 21.5758C4.27581 21.9275 4.75272 22.125 5.25 22.125H18.75C19.2473 22.125 19.7242 21.9275 20.0758 21.5758C20.4275 21.2242 20.625 20.7473 20.625 20.25V8.25C20.625 7.95187 20.5066 7.66593 20.2959 7.455ZM17.1562 7.5H15V5.34375L17.1562 7.5ZM5.625 19.875V4.125H12.75V8.625C12.75 8.92337 12.8685 9.20952 13.0795 9.4205C13.2905 9.63147 13.5766 9.75 13.875 9.75H18.375V19.875H5.625ZM15.0459 13.0791C15.2573 13.2904 15.376 13.5771 15.376 13.8759C15.376 14.1748 15.2573 14.4615 15.0459 14.6728C14.8346 14.8842 14.5479 15.0029 14.2491 15.0029C13.9502 15.0029 13.6635 14.8842 13.4522 14.6728L13.125 14.3438V17.25C13.125 17.5484 13.0065 17.8345 12.7955 18.0455C12.5845 18.2565 12.2984 18.375 12 18.375C11.7016 18.375 11.4155 18.2565 11.2045 18.0455C10.9935 17.8345 10.875 17.5484 10.875 17.25V14.3438L10.5459 14.6737C10.3346 14.8851 10.0479 15.0038 9.74906 15.0038C9.45018 15.0038 9.16353 14.8851 8.95219 14.6737C8.74084 14.4624 8.62211 14.1758 8.62211 13.8769C8.62211 13.578 8.74084 13.2913 8.95219 13.08L11.2022 10.83C11.3067 10.7251 11.4309 10.6419 11.5676 10.5851C11.7044 10.5283 11.851 10.4991 11.9991 10.4991C12.1471 10.4991 12.2937 10.5283 12.4305 10.5851C12.5672 10.6419 12.6914 10.7251 12.7959 10.83L15.0459 13.0791Z" fill="#787878"/>
                        </svg>
                    </label>
                    <input
                        hidden
                        type="file"
                        id="fileInput"
                        onChange={(event) => {setFile(event.target.files[0]);}}
                    />
                    <input
                        type="text"
                        placeholder="Title"
                        className="writeInput"
                        autoFocus={true}
                        onChange={(event) => {setTitle(event.target.value);}}
                    />
                </div>
                <div className="writeFormGroup">
                    <textarea
                        placeholder="Tell your story..."
                        type="text"
                        className="writeInput writeText"
                        onChange={(evemt) => {setDesc(event.target.value);}}
                    ></textarea>
                </div>
                <button className="writeSubmit" type="submit">Publish</button>
            </form>
        </div>
    );
}
