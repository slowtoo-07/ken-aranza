# Website Portfolio – John Kenneth M. Aranza

React (Vite) frontend + C# ASP.NET Core backend. Needs Node 18+ and the .NET 8 SDK.

1. Terminal 1: `cd backend` then `dotnet run` (API on http://localhost:5080)
2. Terminal 2: `cd frontend` then `npm install` then `npm run dev`
3. Open http://localhost:5173

To customize:
- Put the photo at `frontend/public/ken.jpg` and the resume at `frontend/public/resume.pdf`.
- All text lives in `backend/Program.cs`. Check the email address against the resume.
- Contact form messages are written to the backend console. Connect email or a database in the `/api/contact` handler.
