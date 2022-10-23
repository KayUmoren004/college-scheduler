import * as Yup from "yup";

// Login
export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});

// Sign Up
export const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  name: Yup.string()
    .required("Full Name is required")
    .min(6, "Full Name must be at least 6 characters long")
    .max(30, "Full Name must be less than 30 characters long"),
});

// Add Course 1
export const CourseSchema1 = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(2, "Title must be at least 2 characters"),
  code: Yup.string()
    .required("Code is required")
    .min(2, "Code must be at least 2 characters"),
  credits: Yup.number().required("Credits is required"),
  instructor: Yup.string()
    .required("Instructor is required")
    .min(2, "Instructor must be at least 2 characters"),
});

// Add Course 2
export const CourseSchema2 = Yup.object().shape({
  classBuilding: Yup.string()
    .required("Building is required")
    .min(2, "Building must be at least 2 characters"),
  classRoom: Yup.string()
    .required("Room is required")
    .min(2, "Room must be at least 2 characters"),
});

// Add Course 3
export const CourseSchema3 = Yup.object().shape({
  labBuilding: Yup.string()
    .required("Building is required")
    .min(2, "Building must be at least 2 characters"),
  labRoom: Yup.string()
    .required("Room is required")
    .min(2, "Room must be at least 2 characters"),
});

// Add Canvas Link
export const CanvasSchema = Yup.object().shape({
  canvasLink: Yup.string()
    .required("Canvas Link is required")
    .min(2, "Canvas Link must be at least 2 characters"),
});
