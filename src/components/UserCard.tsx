import { Envelope, Link, Phone } from "@phosphor-icons/react";
import { User } from "../types";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "./../assets/default_avatar.webp";
import { useDispatch } from "react-redux";
import { ChangeEvent } from "react";
import { setAvatar } from "../features/users/usersSlice";
const UserCard = ({
  id,
  username,
  email,
  name,
  phone,
  website,
  avatar,
}: User) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const previewUrl = URL.createObjectURL(e.target.files[0]);
      dispatch(setAvatar({ previewUrl, id }));
    }
  };
  return (
    <article
      onClick={() => navigate(`user/${id}`)}
      className="flex gap-x-2 p-2 items-center text-gray-700 border rounded-md shadow hover:border-gray-300 hover:cursor-pointer md:space-x-5"
    >
      <div className="h-24 w-24 shrink-0" onClick={(e) => e.stopPropagation()}>
        <label htmlFor="fileUpload">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="fileUpload"
          />
          <img
            src={avatar ?? defaultAvatar}
            alt={`${name}'s avatar`}
            className="h-full w-full rounded-full object-cover object-top"
          />
        </label>
      </div>

      <div className="space-y-1 w-full text-sm">
        <div className="mb-3">
          <h2 className="text-black font-bold text-base">{name}</h2>
          <h3 className="text-xs text-gray-500">@{username}</h3>
        </div>

        <div className="md:flex items-center gap-x-5">
          <div className="flex items-center">
            <Envelope
              size={18}
              color="gray-600"
              className="mr-2"
              weight="bold"
            />
            <span className="hover:text-blue-500">{email}</span>
          </div>
          <div className="flex items-center">
            <Phone size={18} color="gray-600" className="mr-2" weight="bold" />
            <span className="hover:text-blue-500">{phone}</span>
          </div>
          <div className="flex items-center">
            <Link size={18} color="gray-600" className="mr-2" weight="bold" />
            <a
              href={`https://${website}`}
              target="_blank"
              className="hover:text-blue-500"
            >
              {website}
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

export default UserCard;
