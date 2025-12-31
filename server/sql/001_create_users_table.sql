CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    job_title VARCHAR(255),
    bio TEXT,
    linkedin_url VARCHAR(500),
    github_url VARCHAR(500),
    leetcode_url VARCHAR(500),
    interview_ready BOOLEAN NOT NULL DEFAULT FALSE,
    immediate_joiner BOOLEAN NOT NULL DEFAULT FALSE,
    open_to_work BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);

COMMENT ON TABLE users IS 'User accounts table for authentication and profile management';
COMMENT ON COLUMN users.email IS 'Unique email address for login';
COMMENT ON COLUMN users.password IS 'BCrypt encoded password';
COMMENT ON COLUMN users.name IS 'Full name of the user';
COMMENT ON COLUMN users.phone IS 'Contact phone number';
COMMENT ON COLUMN users.job_title IS 'Current job title or position';
COMMENT ON COLUMN users.bio IS 'User biography or description';
COMMENT ON COLUMN users.interview_ready IS 'Flag indicating if user is ready for interviews';
COMMENT ON COLUMN users.immediate_joiner IS 'Flag indicating if user can join immediately';
COMMENT ON COLUMN users.open_to_work IS 'Flag indicating if user is open to work opportunities';

