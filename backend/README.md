## Table of Contents
- [Installation](#how-to-install-and-run-the-project)
- [API](#API)

## How to install and run the project?
### Running the project locally
1. Clone the repository

` git clone https://github.com/Ewa-Anna/React-Django-Task-Tracker `

2. Install dependencies

` pip install -r requirements.txt `

3. Change the directory

` cd backend `

4. Apply database migrations

` python manage.py makemigrations `
` python manage.py migrate `

5. Run the development server

` python manage.py runserver `

Project will run on http://127.0.0.1:8000/

### Creating .env file
You need to rename ` .env.template ` to ` .env ` and fill all variables.

## API
### Tasks
`GET // `
### User
