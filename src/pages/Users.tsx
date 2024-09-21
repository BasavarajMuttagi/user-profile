import { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import { User } from "../types";
import axios from "axios";
import { SpinnerGap } from "@phosphor-icons/react";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [spin, setSpin] = useState(false);
  const getAllUsers = async () => {
    try {
      setSpin(true);
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users",
      );
      return response;
    } catch (error) {
      console.log(error);
    } finally {
      setSpin(false);
    }
  };
  useEffect(() => {
    getAllUsers().then((res) => {
      setUsers(res?.data);
    });
  }, []);

  return (
    <div className=" flex flex-col min-h-screen p-2">
      <h1 className="text-violet-600 font-extrabold text-3xl mb-6">Users</h1>
      <div className="space-y-5" style={{ scrollbarWidth: "thin" }}>
        {spin ? (
          <div className="text-black font-medium tracking-widest inline-flex items-center text-xl gap-x-5">
            <span>Loading</span>
            <SpinnerGap size={50} className="text-violet-500 animate-spin" />
          </div>
        ) : (
          users.map((eachUser) => <UserCard key={eachUser.id} {...eachUser} />)
        )}
      </div>
    </div>
  );
};

export default Users;
