import React, { useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import Services from "../services/service";
// Import PrimeReact styles
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
// Import our custom CSS
import "./StudentResults.css";

const StudentResults = () => {
  const [studentId, setStudentId] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchResults = async () => {
    if (!studentId.trim()) {
      setError("Student ID is required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await Services("AP", `/api/results/student/getResultByStudentId${studentId}`, "GET");
      
      if (response.status === 200) {
        setResults(response.body);
      } else {
        setError("No results found for this student.");
      }
    } catch (err) {
      setError("Failed to fetch results. Please try again.");
    }
    
    setLoading(false);
  };

  // Template for the grade column
  const gradeTemplate = (rowData) => {
    return <span className="grade-badge">{rowData.grade}</span>;
  };

  // Template for the status column
  const statusTemplate = (rowData) => {
    const statusClass = rowData.status.toLowerCase() === 'pass' 
      ? 'status-pass' 
      : 'status-fail';
    
    return <span className={`status-badge ${statusClass}`}>{rowData.status}</span>;
  };

  // Header for the results table
  const header = (
    <div className="table-header">Course Results</div>
  );

  return (
    <div className="results-container">
      <Card className="results-card">
        <div className="header-section">
          <h2 className="main-title">Student Results Portal</h2>
          <p className="subtitle">Enter a student ID to view their academic performance</p>
        </div>

        <div className="p-card-body">
          <div className="search-section">
            <InputText
              placeholder="Enter Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="student-id-input"
            />
            <Button
              label="Get Results"
              icon="pi pi-search"
              onClick={fetchResults}
              className="search-button"
            />
          </div>

          {loading && (
            <div className="loading-container">
              <ProgressSpinner style={{ width: '50px', height: '50px' }} />
            </div>
          )}
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {results && (
            <div className="results-section">
              <Card className="summary-card">
                <div className="summary-content">
                  <h3 className="summary-title">Academic Summary</h3>
                  <div className="gpa-display">
                    GPA: {results.cumulativeGPA.toFixed(2)}
                  </div>
                </div>
              </Card>

              <DataTable 
                value={results.results} 
                paginator 
                rows={5} 
                rowsPerPageOptions={[5, 10, 25]} 
                tableStyle={{ minWidth: '50rem' }}
                header={header}
                emptyMessage="No results found"
                stripedRows
                responsiveLayout="scroll"
                className="results-table"
              >
                <Column field="courseId" header="Course ID" sortable />
                <Column field="ca" header="CA" sortable body={(rowData) => `${rowData.ca}/30`} />
                <Column field="exams" header="Exams" sortable body={(rowData) => `${rowData.exams}/70`} />
                <Column field="total" header="Total" sortable body={(rowData) => `${rowData.total}/100`} />
                <Column field="grade" header="Grade" body={gradeTemplate} sortable />
                <Column field="status" header="Status" body={statusTemplate} sortable />
              </DataTable>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default StudentResults;