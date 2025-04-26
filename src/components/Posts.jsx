import { useEffect } from "react";
import { deletePost, getPost } from "../api/PostApi";
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

  const handleDeletePost = async (id) => {
    try {
      const res = await deletePost(id);
      if (res.status === 200) {
        const newUpdatePost = postData.filter((delPost) => {
          return delPost.id != id;
        });
        setPostData(newUpdatePost);
      } else {
        console.log("Failed to delete the post:", res.status);
      }
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
            <button
              className="btn-delete"
              onClick={() => handleDeletePost(data.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default Posts;
