import React, { useState } from 'react';
import './TimesheetTable.css';

// PUBLIC_INTERFACE
/**
 * TimesheetTable component to display and manage timesheet entries
 * Supports viewing, editing, and deleting entries
 * @param {Object} props - Component properties
 * @param {Array} props.entries - Array of timesheet entries
 * @param {Function} props.onUpdateEntry - Callback to update an entry
 * @param {Function} props.onDeleteEntry - Callback to delete an entry
 */
function TimesheetTable({ entries, onUpdateEntry, onDeleteEntry }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [errors, setErrors] = useState({});

  // PUBLIC_INTERFACE
  /**
   * Initiates edit mode for an entry
   * @param {Object} entry - Entry to edit
   */
  const handleEdit = (entry) => {
    setEditingId(entry.id);
    setEditData({
      date: entry.date,
      project: entry.project,
      task: entry.task,
      hours: entry.hours,
      description: entry.description || ''
    });
    setErrors({});
  };

  // PUBLIC_INTERFACE
  /**
   * Cancels edit mode
   */
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({});
    setErrors({});
  };

  // PUBLIC_INTERFACE
  /**
   * Validates edit form data
   * @returns {boolean} - Returns true if validation passes
   */
  const validateEditForm = () => {
    const newErrors = {};

    if (!editData.date) {
      newErrors.date = 'Date is required';
    }

    if (!editData.project?.trim()) {
      newErrors.project = 'Project name is required';
    }

    if (!editData.task?.trim()) {
      newErrors.task = 'Task description is required';
    }

    if (!editData.hours) {
      newErrors.hours = 'Hours are required';
    } else if (isNaN(editData.hours) || parseFloat(editData.hours) <= 0) {
      newErrors.hours = 'Hours must be positive';
    } else if (parseFloat(editData.hours) > 24) {
      newErrors.hours = 'Hours cannot exceed 24';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // PUBLIC_INTERFACE
  /**
   * Saves edited entry
   * @param {string} id - ID of the entry to save
   */
  const handleSaveEdit = (id) => {
    if (validateEditForm()) {
      onUpdateEntry(id, {
        ...editData,
        hours: parseFloat(editData.hours)
      });
      setEditingId(null);
      setEditData({});
      setErrors({});
    }
  };

  // PUBLIC_INTERFACE
  /**
   * Handles input changes in edit mode
   * @param {Event} e - Input change event
   */
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // PUBLIC_INTERFACE
  /**
   * Formats date for display
   * @param {string} dateString - Date string to format
   * @returns {string} - Formatted date string
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Calculate total hours
  const totalHours = entries.reduce((sum, entry) => sum + entry.hours, 0);

  if (entries.length === 0) {
    return (
      <div className="timesheet-table-container">
        <div className="table-header">
          <h2 className="table-title">Timesheet Entries</h2>
          <div className="total-hours">
            Total Hours: <span className="hours-value">0.0</span>
          </div>
        </div>
        <div className="empty-state">
          <p className="empty-message">No timesheet entries yet.</p>
          <p className="empty-hint">Add your first entry using the form above.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="timesheet-table-container">
      <div className="table-header">
        <h2 className="table-title">Timesheet Entries</h2>
        <div className="total-hours">
          Total Hours: <span className="hours-value">{totalHours.toFixed(1)}</span>
        </div>
      </div>
      <div className="table-wrapper">
        <table className="timesheet-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Project</th>
              <th>Task</th>
              <th>Hours</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.map(entry => (
              <tr key={entry.id}>
                {editingId === entry.id ? (
                  <>
                    <td>
                      <input
                        type="date"
                        name="date"
                        value={editData.date}
                        onChange={handleEditChange}
                        className={`table-input ${errors.date ? 'input-error' : ''}`}
                        max={new Date().toISOString().split('T')[0]}
                      />
                      {errors.date && <div className="error-msg">{errors.date}</div>}
                    </td>
                    <td>
                      <input
                        type="text"
                        name="project"
                        value={editData.project}
                        onChange={handleEditChange}
                        className={`table-input ${errors.project ? 'input-error' : ''}`}
                      />
                      {errors.project && <div className="error-msg">{errors.project}</div>}
                    </td>
                    <td>
                      <input
                        type="text"
                        name="task"
                        value={editData.task}
                        onChange={handleEditChange}
                        className={`table-input ${errors.task ? 'input-error' : ''}`}
                      />
                      {errors.task && <div className="error-msg">{errors.task}</div>}
                    </td>
                    <td>
                      <input
                        type="number"
                        name="hours"
                        value={editData.hours}
                        onChange={handleEditChange}
                        step="0.5"
                        min="0"
                        max="24"
                        className={`table-input ${errors.hours ? 'input-error' : ''}`}
                      />
                      {errors.hours && <div className="error-msg">{errors.hours}</div>}
                    </td>
                    <td>
                      <input
                        type="text"
                        name="description"
                        value={editData.description}
                        onChange={handleEditChange}
                        className="table-input"
                      />
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          onClick={() => handleSaveEdit(entry.id)}
                          className="action-btn save-btn"
                          title="Save"
                        >
                          ✓
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="action-btn cancel-btn"
                          title="Cancel"
                        >
                          ✕
                        </button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{formatDate(entry.date)}</td>
                    <td>{entry.project}</td>
                    <td>{entry.task}</td>
                    <td className="hours-cell">{entry.hours.toFixed(1)}</td>
                    <td className="description-cell">{entry.description || '-'}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          onClick={() => handleEdit(entry)}
                          className="action-btn edit-btn"
                          title="Edit"
                        >
                          ✎
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this entry?')) {
                              onDeleteEntry(entry.id);
                            }
                          }}
                          className="action-btn delete-btn"
                          title="Delete"
                        >
                          🗑
                        </button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TimesheetTable;
