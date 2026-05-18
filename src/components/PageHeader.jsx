import { Breadcrumb } from './layout';
import Button from './ui/Button';

// Export utility functions for staff components
export { getStatusColor, getRoleColor } from './ui/StaffCard';

// Export staff-related components
export { default as StatsCard } from './ui/StatsCard';
export { default as StaffCard } from './ui/StaffCard';
export { default as StaffForm } from './ui/StaffForm';
export { default as StaffProfileModal } from './ui/StaffProfileModal';

/**
 * PageHeader Component - Header untuk halaman dengan title, breadcrumb, dan action button
 * 
 * @param {string} title - Judul halaman
 * @param {string} subtitle - Subtitle dengan breadcrumb (dipisah dengan " /")
 * @param {string} actionLabel - Label untuk action button
 * @param {function} onAction - Handler saat action button diklik
 */
export default function PageHeader({ title, subtitle, actionLabel, onAction }) {
  // Parse breadcrumb items dari subtitle
  const breadcrumbItems = subtitle
    .split(" /")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <div id="pageheader-container">
      {/* Left side: Title and Breadcrumb */}
      <div id="pageheader-left">
        <span id="page-title">{title}</span>
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Right side: Action Button */}
      {actionLabel && (
        <div id="action-button">
          <button id="add-button" onClick={onAction}>
            {actionLabel}
          </button>
        </div>
      )}
    </div>
  );
}
