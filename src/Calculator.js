import React, { useEffect, useState } from "react";

import "./App.css";

function Calculator() {
  const [courses, setCourses] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const courseCode = event.target.courseCode.value;
    const courseUnit = parseInt(event.target.courseUnit.value);
    const score = parseInt(event.target.score.value);
    const gradePoints = getGradePoints(score);
    const newCourse = { courseCode, courseUnit, score, gradePoints };
    setCourses([...courses, newCourse]);
    event.target.reset();
  };

  const handleDelete = (index) => {
    setCourses(courses.filter((course, i) => i !== index));
  };

  const getGradePoints = (score) => {
    if (score >= 70) {
      return 4;
    } else if (score >= 60) {
      return 3;
    } else if (score >= 50) {
      return 2;
    } else if (score >= 45) {
      return 1;
    } else {
      return 0;
    }
  };

  const getTotalUnits = () => {
    return courses.reduce((total, course) => total + course.courseUnit, 0);
  };

  const getTotalGradePoints = () => {
    return courses.reduce(
      (total, course) => total + course.gradePoints * course.courseUnit,
      0
    );
  };

  const getCGPA = () => {
    const totalUnits = getTotalUnits();
    const totalGradePoints = getTotalGradePoints();
    const cgpa = totalGradePoints / totalUnits;
    return cgpa.toFixed(2);
  };

  const saveGrade = () => {
    if (courses.length <= 0) {
      alert("No courses to save");
      return;
    }
    const data = { courses, cgpa: getCGPA(), unit: getTotalUnits() };
    localStorage.setItem("data", JSON.stringify(data));
    alert("CGPA Saved sucessfully");
    // console.log(courses);
  };
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    setCourses(data?.courses);
  }, []);

  return (
    <div className="calculator">
      <h1>CGPA Calculator</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="courseCode">Course Code</label>
        <input type="text" id="courseCode" required />

        <label htmlFor="courseUnit">Course Unit</label>
        <input type="number" id="courseUnit" min="1" max="6" required />

        <label htmlFor="score">Score</label>
        <input type="number" id="score" min="1" max="100" required />

        <button type="submit">Add Course</button>
      </form>
      {courses?.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Course Unit</th>
              <th>Score</th>
              <th>Grade Points</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {courses?.map((course, index) => (
              <tr key={index}>
                <td>{course.courseCode}</td>
                <td>{course.courseUnit}</td>
                <td>{course.score}</td>
                <td>{course.gradePoints}</td>
                <td>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={saveGrade} type="submit">
        Save CGPA
      </button>

      {courses?.length > 0 && (
        <div className="cgpa">
          <p>Total Units: {getTotalUnits()}</p>
          <p>CGPA: {getCGPA()}</p>
        </div>
      )}
    </div>
  );
}

export default Calculator;
