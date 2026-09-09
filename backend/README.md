# DR Screening — Backend (Node/Express boilerplate)

A plain Express REST API matching the frontend's data shapes. Data currently
lives in memory (see `src/models/`) so the whole thing runs with zero setup —
swap the models for real database calls later without touching controllers
or routes.

## Run it

```bash
npm install
cp .env.example .env
npm run dev        # nodemon, auto-restarts on file changes
# or
npm start
```

Server runs on `http://localhost:5000` by default (see `.env`).

## Folder structure

```
src/
  config/
    env.js          loads .env, exposes port/CORS/MATLAB config
    db.js           placeholder DB connection (not wired up - in-memory for now)
  controllers/
    patientController.js      list/get/create patients
    analysisController.js     get stored result, upload image -> run pipeline
    specialistController.js   list specialists, mock "send referral"
  middlewares/
    upload.js        multer config for fundus image uploads
    notFound.js       404 handler
    errorHandler.js   central error handler
  models/
    Patient.js         in-memory patient store + seed data
    AnalysisResult.js  in-memory analysis results, keyed by patient id
    Specialist.js       in-memory referral network list
  routes/
    index.js               mounts everything under /api
    patientRoutes.js
    analysisRoutes.js
    specialistRoutes.js
  utils/
    asyncHandler.js         wraps async route handlers
    gradeLabels.js          grade number -> label text (0-4)
    runMatlabPipeline.js    Node equivalent of the Flask app's MATLAB subprocess call
  uploads/            uploaded images + MATLAB-generated result.json/gradcam.png land here
  app.js              express app (middleware, routes, error handling)
  index.js            entry point - starts the server
```

## API

All routes except `/api/health` and `/api/auth/login` require a valid
`Authorization: Bearer <token>` header (obtained from `/api/auth/login`).

| Method | Path                              | Auth?  | Description                                  |
|--------|-----------------------------------|--------|-----------------------------------------------|
| GET    | `/api/health`                     | No     | health check                                  |
| POST   | `/api/auth/login`                 | No     | `{ clinicianId, password }` -> `{ token, user }` |
| GET    | `/api/auth/me`                    | Yes    | returns the current user from the token       |
| GET    | `/api/patients?search=&grade=`    | Yes    | list patients, optional search/grade filter   |
| GET    | `/api/patients/:id`                | Yes    | get one patient                               |
| POST   | `/api/patients`                    | Yes    | create patient `{ name, age, gender, village }` |
| GET    | `/api/analysis/:patientId`         | Yes    | get stored analysis result for a patient      |
| POST   | `/api/analysis/:patientId/upload`  | Yes    | multipart upload (`image` field) -> runs pipeline |
| GET    | `/api/specialists`                  | Yes    | list referral network                         |
| POST   | `/api/specialists/:id/send`         | Yes    | mock "send report" `{ patientId }`            |

### Demo login

There's one seeded clinician account (see `src/models/User.js`), meant purely
as a starting point:

```
Clinician ID: PHC-RAMPUR-102
Password:     password123
```

Replace `src/models/User.js` with a real user table (and add a registration
endpoint) whenever you're ready to move past the demo account. Tokens are
signed JWTs (see `JWT_SECRET` / `JWT_EXPIRES_IN` in `.env`) and expire after
8 hours by default.

## MATLAB pipeline integration

`src/utils/runMatlabPipeline.js` is the Node equivalent of the `subprocess`
call in the original Flask `webapp/app.py`. It shells out to MATLAB the same
way (`-batch` mode, adding the same subfolders to the path, calling
`runPipelineForWeb(imagePath, jobDir)`), reads back `result.json`, and
returns it.

**Until `MATLAB_EXE` and `MATLAB_PROJECT_ROOT` are set in `.env`, uploads
return a mock result** so the rest of the app (frontend included) keeps
working end-to-end without requiring a MATLAB install. Once MATLAB is set up
and those env vars point at the right paths, real results flow through
automatically — no other code changes needed.

## Notes for whoever builds on this

- Swap `src/models/*.js` for real Mongoose/Prisma/Sequelize models later —
  keep the same exported function names (`getAll`, `getById`, `create`, etc.)
  so controllers don't need to change.
- `src/config/db.js` has a commented mongoose example to get started.
- CORS is currently locked to `CLIENT_ORIGIN` in `.env` (defaults to the Vite
  dev server at `http://localhost:5173`).
