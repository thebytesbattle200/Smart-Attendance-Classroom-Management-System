// QR Scanner functionality
document.addEventListener('DOMContentLoaded', function() {
    // Set current date
    const currentDateElement = document.getElementById('currentDate');
    if (currentDateElement) {
        currentDateElement.textContent = utils.formatDate(new Date());
    }
    
    // Countdown timer for QR code
    let timeLeft = 15 * 60; // 15 minutes in seconds
    const countdownElement = document.getElementById('countdown');
    
    function updateCountdown() {
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            countdownElement.textContent = "Expired";
            document.querySelector('.attendance-status').className = "attendance-status absent";
            document.querySelector('.attendance-status').textContent = "Expired";
            return;
        }
        
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        countdownElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        timeLeft--;
    }
    
    const countdownInterval = setInterval(updateCountdown, 1000);
    
    // Mark attendance button
    const markAttendanceBtn = document.getElementById('markAttendanceBtn');
    if (markAttendanceBtn) {
        markAttendanceBtn.addEventListener('click', function() {
            if (timeLeft <= 0) {
                utils.showNotification('QR code has expired. Please ask your instructor for a new one.', 'warning');
                return;
            }
            
            // Simulate API call to mark attendance
            utils.showNotification('Attendance marked successfully!', 'success');
            
            // Add to recent attendance
            const recentAttendance = document.getElementById('recentAttendance');
            const attendanceTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            
            recentAttendance.innerHTML = `
                <div class="d-flex justify-content-between align-items-center p-2 border-bottom">
                    <div>
                        <strong>Web Development</strong>
                        <div class="text-muted small">${utils.formatDate(new Date())} • ${attendanceTime}</div>
                    </div>
                    <span class="attendance-status present">Present</span>
                </div>
            ` + recentAttendance.innerHTML;
        });
    }
});