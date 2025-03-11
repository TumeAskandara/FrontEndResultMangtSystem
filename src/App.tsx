import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./component/HomePage";
// import CourseDetail from "./component/CourseDetail";
import CourseForm from "./component/CourseForm";
// import CourseList from "./component/CourseDetail";
import PostResultComponent from "./result/PostResultComponent";
import StudentResult from "./result/StudentResults";

function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/CourseDetail" element={<CourseDetail/>} />
        <Route path ="/CourseList" element={<CourseList/>} /> */}
        <Route path="/CourseForm" element={<CourseForm/>} />
        <Route path="/PostResultComponent" element={<PostResultComponent/>} />
        <Route path="/StudentResult" element={<StudentResult/>} />
      </Routes>
    </Router>
  );
}

export default App;
