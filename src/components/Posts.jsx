import { useEffect } from "react";
import { getPost } from "../api/PostApi";
import { useState } from "react";

const Posts = () => {
  const [postData, setPostData] = useState([]);
  const getPostData = async () => {
    try {
      const res = await getPost();
      setPostData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  return (
    <section className="section-post">
      <ol>
        {postData.map((data) => (
          <li key={data.id}>
            <p>Title: {data.title}</p>
            <p>Body: {data.body}</p>
            <button>Edit</button>
            <button className="btn-delete">Delete</button>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default Posts;
