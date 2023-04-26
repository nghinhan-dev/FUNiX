import React from "react";
import { useForm } from "react-hook-form";
import classes from "./AddMovie.module.css";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import * as yup from "yup";

export default function AddMovie({ onAddMovie }) {
  const SignupSchema = yup.object().shape({
    title: yup.string().required(),
    openingText: yup.string().required(),
    releaseDate: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });

  const onSubmit = (data) => {
    onAddMovie(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.control}>
        <label>Title</label>
        <input
          type="text"
          placeholder="Title"
          {...register("title", { required: true })}
        />
        {errors.title && (
          <p className={classes.text__red}>{errors.title.message}</p>
        )}
      </div>
      <div className={classes.control}>
        <label>Opening Text</label>
        <textarea rows="5" {...register("openingText", { required: true })} />
        {errors.openingText && (
          <p className={classes.text__red}>{errors.openingText.message}</p>
        )}
      </div>
      <div className={classes.control}>
        <label>Release Date</label>
        <input
          type="date"
          placeholder="Release Date"
          {...register("releaseDate", {
            required: true,
          })}
        />
        {errors.releaseDate && (
          <p className={classes.text__red}>{errors.releaseDate.message}</p>
        )}
      </div>

      <input type="submit" value="Add Movie" />
    </form>
  );
}
