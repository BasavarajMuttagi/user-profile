import { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import axios from "axios";
import { SpinnerGap } from "@phosphor-icons/react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../features/users/usersSlice";
import { RootState } from "../store/store";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);
  const [spin, setSpin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const getAllUsers = async () => {
    try {
      setSpin(true);
      setError(null);
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users",
      );
      return response;
    } catch (error) {
      console.log(error);
      setError("Failed to fetch users. Please try again later.");
    } finally {
      setSpin(false);
    }
  };
  useEffect(() => {
    if (users.length === 0) {
      getAllUsers().then((res) => {
        if (res) {
          dispatch(setUsers(res.data));
        }
      });
    }
  }, []);

  if (spin) {
    return (
      <div className="flex flex-col min-h-screen p-2 justify-center items-center">
        <div className="text-black font-medium tracking-widest inline-flex items-center text-xl gap-x-5">
          <span>Loading</span>
          <SpinnerGap size={50} className="text-violet-500 animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen p-2 justify-center items-center">
        <div className="text-red-500 font-medium text-xl text-center">
          {error}
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col min-h-screen p-2">
      <h1 className="text-violet-600 font-extrabold text-3xl mb-6">Users</h1>
      <div className="space-y-5">
        {users.map((eachUser) => (
          <UserCard key={eachUser.id} {...eachUser} />
        ))}
      </div>
    </div>
  );
};

export default Users;
