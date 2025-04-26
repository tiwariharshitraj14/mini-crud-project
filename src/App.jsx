import { useEffect } from "react";
import { getPost } from "./api/PostApi";

const App = () => {
  const getPostData = async () => {
    try {
      const res = await getPost();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  return <h1>Hello React crud</h1>;
};
export default App;
