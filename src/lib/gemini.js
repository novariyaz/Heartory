export async function processEmotion(message, recipient) {
    try {
        const response = await fetch('/api/emotion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, recipient }),
        });

        if (!response.ok) {
            let errorMessage = 'Failed to process emotional insight.';
            try {
                const errorData = await response.json();
                errorMessage = errorData.error || errorMessage;
            } catch {
                // Response wasn't JSON (e.g. HTML error page)
            }
            throw new Error(errorMessage);
        }

        return await response.json();
    } catch (error) {
        if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
            throw new Error("Can't reach the server. Make sure the backend is running.");
        }
        console.error("Error fetching emotion from backend:", error);
        throw new Error(error.message || "Failed to process heartbeat. Please try again.");
    }
}
