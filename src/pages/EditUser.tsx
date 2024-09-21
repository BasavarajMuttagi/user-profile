import { useParams } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams();
  return <div>{id}</div>;
};

export default EditUser;
