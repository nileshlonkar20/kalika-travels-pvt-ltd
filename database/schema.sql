CREATE DATABASE IF NOT EXISTS kalika_db;
USE kalika_db;

CREATE TABLE IF NOT EXISTS callback_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  trip VARCHAR(255) DEFAULT NULL,
  travel_date DATE DEFAULT NULL,
  destination VARCHAR(255) DEFAULT NULL,
  passengers INT DEFAULT NULL,
  source VARCHAR(50) NOT NULL DEFAULT 'callback',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_callback_created_at (created_at)
);

CREATE TABLE IF NOT EXISTS messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  trip VARCHAR(255) DEFAULT NULL,
  travel_date DATE DEFAULT NULL,
  destination VARCHAR(255) DEFAULT NULL,
  passengers INT DEFAULT NULL,
  source VARCHAR(50) NOT NULL DEFAULT 'message',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_messages_created_at (created_at)
);

CREATE TABLE IF NOT EXISTS trip_enquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  vehicle VARCHAR(255) DEFAULT NULL,
  from_location VARCHAR(255) NOT NULL,
  to_location VARCHAR(255) NOT NULL,
  travel_date DATE DEFAULT NULL,
  passengers INT DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_trip_enquiries_created_at (created_at)
);
