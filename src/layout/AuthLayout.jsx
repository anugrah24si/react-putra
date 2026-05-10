import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    // Keep a minimal wrapper so auth pages control their own full-page styles
    return (
        <div className="min-h-screen">
            <Outlet />
        </div>
    );
}
