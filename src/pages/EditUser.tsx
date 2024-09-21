import { useParams } from "react-router-dom";
import EditForm from "../components/EditForm";
import axios from "axios";
import { useState, useEffect } from "react";
import { User } from "../types";
import { SpinnerGap } from "@phosphor-icons/react";
const initialState = {
  id: 0,
  name: "",
  username: "",
  email: "",
  address: {
    street: "",
    suite: "",
    city: "",
    zipcode: "",
    geo: {
      lat: "",
      lng: "",
    },
  },
  phone: "",
  website: "",
  company: {
    name: "",
    catchPhrase: "",
    bs: "",
  },
};
const EditUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User>(initialState);
  const [spin, setSpin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const getUserByID = async () => {
    try {
      setSpin(true);
      setError(null);
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`,
      );
      return response;
    } catch (error) {
      console.log(error);
      setError("Failed to fetch user data. Please try again later.");
    } finally {
      setSpin(false);
    }
  };
  useEffect(() => {
    getUserByID().then((res) => {
      if (res) {
        setUser(res.data);
      }
    });
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
    <div className="flex flex-col min-h-screen p-2 justify-center items-center">
      <h1 className="text-violet-600 font-extrabold text-3xl mb-6">
        Edit User
      </h1>
      <div style={{ scrollbarWidth: "thin" }}>
        <EditForm {...user} />
      </div>
    </div>
  );
};

export default EditUser;
