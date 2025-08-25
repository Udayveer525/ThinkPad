import { Zap } from "lucide-react";

const RateLimitedUI = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <Zap className="mx-auto mb-4 text-yellow-500" size={48} />
            <h2 className="text-2xl font-semibold mb-2">Rate Limit Exceeded</h2>
            <p className="text-gray-600 mb-4">
            You've made too many requests in a short period. Please wait a moment before trying again.
            </p>
            <button
            className="btn btn-primary"
            onClick={() => window.location.reload()}
            >
            Retry
            </button>
        </div>
        </div>
    );
}

export default RateLimitedUI;