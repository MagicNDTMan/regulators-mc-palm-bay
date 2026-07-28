import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');

function ensureDataDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

function readJSON(filename) {
  ensureDataDir();
  const filepath = path.join(dataDir, filename);
  if (!fs.existsSync(filepath)) {
    return null;
  }
  try {
    const data = fs.readFileSync(filepath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return null;
  }
}

function writeJSON(filename, data) {
  ensureDataDir();
  const filepath = path.join(dataDir, filename);
  try {
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    return false;
  }
}

export function getUsers() {
  return readJSON('users.json') || [];
}

export function saveUsers(users) {
  return writeJSON('users.json', users);
}

export function getUserById(userId) {
  const users = getUsers();
  return users.find(u => u.id === userId);
}

export function getUserByEmail(email) {
  const users = getUsers();
  return users.find(u => u.email === email.toLowerCase());
}

export function getContent() {
  return readJSON('content.json') || {
    meetings: [],
    officers: [],
    directory: [],
    privateEvents: []
  };
}

export function saveContent(content) {
  return writeJSON('content.json', content);
}

export function initializeData() {
  const users = getUsers();
  if (users.length === 0) {
    // Create with empty state - Master Admin will be set up on first login
    saveUsers([]);
  }

  const content = getContent();
  if (Object.keys(content).length === 0) {
    saveContent({
      meetings: [],
      officers: [],
      directory: [],
      privateEvents: []
    });
  }
}
