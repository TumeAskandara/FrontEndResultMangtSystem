// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import CourseService from '../services/CourseService';

// const CourseDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   const [course, setCourse] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchCourse();
//   }, [id]);

//   const fetchCourse = async () => {
//     try {
//       setLoading(true);
//       const response = await CourseService.getCourseById(id);
//       if (response.status === 200) {
//         setCourse(response.body);
//       } else {
//         setError('Failed to fetch course details');
//       }
//     } catch (err) {
//       setError('Error connecting to server');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (window.confirm('Are you sure you want to delete this course?')) {
//       try {
//         const response = await CourseService.deleteCourse(id);
//         if (response.status === 204) {
//           navigate('/courses');
//         } else {
//           setError('Failed to delete course');
//         }
//       } catch (err) {
//         setError('Error connecting to server');
//         console.error(err);
//       }
//     }
//   };

//   if (loading) return <div className="text-center p-4">Loading course details...</div>;
//   if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
//   if (!course) return <div className="text-center p-4">Course not found</div>;

//   return (
//     <div className="p-4 max-w-2xl mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">{course.courseTitle}</h1>
//         <div className="flex space-x-2">
//           <Link 
//             to="/courses" 
//             className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
//           >
//             Back to List
//           </Link>
//         </div>
//       </div>
      
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <h3 className="text-sm font-medium text-gray-500">Course ID</h3>
//             <p className="mt-1">{course.Id}</p>
//           </div>
          
//           <div>
//             <h3 className="text-sm font-medium text-gray-500">Course Code</h3>
//             <p className="mt-1">{course.code}</p>
//           </div>
          
//           <div>
//             <h3 className="text-sm font-medium text-gray-500">Course Title</h3>
//             <p className="mt-1">{course.courseTitle}</p>
//           </div>
          
//           <div>
//             <h3 className="text-sm font-medium text-gray-500">Course Master</h3>
//             <p className="mt-1">{course.courseMaster}</p>
//           </div>
          
//           <div>
//             <h3 className="text-sm font-medium text-gray-500">Credits</h3>
//             <p className="mt-1">{course.credits}</p>
//           </div>
//         </div>
        
//         <div className="mt-6 flex space-x-3">
//           <Link 
//             to={`/courses/edit/${course.Id}`}
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             Edit
//           </Link>
          
//           <button 
//             onClick={handleDelete}
//             className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//           >
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseDetail;