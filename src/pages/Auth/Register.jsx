import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] px-4 py-10">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-lg overflow-hidden">
                
                {/* HEADER */}
                <div className="bg-[#c7a27a] text-white text-center py-10 px-6">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-white/20 flex items-center justify-center font-semibold">
                        LC
                    </div>
                    <h2 className="text-xl font-semibold">Create Account</h2>
                    <p className="text-sm opacity-90">
                        Join Lumière Clinic admin team
                    </p>
                </div>

                {/* FORM */}
                <div className="p-6">
                    <form className="space-y-4">

                        {/* FULL NAME */}
                        <div>
                            <label className="text-sm text-gray-600">Full Name</label>
                            <input
                                type="text"
                                placeholder="Dr. Anugrah(Contoh)"
                                className="w-full mt-1 px-4 py-2 bg-gray-100 rounded-xl outline-none"
                            />
                        </div>

                        {/* EMAIL */}
                        <div>
                            <label className="text-sm text-gray-600">Email Address</label>
                            <input
                                type="email"
                                placeholder="admin@anugrah.com(Contoh)"
                                className="w-full mt-1 px-4 py-2 bg-gray-100 rounded-xl outline-none"
                            />
                        </div>

                        {/* PHONE */}
                        <div>
                            <label className="text-sm text-gray-600">Phone Number</label>
                            <input
                                type="text"
                                placeholder="+62 812-3456-7890(Contoh)"
                                className="w-full mt-1 px-4 py-2 bg-gray-100 rounded-xl outline-none"
                            />
                        </div>

                        {/* PASSWORD */}
                        <div>
                            <label className="text-sm text-gray-600">Password</label>
                            <input
                                type="password"
                                placeholder="Create a strong password"
                                className="w-full mt-1 px-4 py-2 bg-gray-100 rounded-xl outline-none"
                            />
                        </div>

                        {/* CONFIRM PASSWORD */}
                        <div>
                            <label className="text-sm text-gray-600">Confirm Password</label>
                            <input
                                type="password"
                                placeholder="Confirm your password"
                                className="w-full mt-1 px-4 py-2 bg-gray-100 rounded-xl outline-none"
                            />
                        </div>

                        {/* TERMS */}
                        <p className="text-xs text-gray-500 text-center">
                            I agree to the{" "}
                            <span className="text-[#c7a27a] cursor-pointer">Terms of Service</span>{" "}
                            and{" "}
                            <span className="text-[#c7a27a] cursor-pointer">Privacy Policy</span>
                        </p>

                        {/* BUTTON */}
                        <button
                            type="submit"
                            className="w-full bg-[#c7a27a] hover:bg-[#b8936c] text-white py-2 rounded-xl font-medium transition"
                        >
                            Create Account
                        </button>
                    </form>

                    {/* FOOTER */}
                    <p className="text-center text-sm text-gray-500 mt-4">
                        Already have an account?{" "}
                        <span
                            className="text-[#c7a27a] cursor-pointer hover:underline"
                            onClick={() => navigate("/login")}
                        >
                            Sign In
                        </span>
                    </p>
                </div>

                <p className="text-center text-xs text-gray-400 pb-4">
                    © 2026 Lumière Clinic. All rights reserved.
                </p>
            </div>
        </div>
    );
}