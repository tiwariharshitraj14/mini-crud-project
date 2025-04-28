import { useEffect, useState } from "react";
import { createPost, updatePost } from "../api/PostApi";

const Form = ({ postData, setPostData, updateDataApi, setUpdateDataApi }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });

  let isEmpty = Object.keys(updateDataApi).length === 0;

  useEffect(() => {
    updateDataApi &&
      setAddData({
        title: updateDataApi.title || "",
        body: updateDataApi.body || "",
      });
  }, [updateDataApi]);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const addPostData = async () => {
    const res = await createPost(addData);
    console.log("res", res);
    if (res.status === 201) {
      setPostData([...postData, res.data]);
      setAddData({ title: "", body: "" });
    }
  };

  const updatePostData = async () => {
    try {
      const res = await updatePost(updateDataApi.id, addData);
      console.log(res);
      if (res.status === 200) {
        setPostData((prev) => {
          return prev.map((prevData) => {
            return prevData.id === res.data.id ? res.data : prevData;
          });
        });
        setAddData({ title: "", body: "" });
        setUpdateDataApi({})
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if (action === "Add") {
      addPostData();
    } else if (action === "Edit") {
      updatePostData();
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="title"></label>
        <input
          type="text"
          autoComplete="off"
          id="title"
          name="title"
          placeholder="Add Title"
          value={addData.title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="body"></label>
        <input
          type="text"
          autoComplete="off"
          id="body"
          name="body"
          placeholder="Add Post"
          value={addData.body}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" value={isEmpty ? "Add" : "Edit"}>
        {isEmpty ? "Add" : "Edit"}
      </button>
    </form>
  );
};

export default Form;
