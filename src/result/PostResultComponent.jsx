import { useState } from "react";
import { User, Book, Calculator, FileText, Award, PlusCircle, AlertCircle, CheckCircle } from "lucide-react";
// import "./ResultComponent.css"

const PostResultComponent = () => {
  const [result, setResult] = useState({
    studentId: "",
    courseId: "",
    ca: "",
    exams: "",
    credit: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const [hovered, setHovered] = useState(false);

  const handleChange = (e) => {
    setResult({ ...result, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:15002/api/results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result),
      });

      const data = await response.json();
      if (response.ok) {
        setMessageType("success");
        setMessage("Result submitted successfully!");
        setResult({ studentId: "", courseId: "", ca: "", exams: "", credit: "" });
      } else {
        setMessageType("error");
        setMessage(data.message || "Failed to submit result");
      }
    } catch (error) {
      setMessageType("error");
      setMessage("Error submitting data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="homepage">
      <div className="container">
        <div className="form-section">
          <div className="form-header">
            <div className="brand-header">
              <FileText className="brand-icon" />
              <h2>Submit Result</h2>
            </div>
            <p>Record student's performance and grades for the selected course</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="studentId">Student ID</label>
              <div className="input-wrapper" style={{ position: "relative" }}>
                <User className="icon" style={{ position: "absolute", left: "14px", top: "14px", color: "var(--primary-color)", opacity: 0.7 }} />
                <input 
                  id="studentId"
                  name="studentId" 
                  value={result.studentId} 
                  onChange={handleChange} 
                  placeholder="Enter student ID" 
                  required 
                  className="input"
                  style={{ paddingLeft: "46px" }}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="courseId">Course ID</label>
              <div className="input-wrapper" style={{ position: "relative" }}>
                <Book className="icon" style={{ position: "absolute", left: "14px", top: "14px", color: "var(--primary-color)", opacity: 0.7 }} />
                <input 
                  id="courseId"
                  name="courseId" 
                  value={result.courseId} 
                  onChange={handleChange} 
                  placeholder="Enter course ID" 
                  required 
                  className="input"
                  style={{ paddingLeft: "46px" }}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="ca">Continuous Assessment (0-30)</label>
              <div className="input-wrapper" style={{ position: "relative" }}>
                <Calculator className="icon" style={{ position: "absolute", left: "14px", top: "14px", color: "var(--primary-color)", opacity: 0.7 }} />
                <input 
                  id="ca"
                  name="ca" 
                  type="number"
                  min="0"
                  max="30"
                  value={result.ca} 
                  onChange={handleChange} 
                  placeholder="Enter CA score (0-30)" 
                  required 
                  className="input"
                  style={{ paddingLeft: "46px" }}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="exams">Examination Score (0-70)</label>
              <div className="input-wrapper" style={{ position: "relative" }}>
                <FileText className="icon" style={{ position: "absolute", left: "14px", top: "14px", color: "var(--primary-color)", opacity: 0.7 }} />
                <input 
                  id="exams"
                  name="exams" 
                  type="number"
                  min="0"
                  max="70"
                  value={result.exams} 
                  onChange={handleChange} 
                  placeholder="Enter exam score (0-70)" 
                  required 
                  className="input"
                  style={{ paddingLeft: "46px" }}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="credit">Course Credit</label>
              <div className="input-wrapper" style={{ position: "relative" }}>
                <Award className="icon" style={{ position: "absolute", left: "14px", top: "14px", color: "var(--primary-color)", opacity: 0.7 }} />
                <input 
                  id="credit"
                  name="credit" 
                  type="number"
                  step="0.1"
                  min="0"
                  value={result.credit} 
                  onChange={handleChange} 
                  placeholder="Enter course credit" 
                  required 
                  className="input"
                  style={{ paddingLeft: "46px" }}
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <span className="button-text">
                {loading ? (
                  <>Submitting...</>
                ) : (
                  <>
                    <PlusCircle className="icon" />
                    Submit Result
                    <span className={`chevron ${hovered ? "hovered" : ""}`} style={{ marginLeft: "8px" }}>→</span>
                  </>
                )}
              </span>
            </button>
          </form>
          
          {message && (
            <div className={`${messageType === "error" ? "error-message" : ""}`} style={{
              marginTop: "20px",
              padding: "16px",
              borderRadius: "12px",
              backgroundColor: messageType === "success" ? "rgba(0, 210, 0, 0.1)" : "rgba(255, 48, 48, 0.1)",
              border: `1px solid ${messageType === "success" ? "rgba(0, 210, 0, 0.5)" : "rgba(255, 48, 48, 0.5)"}`,
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}>
              {messageType === "success" ? 
                <CheckCircle style={{ color: "green" }} /> : 
                <AlertCircle style={{ color: "var(--error-color)" }} />
              }
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostResultComponent;