import { LoadingSpinner } from './ui';

/**
 * Loading Component - Full screen loading page
 * Menggunakan LoadingSpinner reusable component
 */
export default function Loading() {
    return (
        <LoadingSpinner
            size="md"
            text="Loading..."
            fullScreen={true}
        />
    );
}
