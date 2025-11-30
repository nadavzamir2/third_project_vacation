export const exportVacations = async (): Promise<void> => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('Authentication required');
    }

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/vacations/export`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Export failed with status ${response.status}`);
    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'vacations.csv';

    document.body.appendChild(link);
    link.click();

    
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
};
