import { useState } from "react";
import { PlusCircle, BookOpen, User, Star, Key, AlertCircle, CheckCircle } from "lucide-react";

const CourseForm = () => {
  const [course, setCourse] = useState({
    code: "",
    courseTitle: "",
    courseMaster: "",
    credits: "",
    id: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const [hovered, setHovered] = useState(false);

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("http://localhost:15002/api/courses/createCourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(course),
      });
      const data = await response.json();
      if (response.ok) {
        setMessageType("success");
        setMessage("Course created successfully!");
        setCourse({ code: "", courseTitle: "", courseMaster: "", credits: "", id: "" });
      } else {
        setMessageType("error");
        setMessage(data.message || "Failed to create course");
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
              <BookOpen className="brand-icon" />
              <h2>Create Course</h2>
            </div>
            <p>Add a new course to your curriculum with all the necessary details</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="code">Course Code</label>
              <div className="input-wrapper" style={{ position: "relative" }}>
                <Key className="icon" style={{ position: "absolute", left: "14px", top: "14px", color: "var(--primary-color)", opacity: 0.7 }} />
                <input 
                  id="code"
                  name="code" 
                  value={course.code} 
                  onChange={handleChange} 
                  placeholder="Enter course code" 
                  required 
                  className="input"
                  style={{ paddingLeft: "46px" }}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="courseTitle">Course Title</label>
              <div className="input-wrapper" style={{ position: "relative" }}>
                <BookOpen className="icon" style={{ position: "absolute", left: "14px", top: "14px", color: "var(--primary-color)", opacity: 0.7 }} />
                <input 
                  id="courseTitle"
                  name="courseTitle" 
                  value={course.courseTitle} 
                  onChange={handleChange} 
                  placeholder="Enter course title" 
                  required 
                  className="input"
                  style={{ paddingLeft: "46px" }}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="courseMaster">Course Master</label>
              <div className="input-wrapper" style={{ position: "relative" }}>
                <User className="icon" style={{ position: "absolute", left: "14px", top: "14px", color: "var(--primary-color)", opacity: 0.7 }} />
                <input 
                  id="courseMaster"
                  name="courseMaster" 
                  value={course.courseMaster} 
                  onChange={handleChange} 
                  placeholder="Enter course master" 
                  required 
                  className="input"
                  style={{ paddingLeft: "46px" }}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="credits">Credits</label>
              <div className="input-wrapper" style={{ position: "relative" }}>
                <Star className="icon" style={{ position: "absolute", left: "14px", top: "14px", color: "var(--primary-color)", opacity: 0.7 }} />
                <input 
                  id="credits"
                  name="credits" 
                  type="number" 
                  step="0.1"
                  min="0"
                  value={course.credits} 
                  onChange={handleChange} 
                  placeholder="Enter credits" 
                  required 
                  className="input"
                  style={{ paddingLeft: "46px" }}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="id">Course ID (Optional)</label>
              <div className="input-wrapper" style={{ position: "relative" }}>
                <Key className="icon" style={{ position: "absolute", left: "14px", top: "14px", color: "var(--primary-color)", opacity: 0.3 }} />
                <input 
                  id="id"
                  name="id" 
                  value={course.id} 
                  onChange={handleChange} 
                  placeholder="Enter course ID or leave blank to auto-generate" 
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
                  <>Loading...</>
                ) : (
                  <>
                    <PlusCircle className="icon" />
                    Create Course
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

export default CourseForm;