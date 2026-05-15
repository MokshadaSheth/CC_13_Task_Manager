// # CC_13_Task_Manager Deployment on AWS EC2 using Nginx + PM2

// ## Tech Stack

// * Frontend: React + Vite
// * Backend: Node.js + Express
// * Database: MongoDB Atlas
// * Server: AWS EC2 (Ubuntu)
// * Process Manager: PM2
// * Web Server: Nginx

// ---

// # 1. Launch EC2 Instance

// Create an Ubuntu EC2 instance and allow:

// * Port 22 (SSH)
// * Port 80 (HTTP)


// Connect to EC2:
// WINDOWS:
// ```powershell
// icacls taskMng.pem /inheritance:r
// ```

// Grant permission to current user:

// ```powershell
// icacls taskMng.pem /grant:r "$($env:USERNAME):(R)"
// ```


// Note for Linux Machine Use:
// ```powershell
// chmod 400 Deployment_key.pem
// ```
// ```bash
// ssh -i your-key.pem ubuntu@YOUR_PUBLIC_IP
// ```

// ---

// # 2. Clone Repository

// ```bash
// git clone https://github.com/MokshadaSheth/CC_13_Task_Manager
// ```

// ```bash
// cd CC_13_Task_Manager
// ```

// ---

// # 3. Install Node.js

// ```bash
// curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -

// sudo apt install -y nodejs
// ```

// Verify installation:

// ```bash
// node -v
// npm -v
// ```

// ---

// # 4. Install Nginx

// ```bash
// sudo apt update
// sudo apt install nginx -y
// ```

// Start nginx:

// ```bash
// sudo systemctl start nginx
// ```

// ---

// # 5. Install PM2

// ```bash
// sudo npm install -g pm2
// ```

// ---

// # 6. Backend Setup

// Move to backend folder:

// ```bash
// cd backend
// ```

// Install dependencies:

// ```bash
// npm install
// ```

// Create `.env` file:

// ```env
// MONGO_URI=your_mongodb_connection_string
// PORT=5000
// ```

// Start backend using PM2:

// ```bash
// pm2 start server.js --name backend
// ```

// Check logs:

// ```bash
// pm2 logs backend
// ```

// Verify backend:

// ```bash
// curl http://localhost:5000/tasks
// ```

// ---

// # 7. Frontend Setup

// Move to frontend folder:

// ```bash
// cd ../frontend
// ```

// Install dependencies:

// ```bash
// npm install
// ```

// Build frontend:

// ```bash
// npm run build
// ```

// ---

// # 8. Frontend API Configuration

// Inside `src/App.jsx`:

// ```js
// const API = '';
// ```

// API calls:

// ```js
// axios.get(`${API}/tasks`)
// ```

// This ensures frontend calls:

// ```text
// /tasks
// ```

// which matches backend routes.

// ---

// # 9. Nginx Configuration

// Create nginx config:

// ```bash
// sudo nano /etc/nginx/sites-available/taskmanager
// ```

// Add:

// ```nginx
// server {
//     listen 80;

//     server_name YOUR_PUBLIC_IP;

//     root /home/ubuntu/CC_13_Task_Manager/frontend/dist;
//     index index.html;

//     location / {
//         try_files $uri /index.html;
//     }

//     location /tasks {
//         proxy_pass http://localhost:5000;

//         proxy_http_version 1.1;

//         proxy_set_header Upgrade $http_upgrade;
//         proxy_set_header Connection 'upgrade';

//         proxy_set_header Host $host;
//     }
// }
// ```

// Enable config:

// ```bash
// sudo ln -s /etc/nginx/sites-available/taskmanager /etc/nginx/sites-enabled/
// ```

// Remove default config:

// ```bash
// sudo rm /etc/nginx/sites-enabled/default
// ```

// Test nginx:

// ```bash
// sudo nginx -t
// ```

// Restart nginx:

// ```bash
// sudo systemctl restart nginx
// ```

// ---

// # 10. Fix Permissions

// ```bash
// sudo chmod 755 /home/ubuntu

// sudo chmod -R 755 /home/ubuntu/CC_13_Task_Manager
// ```

// ---

// # 11. Restart Services

// Restart backend:

// ```bash
// pm2 restart all
// ```

// Restart nginx:

// ```bash
// sudo systemctl restart nginx
// ```

// ---

// # 12. Access Website

// Open:

// ```text
// http://YOUR_PUBLIC_IP
// ```

// ---

// # Useful Commands

// ## PM2 Logs

// ```bash
// pm2 logs
// ```

// ## PM2 Status

// ```bash
// pm2 status
// ```

// ## Restart Backend

// ```bash
// pm2 restart backend
// ```

// ## Restart Nginx

// ```bash
// sudo systemctl restart nginx
// ```

// ## Check Nginx Errors

// ```bash
// sudo tail -f /var/log/nginx/error.log
// ```

// ---
