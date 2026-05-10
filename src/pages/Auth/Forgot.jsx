import { useNavigate } from "react-router-dom";

export default function Forgot() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] px-4 py-10">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-lg overflow-hidden">
                
                {/* HEADER */}
                <div className="bg-[#c7a27a] text-white text-center py-10 px-6">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-white/20 flex items-center justify-center">
                        ✉️
                    </div>
                    <h2 className="text-xl font-semibold">Forgot Password?</h2>
                    <p className="text-sm opacity-90">
                        No worries, we’ll send you reset instructions
                    </p>
                </div>

                {/* FORM */}
                <div className="p-6">
                    <form className="space-y-4">

                        {/* EMAIL */}
                        <div>
                            <label className="text-sm text-gray-600">
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="registered email"
                                className="w-full mt-1 px-4 py-2 bg-gray-100 rounded-xl outline-none"
                            />
                            <p className="text-xs text-gray-400 mt-1">
                                Enter the email address associated with your account
                            </p>
                        </div>

                        {/* BUTTON */}
                        <button
                            type="submit"
                            className="w-full bg-[#c7a27a] hover:bg-[#b8936c] text-white py-2 rounded-xl font-medium transition"
                        >
                            Send Reset Link
                        </button>
                    </form>

                    {/* BACK */}
                    <p
                        className="text-center text-sm text-gray-500 mt-4 cursor-pointer hover:text-[#c7a27a] transition-colors"
                        onClick={() => navigate("/login")}
                    >
                        ← Back to Sign In
                    </p>
                </div>

                {/* FOOTER */}
                <p className="text-center text-xs text-gray-400 pb-4">
                    © 2026 Lumière Clinic. All rights reserved.
                </p>
            </div>
        </div>
    );
}