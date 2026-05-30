import { Breadcrumb } from './layout';
import { Button } from './ui';

// Export utility functions for staff components
export { getStatusColor, getRoleColor } from './ui/staff-card';

// Export staff-related components
export { StatsCard } from './ui/stats-card';
export { StaffCard } from './ui/staff-card';
export { StaffForm } from './ui/staff-form';
export { StaffProfileModal } from './ui/staff-profile-modal';

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
          <Button onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
