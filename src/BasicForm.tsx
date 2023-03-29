import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Form = {
  name: string;
  email: string;
  number: number;
  password: string;
};

const BasicForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    // shouldFocusError: false,
  });

  const handleRegistration = (data: Form) => console.log(data);
  console.log({ errors });

  const registerOptions = {
    name: { required: "Name is required" },
    email: { required: "Email is required" },
    number: {
      required: "Number is required",
      valueAsNumber: true,
      validate: (value: number) => value > 0,
    },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters",
      },
    },
  };

  return (
    <form onSubmit={handleSubmit(handleRegistration)}>
      <div>
        <label>Name</label>
        <input type="text" {...register("name", registerOptions.name)} />
        <small className="text-danger">
          {errors?.name && errors.name.message}
        </small>
      </div>

      <div>
        <label>Email</label>
        <input type="email" {...register("email", registerOptions.email)} />
        <small className="text-danger">
          {errors?.email && errors.email.message}
        </small>
      </div>

      <div>
        <label>Number</label>
        <input {...register("number", registerOptions.number)} />
        <small className="text-danger">
          {errors?.number && errors.number.message}
          {errors?.number?.type === "validate" && "Not a possitive number"}
        </small>
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          {...register("password", registerOptions.password)}
        />
        <small className="text-danger">
          {errors?.password && errors.password.message}
        </small>
      </div>
      <button>Submit</button>
    </form>
  );
};

export default BasicForm;
