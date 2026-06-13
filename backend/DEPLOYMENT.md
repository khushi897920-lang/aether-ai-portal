# Aether AI Enterprise Portal - Production Deployment Guide

This document outlines the pipeline steps, cross-origin security considerations, and environment isolation guidelines to deploy the Aether AI Enterprise Portal from a local workspace into production cloud environments.

## 1. Hosting Architecture Overview

For maximum performance, scalability, and security, the application is split into front-to-back static and server instances:

```
[ Client Browser ]
        │
        ├── (Requests HTTPS Static Files) ──> [ Vercel / Netlify CDN ]
        │                                         (Frontend Client)
        │
        └── (HTTPS API Data Requests) ──────> [ Render / DigitalOcean / AWS ]
                                                  (Express Server + MongoDB Atlas)
```

---

## 2. Frontend Client Deployment (Vercel)

The React frontend utilizes Vite and Tailwind CSS v4. It builds into static HTML/JS/CSS assets which are ideally suited for Global Edge CDN distribution.

### Configuration Steps
1. Push your repository to a private Git hosting system (e.g., GitHub, GitLab).
2. Connect your repository to the **Vercel Dashboard**.
3. Choose the `frontend` subfolder as the Root Directory.
4. Set the **Framework Preset** to `Vite`.
5. Specify the Build Command and Output Directory:
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`
6. Add the production environmental override:
   * Set `VITE_API_URL` to your live Express backend URL (e.g., `https://api.aether.ai`).

---

## 3. Backend Engine Deployment (Render / DigitalOcean)

The Node.js server acts as our RESTful API gateway connecting securely to MongoDB Atlas.

### Configuration Steps (Render Example)
1. In the **Render Dashboard**, select **New Web Service**.
2. Connect your Git repository.
3. Configure the directory settings:
   * **Root Directory**: `backend`
   * **Environment**: `Node`
   * **Build Command**: `npm install`
   * **Start Command**: `npm start`
4. Choose the appropriate plan and click **Create Web Service**.

---

## 4. Absolute Credential Safety Protocols

> [!CAUTION]
> NEVER commit the `backend/.env` file or raw credential values to Git version control. Exposed API keys and connection strings can result in security breaches and cloud billing costs.

### Managing Secret Variables in Cloud Hosts
Instead of using physical files in production, you must declare all global environmental variables inside the host provider's native **Environment Variables** manager:

| Environment Variable | Production Setting Description |
| :--- | :--- |
| `PORT` | Set to `5000` or leave blank (most cloud hosts override this dynamically). |
| `NODE_ENV` | Set to `production` to suppress debug logs and enforce production security defaults. |
| `MONGO_URI` | The live MongoDB Atlas connection URL (e.g., `mongodb+srv://<username>:<password>@cluster.mongodb.net/...`). |
| `JWT_SECRET` | A high-entropy, cryptographically strong random string (e.g., 256-bit hash). |

---

## 5. Cross-Origin Resource Sharing (CORS) Protocols

To defend against cross-site script execution vulnerabilities, our backend is locked down to specific request origins.

### Transitioning to Production Domains
In development, the CORS middleware in `backend/server.js` is set to accept requests from localhost:
```javascript
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

In production, update this to read from an environment variable:
```javascript
const allowedOrigins = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
```

Configure `CLIENT_ORIGIN` inside your backend web service console to map exactly to your frontend domain URL (e.g., `https://portal.aether.ai`).
