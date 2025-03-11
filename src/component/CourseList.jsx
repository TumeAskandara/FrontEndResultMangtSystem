// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import CourseService from '../services/CourseService';

// const CourseList = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const fetchCourses = async () => {
//     try {
//       setLoading(true);
//       const response = await CourseService.getAllCourses();
//       if (response.status === 200) {
//         setCourses(response.body);
//       } else {
//         setError('Failed to fetch courses');
//       }
//     } catch (err) {
//       setError('Error connecting to server');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this course?')) {
//       try {
//         const response = await CourseService.deleteCourse(id);
//         if (response.status === 204) {
//           setCourses(courses.filter(course => course.Id !== id));
//         } else {
//           setError('Failed to delete course');
//         }
//       } catch (err) {
//         setError('Error connecting to server');
//         console.error(err);
//       }
//     }
//   };

//   if (loading) return <div className="text-center p-4">Loading courses...</div>;
//   if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Courses</h1>
//         <Link 
//           to="/courses/new" 
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Add New Course
//         </Link>
//       </div>
      
//       {courses.length === 0 ? (
//         <p className="text-center p-4">No courses found</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="py-2 px-4 border-b text-left">Code</th>
//                 <th className="py-2 px-4 border-b text-left">Title</th>
//                 <th className="py-2 px-4 border-b text-left">Course Master</th>
//                 <th className="py-2 px-4 border-b text-left">Credits</th>
//                 <th className="py-2 px-4 border-b text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {courses.map((course) => (
//                 <tr key={course.Id} className="hover:bg-gray-50">
//                   <td className="py-2 px-4 border-b">{course.code}</td>
//                   <td className="py-2 px-4 border-b">{course.courseTitle}</td>
//                   <td className="py-2 px-4 border-b">{course.courseMaster}</td>
//                   <td className="py-2 px-4 border-b">{course.credits}</td>
//                   <td className="py-2 px-4 border-b">
//                     <div className="flex space-x-2">
//                       <Link 
//                         to={`/courses/${course.Id}`}
//                         className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
//                       >
//                         View
//                       </Link>
//                       <Link 
//                         to={`/courses/edit/${course.Id}`}
//                         className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
//                       >
//                         Edit
//                       </Link>
//                       <button 
//                         onClick={() => handleDelete(course.Id)}
//                         className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CourseList;