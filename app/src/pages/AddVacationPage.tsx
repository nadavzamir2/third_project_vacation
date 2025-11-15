import { getVacationById } from "@/services/getVacationById";
import { Vacation } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { createVacation } from "@/services/createVacation";



export const AddVacationPage = () => {
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState(null as string | null);
  useEffect(() => {
    if (firstName === "nadav") {
      setFirstNameError("Nadav is the king!")
    } else {
      setFirstNameError(null);
    }
  }, [firstName])
  return (
    <div className="add-vacation-page">
      <h1>Add Vacation {firstName}</h1>
      <form>
        <label>First Name
        <input type="text" value={firstName} onChange={(e) => { setFirstName(e.target.value) }}></input>
        </label>
        {firstNameError && (<div>{firstNameError}</div>)}
      </form>
    </div>
  )
}
