import React, { useState } from 'react';
import '../CSS/Result.css';

const Result = () => {
    const [studentDetails] = useState({
        name: 'Neha Singh',
        studentId: 'S002',
        program: 'B.Tech',
        semester: '4',
    });

    const [gradeDetails] = useState([
        { courseTitle: 'Course 1', courseCode: 'IT314', creditHours: '4', grade: 'AA', gradePoints: '40' },
        { courseTitle: 'Course 2', courseCode: 'EL403', creditHours: '3', grade: 'BB', gradePoints: '30' },
        { courseTitle: 'Course 3', courseCode: 'IT214', creditHours: '4', grade: 'AB', gradePoints: '40' },
        { courseTitle: 'Course 4', courseCode: 'SC224', creditHours: '3', grade: 'BC', gradePoints: '30' },
        { courseTitle: 'Course 5', courseCode: 'IT227', creditHours: '3', grade: 'BB', gradePoints: '30' },
        { courseTitle: 'Course 6', courseCode: 'IE402', creditHours: '3.5', grade: 'BB', gradePoints: '35' },
    ]);

    const [performanceSummary] = useState({
        creditsRegistered: '20.5',
        creditsEarned: '20.5',
        gradePointsEarned: '180',
        spi: '8.24',
        cumulativeCreditsRegistered: '40',
        cpi: '8.01',
    });

    return (
        <div id="card">
            <h2 id="h2">Student Report Card</h2>

            {/* Student Details Table */}
            <table id="details-table">
                <tbody>
                    <tr>
                        <td><strong>Name:</strong></td>
                        <td>{studentDetails.name}</td>
                        <td><strong>Student ID:</strong></td>
                        <td>{studentDetails.studentId}</td>
                    </tr>
                    <tr>
                        <td><strong>Program:</strong></td>
                        <td>{studentDetails.program}</td>
                        <td><strong>Semester:</strong></td>
                        <td>{studentDetails.semester}</td>
                    </tr>
                </tbody>
            </table>

            <h3 id="h3">Grade Details</h3>

            {/* Grade Details Table */}
            <table id="grade-table">
                <thead>
                    <tr>
                        <th>Course Title</th>
                        <th>Course Code</th>
                        <th>Credit Hours</th>
                        <th>Grade</th>
                        <th>Grade Points</th>
                    </tr>
                </thead>
                <tbody>
                    {gradeDetails.map((course, index) => (
                        <tr key={index}>
                            <td>{course.courseTitle}</td>
                            <td>{course.courseCode}</td>
                            <td>{course.creditHours}</td>
                            <td>{course.grade}</td>
                            <td>{course.gradePoints}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3 id="h3">Performance Summary</h3>

            {/* Performance Summary Table */}
            <table id="performance-table">
                <tbody>
                    <tr>
                        <td><strong>Credits Registered:</strong></td>
                        <td>{performanceSummary.creditsRegistered}</td>
                        <td><strong>Credits Earned:</strong></td>
                        <td>{performanceSummary.creditsEarned}</td>
                    </tr>
                    <tr>
                        <td><strong>Grade Points Earned:</strong></td>
                        <td>{performanceSummary.gradePointsEarned}</td>
                        <td><strong>SPI:</strong></td>
                        <td>{performanceSummary.spi}</td>
                    </tr>
                    <tr>
                        <td><strong>Cumulative Credits Registered:</strong></td>
                        <td>{performanceSummary.cumulativeCreditsRegistered}</td>
                        <td><strong>CPI:</strong></td>
                        <td>{performanceSummary.cpi}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Result;
