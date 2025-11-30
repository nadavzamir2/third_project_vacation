import { Request, Response, NextFunction } from "express";
import { exportVacations } from "../db/exportVacations";

export const getExportCsvEndpoint = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vacations = await exportVacations();

        if (!vacations || vacations.length === 0) {
            return res.status(404).send("No vacations found");
        }

        const csv = convertToCSV(vacations);
        const csvWithBOM = '\uFEFF' + csv;

        // Set headers for CSV download
        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', 'attachment; filename="vacations.csv"');

        res.status(200).send(csvWithBOM);
    } catch (error) {
        console.error("Error exporting vacations to CSV:", error);
        res.status(500).send("Internal server error");
    }
}

const convertToCSV = (data: any[]): string => {
    if (data.length === 0) return '';

    const headers = ['Destination', 'Number of Followers'];

    const rows = data.map(vacation => {
        return [
            escapeCSVValue(vacation.destination),
            vacation.followers_count || 0
        ].join(',');
    });

    return [headers.join(','), ...rows].join('\n');
}

const escapeCSVValue = (value: string): string => {
    if (value == null) return '';
    const stringValue = String(value);
    
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
}

const formatDate = (date: any): string => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
