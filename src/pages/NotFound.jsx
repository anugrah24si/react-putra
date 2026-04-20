import ErrorPage from "../components/ErrorPage";

export default function NotFound() {
    return (
        <ErrorPage
            errorCode="404"
            description="Page Not Found"
            image="/img/error-404.svg"
        />
    );
}
