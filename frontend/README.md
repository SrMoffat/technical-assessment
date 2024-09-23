## Reconcili8
A platform to reconcile financial records.

## Technologies

### Backend
- Python
- Django REST Framework

### Fronted
- Typescript
- Next.js

### Setup Backend
1. Clone this repo
```bash
git clone
```
2. Change directory
```bash
cd technical-assignment
```
3. Start the backend
```bash
cd backend/
```
4. Run migrations and setup admin user
```bash
rm -f db.sqlite3
rm -r api/migrations

python manage.py makemigrations api
python manage.py migrate

python manage.py createsuperuser --username admin1 --email admin1@example.com
[Set a password and remember it]
```
5. Start backend server
```bash
pip install -r requirements.txt

python manage.py runserver
```

### Setup Frontend
1. Start the frontend
```bash
cd frontend/
```
2. Install dependencies
```bash
yarn
```
3. Start the app
```bash
yarn dev
```
