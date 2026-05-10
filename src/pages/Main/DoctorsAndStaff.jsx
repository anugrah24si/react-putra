import { useState, useMemo } from 'react';
import { Users, UserCheck, Clock, Plus, UserPlus, Filter, X } from 'lucide-react';
import { StaffCard, StaffProfileModal, StaffForm, StatsCard } from '../../components/PageHeader';
import staffData from '../../data/staff.json';
import '../../styles/staff.css';

const ROLES = ['Doctor', 'Nurse', 'Therapist', 'Receptionist'];
const EMPTY_STAFF_FORM = { 
  name: '', 
  role: '', 
  specialization: '', 
  email: '', 
  phone: '', 
  schedule: '', 
  location: '', 
  status: 'Active' 
};

export default function DoctorsAndStaff() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [showFilter, setShowFilter] = useState(false);
  
  // Profile Modal states
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Add Staff Modal states
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_STAFF_FORM);

  // Calculate stats
  const stats = useMemo(() => {
    const totalStaff = staffData.length;
    const activeDoctors = staffData.filter(
      (staff) => staff.role === 'Doctor' && staff.status === 'Active'
    ).length;
    const onDutyToday = staffData.filter(
      (staff) => staff.status === 'Active'
    ).length;
    const availableNow = staffData.filter(
      (staff) => staff.status === 'Active' && staff.role !== 'Receptionist'
    ).length;

    return {
      totalStaff,
      activeDoctors,
      onDutyToday,
      availableNow,
    };
  }, []);

  // Filter staff based on search and role
  const filteredStaff = useMemo(() => {
    return staffData.filter((staff) => {
      const matchesSearch =
        staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.specialization
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        staff.role.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole =
        filterRole === 'all' || staff.role.toLowerCase() === filterRole.toLowerCase();

      return matchesSearch && matchesRole;
    });
  }, [searchTerm, filterRole]);

  const handleViewProfile = (staff) => {
    setSelectedStaff(staff);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStaff(null);
  };

  // Add Staff handlers
  function handleFormChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleAddStaff(e) {
    e.preventDefault();
    // Here you would add the staff to your data
    console.log('Adding staff:', form);
    setForm(EMPTY_STAFF_FORM);
    setAddOpen(false);
  }

  function handleCloseAddForm() {
    setForm(EMPTY_STAFF_FORM);
    setAddOpen(false);
  }

  return (
    <div className="staff-page">
      {/* Header */}
      <div className="staff-page__header">
        <h1 className="staff-page__title">Doctors & Staff</h1>
        <p className="staff-page__subtitle">Manage your medical team and staff members</p>
      </div>

      {/* Action Bar */}
      <div className="staff-page__actions">
        <div style={{ flex: 1 }}>
          <div style={{ position: 'relative', maxWidth: '576px' }}>
            <input
              type="text"
              placeholder="Search doctors, staff, specializations..."
              className="staff-page__search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              style={{
                position: 'absolute',
                left: '16px',
                top: '13px',
                width: '20px',
                height: '20px',
              }}
              viewBox="0 0 20 20"
              fill="none"
            >
              <circle
                cx="8.5"
                cy="8.5"
                r="5.5"
                stroke="#8B8581"
                strokeWidth="1.67"
              />
              <path
                d="M13 13L17 17"
                stroke="#8B8581"
                strokeWidth="1.67"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        <div className="staff-page__action-group">
          {/* Filter Button */}
          <div style={{ position: 'relative' }}>
            <button 
              className="staff-page__filter"
              onClick={() => setShowFilter(v => !v)}
            >
              <Filter size={16} />
              <span>Filter</span>
            </button>
            {showFilter && (
              <div className="staff-filter-pop">
                <p className="staff-filter-pop__label">Role</p>
                <select 
                  className="staff-input" 
                  value={filterRole} 
                  onChange={(e) => { 
                    setFilterRole(e.target.value); 
                    setShowFilter(false); 
                  }}
                >
                  <option value="all">All Roles</option>
                  {ROLES.map(r => <option key={r} value={r.toLowerCase()}>{r}</option>)}
                </select>
              </div>
            )}
          </div>

          {/* Add Staff Button */}
          <button 
            className="staff-page__btn staff-page__btn--primary"
            onClick={() => setAddOpen(true)}
          >
            <Plus size={16} />
            <span>Add Staff</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <StatsCard
          label="Total Staff"
          value={stats.totalStaff}
          icon={Users}
        />
        <StatsCard
          label="Active Doctors"
          value={stats.activeDoctors}
          icon={UserCheck}
        />
        <StatsCard
          label="On Duty Today"
          value={stats.onDutyToday}
          icon={Clock}
        />
        <StatsCard
          label="Available Now"
          value={stats.availableNow}
          icon={UserPlus}
        />
      </div>

      {/* Staff Grid */}
      <div className="staff-grid">
        {filteredStaff.length > 0 ? (
          filteredStaff.map((staff) => (
            <StaffCard
              key={staff.id}
              staff={staff}
              onViewProfile={handleViewProfile}
            />
          ))
        ) : (
          <div
            style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '40px 20px',
              color: '#8B8581',
            }}
          >
            <p style={{ fontSize: '16px', margin: '0' }}>
              No staff members found matching your search.
            </p>
          </div>
        )}
      </div>

      {/* Add Staff Form Modal */}
      {addOpen && (
        <StaffForm
          title="Add New Staff Member"
          form={form}
          onChange={handleFormChange}
          onSubmit={handleAddStaff}
          onClose={handleCloseAddForm}
          submitLabel="Add Staff"
        />
      )}

      {/* Staff Profile Modal */}
      <StaffProfileModal 
        staff={selectedStaff} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
}
