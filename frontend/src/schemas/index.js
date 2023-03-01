import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const basicSchema = yup.object().shape({
  fullName: yup
    .string()
    .min(3, "Full name is too short")
    .max(15, "Full name is too long")
    .required("Full name is required")
    .matches(/^[a-zA-Z\s]*$/, "Full name must contain only letters and spaces"),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, "Phone number must be a valid number")
    .min(10, "Phone number is too short")
    .max(15, "Phone number is too long")
    .required("Phone number is required"),
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup
  .string()
  .min(5)
  .matches(passwordRules, { message: "Please create a stronger password" })
  .required("Required"),
});
