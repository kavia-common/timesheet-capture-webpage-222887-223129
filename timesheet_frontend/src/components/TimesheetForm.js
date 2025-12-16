import React, { useState } from 'react';
import './TimesheetForm.css';

// PUBLIC_INTERFACE
/**
 * TimesheetForm component for entering timesheet data
 * Provides form validation and handles entry submission
 * @param {Object} props - Component properties
 * @param {Function} props.onAddEntry - Callback function to add a new entry
 */
function TimesheetForm({ onAddEntry }) {
  const [formData, setFormData] = useState({
    date: '',
    project: '',
    task: '',
    hours: '',
    description: ''
  });

  const [errors, setErrors] = useState({});

  // PUBLIC_INTERFACE
  /**
   * Validates form data before submission
   * @returns {boolean} - Returns true if validation passes
   */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    if (!formData.project.trim()) {
      newErrors.project = 'Project name is required';
    }

    if (!formData.task.trim()) {
      newErrors.task = 'Task description is required';
    }

    if (!formData.hours) {
      newErrors.hours = 'Hours are required';
    } else if (isNaN(formData.hours) || parseFloat(formData.hours) <= 0) {
      newErrors.hours = 'Hours must be a positive number';
    } else if (parseFloat(formData.hours) > 24) {
      newErrors.hours = 'Hours cannot exceed 24';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // PUBLIC_INTERFACE
  /**
   * Handles form input changes
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // PUBLIC_INTERFACE
  /**
   * Handles form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const entry = {
        ...formData,
        hours: parseFloat(formData.hours),
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      
      onAddEntry(entry);
      
      // Reset form
      setFormData({
        date: '',
        project: '',
        task: '',
        hours: '',
        description: ''
      });
      setErrors({});
    }
  };

  return (
    <div className="timesheet-form-container">
      <h2 className="form-title">Add Timesheet Entry</h2>
      <form onSubmit={handleSubmit} className="timesheet-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date" className="form-label">
              Date <span className="required">*</span>
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`form-input ${errors.date ? 'input-error' : ''}`}
              max={new Date().toISOString().split('T')[0]}
            />
            {errors.date && <span className="error-message">{errors.date}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="project" className="form-label">
              Project <span className="required">*</span>
            </label>
            <input
              type="text"
              id="project"
              name="project"
              value={formData.project}
              onChange={handleChange}
              placeholder="Enter project name"
              className={`form-input ${errors.project ? 'input-error' : ''}`}
            />
            {errors.project && <span className="error-message">{errors.project}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="task" className="form-label">
              Task <span className="required">*</span>
            </label>
            <input
              type="text"
              id="task"
              name="task"
              value={formData.task}
              onChange={handleChange}
              placeholder="Enter task name"
              className={`form-input ${errors.task ? 'input-error' : ''}`}
            />
            {errors.task && <span className="error-message">{errors.task}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="hours" className="form-label">
              Hours <span className="required">*</span>
            </label>
            <input
              type="number"
              id="hours"
              name="hours"
              value={formData.hours}
              onChange={handleChange}
              placeholder="0.0"
              step="0.5"
              min="0"
              max="24"
              className={`form-input ${errors.hours ? 'input-error' : ''}`}
            />
            {errors.hours && <span className="error-message">{errors.hours}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter additional details (optional)"
            className="form-textarea"
            rows="3"
          />
        </div>

        <button type="submit" className="submit-btn">
          Add Entry
        </button>
      </form>
    </div>
  );
}

export default TimesheetForm;
