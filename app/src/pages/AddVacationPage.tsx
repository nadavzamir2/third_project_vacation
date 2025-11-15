import { getVacationById } from "@/services/getVacationById";
import { Vacation } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { createVacation } from "@/services/createVacation";



export const AddVacationPage = () => {
  const [vacation, setVacation] = useState({
    destination: "",
    description: "",
    startDate: "",
    endDate: "",
    price: "",
    image: null as File | null,
  });
  return (
    <div className="add-vacation-page">
      <h1>Add Vacation</h1>
    </div>
)
}
  const [error, setError] = useState("");
