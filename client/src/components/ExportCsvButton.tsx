import { exportVacations } from '../services/exportVacations';
import { useState } from 'react';

export const ExportCsvButton = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleExport = async () => {
        try {
            setIsLoading(true);
            setError(null);

            await exportVacations();

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to export vacations';
            setError(errorMessage);
            console.error('Export error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <button
                onClick={handleExport}
                disabled={isLoading}
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    backgroundColor: isLoading ? '#cccccc' : '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px'
                }}
            >
                {isLoading ? 'Exporting...' : 'Export to CSV'}
            </button>
            {error && (
                <div style={{ color: 'red', marginTop: '10px', fontSize: '14px' }}>
                    {error}
                </div>
            )}
        </div>
    );
};
