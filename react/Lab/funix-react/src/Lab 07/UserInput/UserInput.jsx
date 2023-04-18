import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import * as yup from "yup";
import "./UserInput.css";

export default function UserInput({ onAddUser }) {
  const SignupSchema = yup.object().shape({
    user: yup.string().required(),
    age: yup.number().required().positive().integer(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });
  const onSubmit = (data) => {
    let id = Math.random().toString();
    onAddUser({ id: id, ...data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="username">User</label>
        <input
          type="text"
          placeholder="User"
          {...register("user", { required: true })}
        />
        {errors.user && <p className="text-red">{errors.user.message}</p>}
      </div>
      <div>
        <label htmlFor="age">Age (Years)</label>
        <input
          type="number"
          placeholder="Age"
          {...register("age", { required: true })}
        />
        {errors.age && <p className="text-red">{errors.age.message}</p>}
      </div>
      <input type="submit" />
    </form>
  );
}
