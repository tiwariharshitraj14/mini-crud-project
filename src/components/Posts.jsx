import { useEffect } from "react";
import { deletePost, getPost } from "../api/PostApi";
import { useState } from "react";
import Form from "./Form";

const Posts = () => {
  const [postData, setPostData] = useState([]);
  const [updateDataApi, setUpdateDataApi] = useState({});

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

  const handleUpdatePost = (data) => {
    setUpdateDataApi(data);
  };

  useEffect(() => {
    getPostData();
  }, []);

  return (
    <>
      <section className="section-form">
        <Form
          postData={postData}
          setPostData={setPostData}
          updateDataApi={updateDataApi}
          setUpdateDataApi={setUpdateDataApi}
        />
      </section>
      <section className="section-post">
        <ol>
          {postData.map((data) => (
            <li key={data.id}>
              <p>Title: {data.title}</p>
              <p>Body: {data.body}</p>
              <button onClick={() => handleUpdatePost(data)}>Edit</button>
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
    </>
  );
};

export default Posts;
