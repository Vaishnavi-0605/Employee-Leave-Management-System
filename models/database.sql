CREATE DATABASE preleave;

CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    employee_code VARCHAR(10) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    department VARCHAR(50) NOT NULL,
    position VARCHAR(50) NOT NULL,
    attendance DECIMAL(5,2) DEFAULT 100,
    joining_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'Active',
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    gender VARCHAR(10),
    password VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE leave_requests (
    leave_id SERIAL PRIMARY KEY,
    employee_id INT NOT NULL REFERENCES employees(employee_id),
    leave_type VARCHAR(30) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_days INT NOT NULL,
    reason TEXT,
    status VARCHAR(20),
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);