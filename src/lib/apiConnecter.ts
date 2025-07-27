export interface HealthStatus {
    server_status: 'healthy';
    exam_analyzer_ready: boolean;
    rag_analyzer_ready: boolean;
}

export interface RagAnswer {
    query: string;
    answer: string;
}

export interface ReindexStatus {
    status: 'success';
    message: string;
}

export interface PassStrategyParams {
    studied_topics: string[];
    internal_marks: number;
    external_pass_threshold: number;
    overall_pass_threshold: number;
}

export interface PassStrategyResponse {
    current_estimated_score: number;
    target_marks: number;
    score_deficit: number;
    projected_new_score: number;
    summary: string;
    recommendations: Array<{
        topic_name: string;
        potential_marks: number;
        strategic_value: number;
    }>;
    inputs: {
        studied_topics: string[];
        calculated_target_marks: number;
    };
}

export interface PassSimulationResponse {
    pass_probability: number;
    target_marks: number;
    projected_score: {
        average: number;
        median: number;
    };
    score_distribution: {
        likely_range_5_to_95_percentile: [number, number];
    };
    inputs: {
        studied_topics: string[];
        calculated_target_marks: number;
    };
}

export interface DatasetStats {
    total_questions: number;
    total_courses: number;
    total_topics: number;
    courses: Record<string, number>;
    topics: Record<string, number>;
    is_fitted: boolean;
}

export interface TopicsForCourseResponse {
    course_code: string;
    topics: string[];
}

export class ApiConnector {
    private readonly baseUrl: string;

    constructor(baseUrl: string = 'http://127.0.0.1:5000') {
        this.baseUrl = baseUrl;
    }

    async getHealth(): Promise<HealthStatus> {
        try {
            const response = await fetch(`${this.baseUrl}/health`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API Error (${response.status}): ${errorData.message || 'Failed to fetch health status'}`);
            }
            return await response.json();
        } catch (error) {
            throw new Error(`API Error: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async askQuestion(query: string): Promise<RagAnswer> {
        try {
            const response = await fetch(`${this.baseUrl}/ask`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API Error (${response.status}): ${errorData.message || 'Failed to ask question'}`);
            }
            return await response.json();
        } catch (error) {
            throw new Error(`API Error: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async triggerReindex(): Promise<ReindexStatus> {
        try {
            const response = await fetch(`${this.baseUrl}/re-index`, {
                method: 'POST',
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API Error (${response.status}): ${errorData.message || 'Failed to trigger re-indexing'}`);
            }
            return await response.json();
        } catch (error) {
            throw new Error(`API Error: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async getPassStrategy(params: PassStrategyParams): Promise<PassStrategyResponse> {
        try {
            const response = await fetch(`${this.baseUrl}/pass-strategy`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API Error (${response.status}): ${errorData.message || 'Failed to get pass strategy'}`);
            }
            return await response.json();
        } catch (error) {
            throw new Error(`API Error: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async runPassSimulation(params: PassStrategyParams): Promise<PassSimulationResponse> {
        try {
            const response = await fetch(`${this.baseUrl}/pass-simulation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API Error (${response.status}): ${errorData.message || 'Failed to run pass simulation'}`);
            }
            return await response.json();
        } catch (error) {
            throw new Error(`API Error: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async getStats(): Promise<DatasetStats> {
        try {
            const response = await fetch(`${this.baseUrl}/stats`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API Error (${response.status}): ${errorData.message || 'Failed to get stats'}`);
            }
            return await response.json();
        } catch (error) {
            throw new Error(`API Error: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async getTopicsForCourse(code: string): Promise<TopicsForCourseResponse> {
        try {
            const response = await fetch(`${this.baseUrl}/topics-for-course?code=${code}`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API Error (${response.status}): ${errorData.message || 'Failed to get topics for course'}`);
            }
            return await response.json();
        } catch (error) {
            throw new Error(`API Error: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
}