import Services from './service';

export default class CourseService {
  static async getAllCourses() {
    return await Services('AP', 'course', '', 'GET', null);
  }

  
  static async getCourseById(id) {
    return await Services('AP', 'course', `/${id}`, 'GET', null);
  }

  static async createCourse(courseData) {
    return await Services('AP','course', '', 'POST', courseData);
  }

  static async updateCourse(id, courseData) {
    return await Services('AP', 'course', `/${id}`, 'PUT', courseData);
  }

  static async deleteCourse(id) {
    return await Services('AP', 'course', `/${id}`, 'DELETE', null);
  }
}