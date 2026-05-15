# Task Manager Application

## Cloud Computing Practical Mini Project

## Tech Stack Used

* Frontend: React.js + Vite
* Backend: Node.js + Express.js
* Database: MongoDB Atlas
* Deployment Server: AWS EC2 Ubuntu Instance
* Reverse Proxy Server: Nginx
* Process Manager: PM2

---

# Project Overview

This project is a full-stack Task Manager application developed using the MERN stack and deployed on AWS EC2 using Nginx and PM2.

The application supports:

* Add Task
* View Tasks
* Delete Tasks
* Mark Tasks as Completed

---

# System Architecture

```text
User Browser
      ↓
Nginx Server
      ↓
React Frontend
      ↓
Express Backend APIs
      ↓
MongoDB Atlas Database
```

---

# Folder Structure

```text
Task_Manager/
│
├── backend/
│
└── frontend/
```

---

# 1. MongoDB Atlas Setup

## Step 1: Create MongoDB Atlas Account

* Open MongoDB Atlas website
* Create account and login

---

## Step 2: Create Cluster

* Select FREE shared cluster
* Choose nearest region
* Create cluster

---

## Step 3: Create Database User

* Open Database Access
* Create username and password

---

## Step 4: Allow Network Access

* Open Network Access
* Add:

```text
0.0.0.0/0
```

This allows EC2 instance to connect.

---

## Step 5: Copy Connection String

Get MongoDB Atlas URI from:

* Connect
* Drivers

Store it in backend `.env` file.

---

# 2. Backend Setup

## Step 1: Create Backend Folder

```bash
mkdir backend
cd backend
```

---

## Step 2: Initialize Node Project

```bash
npm init -y
```

---

## Step 3: Install Dependencies

```bash
npm install express mongoose cors dotenv
```

Install nodemon:

```bash
npm install --save-dev nodemon
```

---

## Step 4: Update package.json Scripts

Add:

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

---

## Step 5: Create .env File

Inside backend folder:

```env
MONGO_URI=your_mongodb_atlas_connection_string
```

---

## Step 6: Run Backend

```bash
npm run dev
```

Expected:

```text
MongoDB Connected
Server running on port 5000
```

---

# 3. Frontend Setup

## Step 1: Create React Application

Go to project root:

```bash
cd ..
```

Create Vite app:

```bash
npm create vite@latest frontend -- --template react
```

---

## Step 2: Install Dependencies

```bash
cd frontend
npm install
npm install axios
```

---

## Step 3: Run Frontend

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# 4. AWS EC2 Setup

## Step 1: Launch EC2 Instance

Configuration:

* Ubuntu
* t2.micro
* Allow HTTP
* Allow HTTPS
* Allow SSH

---

## Step 2: Connect EC2 Using SSH

On Windows PowerShell:

```powershell
ssh -i taskMng.pem ubuntu@YOUR_PUBLIC_IP
```

---

# 5. Fix PEM File Permission Issue on Windows

Run PowerShell as Administrator.

Go to PEM location:

```powershell
cd "D:\Desktop\Sem6\Practicals\CC\Mini"
```

Remove inherited permissions:

```powershell
icacls taskMng.pem /inheritance:r
```

Grant permission to current user:

```powershell
icacls taskMng.pem /grant:r "$($env:USERNAME):(R)"
```

Note for Linux Machine Use:
```powershell
chmod 400 Deployment_key.pem
```

Remove unnecessary users:

```powershell
icacls taskMng.pem /remove "Authenticated Users"
icacls taskMng.pem /remove "Users"
icacls taskMng.pem /remove "Everyone"
```

Reconnect:

```powershell
ssh -i taskMng.pem ubuntu@YOUR_PUBLIC_IP
```

---

# 6. Install Node.js on EC2

## Remove Old Node.js

```bash
sudo apt remove nodejs -y
```

---

## Install Latest Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
```

---

## Verify Installation

```bash
node -v
npm -v
```

---

# 7. Install Nginx

```bash
sudo apt update
sudo apt install nginx -y
```

Start Nginx:

```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

