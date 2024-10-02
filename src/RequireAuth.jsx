import { Navigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function RequireAuth(props) {
  const [nextPage, setNextPage] = useState("");

  useEffect(() => {
    axios
      .get(`https://adopt-pet-be.onrender.com/session`, {
        withCredentials: true,
      })
      .then((res) => {
        setNextPage(props.children);
      })
      .catch((error) => {
        setNextPage(<Navigate to="/login"></Navigate>);
      });
  });

  return nextPage;
}
