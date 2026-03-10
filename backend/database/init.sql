DROP DATABASE IF EXISTS ai_advisor;
CREATE DATABASE ai_advisor;
USE ai_advisor;

-- 1. ROLES
CREATE TABLE roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO roles(role_name)
VALUES ('Student'), ('Advisor'), ('Faculty');

-- 2. USERS
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    role_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(role_id) REFERENCES roles(role_id)
        ON DELETE SET NULL
);

-- 3. FACULTIES
CREATE TABLE faculties (
    faculty_id INT AUTO_INCREMENT PRIMARY KEY,
    faculty_name VARCHAR(100) UNIQUE NOT NULL
);

-- 4. CLASSES
CREATE TABLE classes (
    class_id INT AUTO_INCREMENT PRIMARY KEY,
    class_name VARCHAR(50) UNIQUE,
    advisor_id INT,

    FOREIGN KEY(advisor_id) REFERENCES users(user_id)
        ON DELETE SET NULL
);

-- 5. STUDENTS
CREATE TABLE students (
    student_id INT PRIMARY KEY,
    student_code VARCHAR(20) UNIQUE,
    class_id INT,
    faculty_id INT,
    advisor_id INT,

    FOREIGN KEY(student_id) REFERENCES users(user_id)
        ON DELETE CASCADE,

    FOREIGN KEY(class_id) REFERENCES classes(class_id)
        ON DELETE SET NULL,

    FOREIGN KEY(faculty_id) REFERENCES faculties(faculty_id)
        ON DELETE SET NULL,

    FOREIGN KEY(advisor_id) REFERENCES users(user_id)
        ON DELETE SET NULL
);

-- 6. DATASET 1: ACADEMIC RECORDS
CREATE TABLE academic_records (
    record_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    semester VARCHAR(20),

    gpa_prev_sem DECIMAL(3,2),
    gpa_current DECIMAL(3,2),
    num_failed INT,
    attendance_rate DECIMAL(5,2),
    study_hours INT,

    motivation_score INT,
    stress_score INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(student_id) REFERENCES students(student_id)
        ON DELETE CASCADE,

    UNIQUE(student_id, semester)
);

-- 7. AI MODULE 1: RISK PREDICTIONS
CREATE TABLE risk_predictions (
    prediction_id INT AUTO_INCREMENT PRIMARY KEY,
    record_id INT,
    student_id INT,

    risk_score DECIMAL(5,2),
    risk_label VARCHAR(20),

    model_version VARCHAR(50),
    predicted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(record_id) REFERENCES academic_records(record_id)
        ON DELETE CASCADE,

    FOREIGN KEY(student_id) REFERENCES students(student_id)
        ON DELETE CASCADE
);

-- 8. DATASET 2: FEEDBACKS
CREATE TABLE feedbacks (
    feedback_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,

    feedback_text TEXT,
    topic VARCHAR(100),
    satisfaction_rating INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(student_id) REFERENCES students(student_id)
        ON DELETE CASCADE
);

-- 9. AI MODULE 2: SENTIMENT RESULTS
CREATE TABLE sentiment_results (
    sentiment_id INT AUTO_INCREMENT PRIMARY KEY,
    feedback_id INT,

    sentiment_label VARCHAR(20),
    sentiment_score DECIMAL(5,2),

    stress_warning BOOLEAN,
    toxic_keyword_detected BOOLEAN,

    analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(feedback_id) REFERENCES feedbacks(feedback_id)
        ON DELETE CASCADE
);

-- 10. DATASET 3: MEETINGS
CREATE TABLE meetings (
    meeting_id INT AUTO_INCREMENT PRIMARY KEY,
    advisor_id INT,
    meeting_date DATE,
    meeting_notes LONGTEXT,

    FOREIGN KEY(advisor_id) REFERENCES users(user_id)
        ON DELETE SET NULL
);

-- MEETING PARTICIPANTS
CREATE TABLE meeting_participants (
    meeting_id INT,
    student_id INT,

    PRIMARY KEY (meeting_id, student_id),

    FOREIGN KEY (meeting_id) REFERENCES meetings(meeting_id)
        ON DELETE CASCADE,

    FOREIGN KEY (student_id) REFERENCES students(student_id)
        ON DELETE CASCADE
);

-- 11. AI MODULE 3: MEETING SUMMARIES
CREATE TABLE meeting_summaries (
    summary_id INT AUTO_INCREMENT PRIMARY KEY,
    meeting_id INT,

    summary_text TEXT,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(meeting_id) REFERENCES meetings(meeting_id)
        ON DELETE CASCADE
);

-- 12. DATASET 4: BEHAVIORAL LOGS
CREATE TABLE behavioral_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    week_number INT,

    attendance_percent DECIMAL(5,2),
    assignments_missing INT,
    sentiment_index DECIMAL(5,2),
    stress_index INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(student_id) REFERENCES students(student_id)
        ON DELETE CASCADE
);

-- 13. AI MODULE 4: ACADEMIC ANOMALIES
CREATE TABLE academic_anomalies (
    anomaly_id INT AUTO_INCREMENT PRIMARY KEY,
    log_id INT,
    student_id INT,

    anomaly_score DECIMAL(5,2),
    description TEXT,
    detected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(log_id) REFERENCES behavioral_logs(log_id)
        ON DELETE CASCADE,

    FOREIGN KEY(student_id) REFERENCES students(student_id)
        ON DELETE CASCADE
);

-- 14. AI MODULE 5: CHATBOT HISTORY
CREATE TABLE chatbot_history (
    chat_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,

    query_text TEXT,
    ai_response TEXT,
    intent_category VARCHAR(50),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(user_id) REFERENCES users(user_id)
        ON DELETE CASCADE
);

-- 15. NOTIFICATIONS
CREATE TABLE notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    receiver_id INT,
    sender_id INT,

    title VARCHAR(255),
    message TEXT,
    type VARCHAR(50),

    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(receiver_id) REFERENCES users(user_id)
        ON DELETE CASCADE,

    FOREIGN KEY(sender_id) REFERENCES users(user_id)
        ON DELETE SET NULL
);

-- 16. SYSTEM LOGS
CREATE TABLE system_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(user_id) REFERENCES users(user_id)
        ON DELETE SET NULL
);

-- INDEXES
CREATE INDEX idx_student_semester
ON academic_records(student_id, semester);

CREATE INDEX idx_risk_student
ON risk_predictions(student_id);

CREATE INDEX idx_feedback_student
ON feedbacks(student_id);

CREATE INDEX idx_behavior_student
ON behavioral_logs(student_id);

CREATE INDEX idx_meeting_advisor
ON meetings(advisor_id);

-- SAMPLE DATA
INSERT INTO users (username, password_hash, full_name, email, role_id)
VALUES
  ('student', '$2b$10$123456', 'Student User', 'student@example.com', 1),
  ('advisor', '$2b$10$123456', 'Advisor User', 'advisor@example.com', 2),
  ('faculty', '$2b$10$123456', 'Faculty User', 'faculty@example.com', 3);