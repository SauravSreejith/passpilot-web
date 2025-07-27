const API_BASE_URL = "http://localhost:5000"; // Your backend server URL

// Generic fetch function with error handling
async function fetchApi(endpoint: string, options: RequestInit = {}) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'An API error occurred');
        }
        return response.json();
    } catch (error) {
        console.error(`API call to ${endpoint} failed:`, error);
        throw error;
    }
}

// --- API Functions ---

export const getTopicsForCourse = (courseCode: string) => {
    return fetchApi(`/topics-for-course?code=${courseCode}`);
};

export const getPassStrategy = (data: {
    studied_topics: string[];
    internal_marks: number;
}) => {
    return fetchApi('/pass-strategy', {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

export const getPassSimulation = (data: {
    studied_topics: string[];
    internal_marks: number;
}) => {
    return fetchApi('/pass-simulation', {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

export const getQuestionsForTopic = (topic: string) => {
    return fetchApi('/query', {
        method: 'POST',
        body: JSON.stringify({ query: topic, top_k: 10 }), // Get top 10 questions
    });
};

// ... (keep the other functions)

export const askRAG = (query: string) => {
    return fetchApi('/ask', {
        method: 'POST',
        body: JSON.stringify({ query: query }),
    });
};