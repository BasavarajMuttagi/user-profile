import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "../types";
import { useDispatch } from "react-redux";
import { updateUser } from "../features/users/usersSlice";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "./../assets/default_avatar.webp";
import toast from "react-hot-toast";
const AddressSchema = z.object({
  street: z.string().min(1, { message: "Street is required" }),
  suite: z.string().min(1, { message: "Suite is required" }),
  city: z.string().min(1, { message: "City is required" }),
  zipcode: z.string().min(1, { message: "Zipcode is required" }),
});
const FormSchema = z.object({
  id: z.number(),
  avatar: z.string().default(defaultAvatar),
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Invalid phone number" }),
  website: z.string().url({ message: "Invalid URL (https://example.com)" }),
  username: z.string().min(1, { message: "Username is required" }),
  address: AddressSchema,
});

export type FormSchemaType = z.infer<typeof FormSchema>;

const EditForm = ({
  email,
  phone,
  id,
  name,
  website,
  username,
  address,
  avatar,
}: User) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email,
      phone,
      name,
      website,
      username,
      id,
      address,
      avatar,
    },
  });

  const onSubmit = async (data: FormSchemaType) => {
    try {
      dispatch(updateUser(data));
      navigate("/");
      toast.success("User updated");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-3 w-72"
    >
      <div className="relative pb-3">
        <label className="block font-medium">Username</label>
        <input
          {...register("username")}
          className="px-3 py-1 outline-none border w-full"
        />
        {errors.username && (
          <p className="text-red-400 text-xs absolute">
            {errors.username.message}
          </p>
        )}
      </div>
      <div className="relative pb-3">
        <label className="block font-medium">Name</label>
        <input
          {...register("name")}
          className="px-3 py-1 outline-none border w-full"
        />
        {errors.name && (
          <p className="text-red-400 text-xs absolute">{errors.name.message}</p>
        )}
      </div>

      <div className="relative pb-3">
        <label className="block font-medium">Email</label>
        <input
          type="email"
          {...register("email")}
          className="px-3 py-1 outline-none border w-full"
        />
        {errors.email && (
          <p className="text-red-400 text-xs absolute">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="relative pb-3">
        <label className="block font-medium">Phone</label>
        <input
          {...register("phone")}
          className="px-3 py-1 outline-none border w-full"
        />
        {errors.phone && (
          <p className="text-red-400 text-xs absolute">
            {errors.phone.message}
          </p>
        )}
      </div>

      <div className="relative pb-3">
        <label className="block font-medium">Website</label>
        <input
          {...register("website")}
          className="px-3 py-1 outline-none border w-full"
        />
        {errors.website && (
          <p className="text-red-400 text-xs absolute">
            {errors.website.message}
          </p>
        )}
      </div>

      <div className="relative pb-3">
        <label className="block font-medium">Street</label>
        <input
          type="text"
          {...register("address.street")}
          className="px-3 py-1 outline-none border w-full"
        />
        {errors.address?.street && (
          <p className="text-red-400 text-xs absolute">
            {errors.address.street.message}
          </p>
        )}
      </div>

      <div className="relative pb-3">
        <label className="block font-medium">Suite</label>
        <input
          type="text"
          {...register("address.suite")}
          className="px-3 py-1 outline-none border w-full"
        />
        {errors.address?.suite && (
          <p className="text-red-400 text-xs absolute">
            {errors.address.suite.message}
          </p>
        )}
      </div>

      <div className="relative pb-3">
        <label className="block font-medium">City</label>
        <input
          type="text"
          {...register("address.city")}
          className="px-3 py-1 outline-none border w-full"
        />
        {errors.address?.city && (
          <p className="text-red-400 text-xs absolute">
            {errors.address.city.message}
          </p>
        )}
      </div>

      <div className="relative pb-3">
        <label className="block font-medium">Zipcode</label>
        <input
          type="text"
          {...register("address.zipcode")}
          className="px-3 py-1 outline-none border w-full"
        />
        {errors.address?.zipcode && (
          <p className="text-red-400 text-xs absolute">
            {errors.address.zipcode.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="px-3 py-2 font-medium bg-violet-500 text-white"
      >
        Submit
      </button>
    </form>
  );
};

export default EditForm;
