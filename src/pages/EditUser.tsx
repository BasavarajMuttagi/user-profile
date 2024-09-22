import { useParams } from "react-router-dom";
import EditForm from "../components/EditForm";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const EditUser = () => {
  const { id } = useParams();
  const user = useSelector((state: RootState) => state.users.users).filter(
    (eachUser) => eachUser.id === parseInt(id!),
  );
  return (
    <div className="flex flex-col min-h-screen p-2 justify-center items-center">
      <h1 className="text-violet-600 font-extrabold text-3xl mb-6">
        Edit User
      </h1>
      <div style={{ scrollbarWidth: "thin" }}>
        <EditForm {...user[0]} />
      </div>
    </div>
  );
};

export default EditUser;