---

# 8. Install PM2

```bash
sudo npm install -g pm2
```

---

# 9. Upload Project to EC2

Clone repository:

```bash
git clone YOUR_GITHUB_REPOSITORY
```

---

# 10. Backend Deployment

Go to backend:

```bash
cd ~/PROJECT_NAME/backend
```

---

## Reinstall Dependencies

After Node.js upgrade:

```bash
rm -rf node_modules package-lock.json
npm install
```

---

## Start Backend Using PM2

```bash
pm2 start server.js --name backend
```

---

## Check Logs

```bash
pm2 logs backend
```

Expected:

```text
MongoDB Connected
Server running on port 5000
```

---

# 11. Verify Backend

Run:

```bash
curl http://localhost:5000/tasks
```

Expected JSON response.

---

# 12. Frontend Deployment

Go to frontend:

```bash
cd ~/PROJECT_NAME/frontend
```

---

## Install Packages

```bash
npm install
```

---

## Build React App

```bash
npm run build
```

Expected:

* dist folder created

---

# 13. Fix CSS Build Errors

If Vite build fails with:

```text
Invalid empty selector
```

Check CSS files for extra `}` brackets.

Common files:

* App.css
* index.css

---

# 14. Copy Frontend Build to Nginx Directory

Create directory:

```bash
sudo mkdir -p /var/www/taskmanager
```

Copy frontend build:

```bash
sudo cp -r dist/* /var/www/taskmanager/
```

Give permissions:

```bash
sudo chmod -R 755 /var/www/taskmanager
```

---

# 15. Configure Nginx

Open config:

```bash
sudo nano /etc/nginx/sites-available/taskmanager
```

---

## Enable Configuration

```bash
sudo ln -sf /etc/nginx/sites-available/taskmanager /etc/nginx/sites-enabled/
```

Remove default:

```bash
sudo rm /etc/nginx/sites-enabled/default
```

---

## Test Nginx

```bash
sudo nginx -t
```

---

## Restart Nginx

```bash
sudo systemctl restart nginx
```

---

# 16. Open Security Group Ports

Allow inbound ports:

| Type  | Port |
| ----- | ---- |
| SSH   | 22   |
| HTTP  | 80   |
| HTTPS | 443  |

Optional:
| Custom TCP | 5000 |

---

# 17. Access Website

Open browser:

```text
http://YOUR_PUBLIC_IP
```

---

# 18. Useful PM2 Commands

## View Running Processes

```bash
pm2 list
```

---

## Restart Backend

```bash
pm2 restart backend
```

---

## View Logs

```bash
pm2 logs backend
```

---

## Save PM2 Processes

```bash
pm2 save
```

---

# 19. Common Errors and Solutions

## MongoDB Buffering Timeout

Cause:

* MongoDB Atlas not accessible

Solution:

* Add:

```text
0.0.0.0/0
```

in Network Access.

---

## PEM Permission Denied

Cause:

* Windows permission issue

Solution:

* Fix using `icacls` commands.

---

## Vite Build Failure

Cause:

* Old Node.js version

Solution:

* Upgrade to Node.js 22.

---

## CSS Invalid Empty Selector

Cause:

* Extra closing bracket `}`

Solution:

* Remove extra bracket from CSS file.

---

## 500 Internal Server Error

Cause:

* Nginx unable to access frontend build

Solution:

* Move React build to `/var/www/taskmanager`

---

# 20. Final Deployment Flow

```text
Frontend React App
        ↓
Nginx Reverse Proxy
        ↓
Express Backend API
        ↓
MongoDB Atlas Database
```

---

# 21. Technologies Used

* React.js
* Vite
* Node.js
* Express.js
* MongoDB Atlas
* AWS EC2
* Nginx
* PM2

---

# 22. Conclusion

Successfully developed and deployed a full-stack Task Manager application using the MERN stack on AWS EC2 with Nginx reverse proxy and MongoDB Atlas cloud database.
