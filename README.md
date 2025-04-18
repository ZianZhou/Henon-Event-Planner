# Henon-Event-Planner

A modern event planning application featuring a list view, timeline view, drag-and-drop functionality, and advanced filtering capabilities for efficient event management.

[![Event Planner Demo](https://img.youtube.com/vi/7mptbMhFqk4/0.jpg)](https://youtu.be/7mptbMhFqk4)

## Prerequisites

- Node.js (v16 or higher)
- Python (3.8 or higher)
- pip (Python package manager)

## Installation & Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/Henon-Event-Planner.git
   cd Henon-Event-Planner
   ```

2. Backend Setup:

   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   python app.py  # runs on port 5000
   ```

3. Frontend Setup:

   ```bash
   cd ../frontend
   npm install
   npm run dev  # runs on port 3000
   ```

   Note: The frontend is configured with Tailwind CSS and PostCSS for styling.

## Database Initialization

The SQLite database file is automatically created on first run of the backend server. No additional setup is required.

## API Configuration

- Default Axios baseURL: `http://localhost:5000`
- Available endpoints:
  - `GET /events` - Retrieve all events
  - `POST /events` - Create a new event
  - `PUT /events/:id` - Update an existing event
  - `DELETE /events/:id` - Delete an event
  - `PUT /events/reorder` - Reorder events

## Usage

- Create Events: Click the "Add Event" button and fill in the event details
- Edit Events: Click on any event to modify its details
- Delete Events: Use the delete button on the event card
- Reorder Events: Drag and drop events in the list view
- Filter Events: Use the filter options to view specific event categories or date ranges

## Troubleshooting

Common issues and solutions:

- CORS Errors: Ensure the backend server is running on port 5000 and the frontend on port 3000
- Port Conflicts: If ports 3000 or 5000 are in use, modify the respective configuration files
- Database Issues: Delete the SQLite file and restart the backend server to recreate the database
- Installation Errors: Ensure all prerequisites are installed and up to date
