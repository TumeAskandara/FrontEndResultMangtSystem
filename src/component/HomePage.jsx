import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LogIn, UserPlus, BookOpen, ChartBar, Shield, ChevronRight } from "lucide-react";
import "./HomePageStyle.css";
import Services from "../services/service";

const HomePage = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "USER", // Default role
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (isSignUp) {
      if (!formData.firstname.trim()) {
        newErrors.firstname = "First name is required";
      }
      if (!formData.lastname.trim()) {
        newErrors.lastname = "Last name is required";
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (isSignUp) {
        console.log("Sign Up Data:", formData);
        try {
          const response = await Services("AP", "/api/v1/auth/register", "POST", formData);
          console.log("Sign up response: ", response);
          console.log("form data: ", formData);

          if (response.status === 200 || response.status === 201) {
            toast.success("Sign up successful");
            navigate("/signin");
          } else {
            toast.error("Signup failed: " + response.data.message);
          }
        } catch (error) {
          console.error("Signup error:", error);
          toast.error("An error occurred during signup.");
        }
      } else {
        try {
          const response = await Services("AP", "/api/v1/auth/authenticate", "POST", formData);
          console.log("Sign In Data:", formData);

          if (response.status === 200 || response.status === 201) {
            navigate("/homepage");
          } else {
            toast.error("Sign in failed. Please check your credentials.");
          }
        } catch (error) {
          console.error("Sign in error:", error);
          toast.error("An error occurred during sign in.");
        }
      }
    }
  };

  return (
    <div className="homepage">
      <div className="container">
        <div className="grid">
          {/* Brand Section */}
          <div className="brand-section">
            <div className="brand-header">
              <BookOpen className="brand-icon" />
              <h1 className="brand-title">Result Management</h1>
            </div>
            <p className="brand-description">
              Empowering academic success through comprehensive result tracking and analysis.
            </p>
            <div className="features">
              {[
                {
                  icon: <ChartBar className="feature-icon" />,
                  title: "Performance Tracking",
                  description: "Monitor your academic progress",
                },
                {
                  icon: <Shield className="feature-icon" />,
                  title: "Secure Access",
                  description: "Protect your academic data",
                },
                {
                  icon: <BookOpen className="feature-icon" />,
                  title: "GPA Calculator",
                  description: "Track your academic standing",
                },
              ].map((feature, index) => (
                <div key={index} className="feature-card">
                  {feature.icon}
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Form Section */}
          <div className="form-section">
            <div className="form-header">
              <h2>{isSignUp ? "Create Account" : "Welcome Back"}</h2>
              <p>{isSignUp ? "Sign up to unlock your academic potential" : "Sign in to access your dashboard"}</p>
            </div>
            <form onSubmit={handleSubmit} className="form">
              {isSignUp && (
                <>
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleInputChange}
                      className={`input ${errors.firstname ? "error" : ""}`}
                    />
                    {errors.firstname && <p className="error-message">{errors.firstname}</p>}
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleInputChange}
                      className={`input ${errors.lastname ? "error" : ""}`}
                    />
                    {errors.lastname && <p className="error-message">{errors.lastname}</p>}
                  </div>
                </>
              )}
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`input ${errors.email ? "error" : ""}`}
                />
                {errors.email && <p className="error-message">{errors.email}</p>}
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`input ${errors.password ? "error" : ""}`}
                />
                {errors.password && <p className="error-message">{errors.password}</p>}
              </div>
              {isSignUp && (
                <div className="form-group">
                  <label>Role</label>
                  <select name="role" value={formData.role} onChange={handleInputChange} className="input">
                    <option value="USER">USER</option>
                    <option value="TEACHER">TEACHER</option>
                  </select>
                </div>
              )}
              <button type="submit" className="submit-btn">
                <span className={`button-text ${isHovered ? "hovered" : ""}`}>
                  {isSignUp ? <UserPlus className="icon" /> : <LogIn className="icon" />}
                  <span>{isSignUp ? "Sign Up" : "Sign In"}</span>
                  <ChevronRight className={`chevron ${isHovered ? "hovered" : ""}`} />
                </span>
              </button>
            </form>
            <div className="toggle-signup-signin">
              <p>
                {isSignUp ? "Already have an account? " : "Don't have an account? "}
                <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="toggle-btn">
                  {isSignUp ? "Sign In" : "Sign Up"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
