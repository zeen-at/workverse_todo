import * as Yup from "yup";
import Pusher from 'pusher-js';


export const todoValidation = Yup.object().shape({
  title: Yup.string().required("Enter a task title"),
  date: Yup.string().required("Enter a timeline"),
  description: Yup.string(),
  createdby: Yup.string(),
});

export const EditTodoSchema = Yup.object().shape({
  title: Yup.string().required("Enter task name"),
  description: Yup.string(),
  date: Yup.date().required("Required"),
  createdby: Yup.string(),
});


export const colorArray=[
  "#FFADAD", // Light Pink
  "#FFD6A5", // Soft Peach
  "#FDFFB6", // Pale Yellow
  "#CAFFBF", // Mint Green
  "#9BF6FF", // Sky Blue
  "#A0C4FF", // Baby Blue
  "#BDB2FF", // Light Lavender
  "#FFC6FF", // Soft Lilac
  "#FFAFCC", // Blush Pink
  "#D0F4DE"  // Pastel Mint
]
export const textColors = [
  "#333333", // Dark Gray
  "#4F4F4F", // Medium Gray
  "#2C3E50", // Dark Blue
  "#3D3D3D", // Charcoal Gray
  "#1F2937", // Deep Slate
];



export const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
});
