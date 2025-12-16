import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TimesheetForm from './components/TimesheetForm';
import TimesheetTable from './components/TimesheetTable';
import './App.css';

// PUBLIC_INTERFACE
/**
 * Main App component for the Timesheet Tracker application
 * Manages application state, theme, and localStorage persistence
 */
function App() {
  const [theme, setTheme] = useState('light');
  const [entries, setEntries] = useState([]);

  // Load theme and entries from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('timesheetTheme');
    if (savedTheme) {
      setTheme(savedTheme);
    }

    const savedEntries = localStorage.getItem('timesheetEntries');
    if (savedEntries) {
      try {
        setEntries(JSON.parse(savedEntries));
      } catch (error) {
        console.error('Error loading saved entries:', error);
      }
    }
  }, []);

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('timesheetTheme', theme);
  }, [theme]);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('timesheetEntries', JSON.stringify(entries));
  }, [entries]);

  // PUBLIC_INTERFACE
  /**
   * Toggles between light and dark theme
   */
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // PUBLIC_INTERFACE
  /**
   * Adds a new timesheet entry
   * @param {Object} entry - The entry to add
   */
  const handleAddEntry = (entry) => {
    setEntries(prevEntries => [entry, ...prevEntries]);
  };

  // PUBLIC_INTERFACE
  /**
   * Updates an existing timesheet entry
   * @param {string} id - ID of the entry to update
   * @param {Object} updatedData - Updated entry data
   */
  const handleUpdateEntry = (id, updatedData) => {
    setEntries(prevEntries =>
      prevEntries.map(entry =>
        entry.id === id ? { ...entry, ...updatedData } : entry
      )
    );
  };

  // PUBLIC_INTERFACE
  /**
   * Deletes a timesheet entry
   * @param {string} id - ID of the entry to delete
   */
  const handleDeleteEntry = (id) => {
    setEntries(prevEntries => prevEntries.filter(entry => entry.id !== id));
  };

  return (
    <div className="App">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="main-content">
        <div className="container">
          <TimesheetForm onAddEntry={handleAddEntry} />
          <TimesheetTable
            entries={entries}
            onUpdateEntry={handleUpdateEntry}
            onDeleteEntry={handleDeleteEntry}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
