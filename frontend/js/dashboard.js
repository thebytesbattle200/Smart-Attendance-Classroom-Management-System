// Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    // Sample attendance data
    const attendanceData = [
        { date: '2023-11-15', subject: 'Web Development', status: 'present', time: '10:02 AM' },
        { date: '2023-11-14', subject: 'Database Systems', status: 'present', time: '09:58 AM' },
        { date: '2023-11-13', subject: 'Software Engineering', status: 'absent', time: '-' },
        { date: '2023-11-10', subject: 'Data Structures', status: 'present', time: '11:05 AM' },
        { date: '2023-11-09', subject: 'Computer Networks', status: 'present', time: '02:15 PM' },
        { date: '2023-11-08', subject: 'Web Development', status: 'present', time: '10:01 AM' },
        { date: '2023-11-07', subject: 'Database Systems', status: 'absent', time: '-' },
        { date: '2023-11-06', subject: 'Software Engineering', status: 'present', time: '09:55 AM' }
    ];

    // Sample subject progress data
    const subjectProgress = [
        { name: 'Web Development', percentage: 92 },
        { name: 'Database Systems', percentage: 88 },
        { name: 'Software Engineering', percentage: 79 },
        { name: 'Data Structures', percentage: 95 },
        { name: 'Computer Networks', percentage: 81 }
    ];

    // Populate attendance table
    const tableBody = document.getElementById('attendanceTableBody');
    if (tableBody) {
        attendanceData.forEach(record => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${utils.formatDate(record.date)}</td>
                <td>${record.subject}</td>
                <td><span class="attendance-status ${record.status}">${record.status === 'present' ? 'Present' : 'Absent'}</span></td>
                <td>${record.time}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Populate subject progress
    const subjectProgressContainer = document.getElementById('subjectProgress');
    if (subjectProgressContainer) {
        subjectProgress.forEach(subject => {
            const progressElement = document.createElement('div');
            progressElement.className = 'subject-progress';
            progressElement.innerHTML = `
                <div class="d-flex justify-content-between">
                    <span>${subject.name}</span>
                    <span>${subject.percentage}%</span>
                </div>
                <div class="progress mt-1">
                    <div class="progress-bar" role="progressbar" style="width: ${subject.percentage}%"></div>
                </div>
            `;
            subjectProgressContainer.appendChild(progressElement);
        });
    }
});