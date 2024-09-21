import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "../types";
const FormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Invalid phone number" }),
  website: z.string().url({ message: "Invalid URL (https://example.com)" }),
  username: z.string().min(1, { message: "Username is required" }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

const EditForm = ({ email, phone, name, website, username }: User) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: { email, phone, name, website, username },
  });

  const onSubmit = async (data: FormSchemaType) => {
    console.log("Form Data:", data);
    try {
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
