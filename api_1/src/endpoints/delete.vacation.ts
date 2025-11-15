import { Request, Response } from "express";
import { deleteVacation } from "../db/deleteVacation";  

export const deleteVacationEndpoint = async (req: Request, res: Response) => {  
    const query = req.query;  
    const id = query.id;  
    if (!id) {  
        return res.status(400).send("id is required");  
    }  
    if (isNaN(Number(id))) {  
        return res.status(400).send("Invalid id");  
    }  
    const deleted = await deleteVacation(Number(id));  
    if (!deleted) {  
        return res.status(404).send("Vacation not found");  
    }  
    res.status(200).send({ message: "Vacation deleted successfully" });  
}
