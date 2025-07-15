import * as Yup from "yup";

export interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Error: Name is required"),
  email: Yup.string()
    .email("Error: Invalid email format")
    .required("Error: Email is required"),
  subject: Yup.string().required("Error: Subject is required"),
  message: Yup.string().required("Error: Message is required"),
});
