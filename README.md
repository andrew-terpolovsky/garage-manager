# Garage (Garage Manager)

**Preamble:**
A Django rest framework app to manage garages.
One garage can have one or more cars in it. Each car has color, manufacturer, model and production year attributes.
Admin user can add or remove a car to a garage. Only superuser can add or remove a car itself.
Frontend must be built with angular or reactjs/vuejs. And allow admins/superuser’s to add/modify/remove cars. If user tries to remove a car which is older than 35 years, frontend must show a confirmation.



# Local backend deployment
1. From project root go to backend folder `cd backend`.
1. Install Python 3.6 (https://www.python.org/).
2. Install virtualenv
```
    python3 -m venv .venv
    source .venv/bin/activate
```
3. Install dependencies 
```
pip install -r ./backend/requirements.txt
```
3. Run migrations `python3 ./backend/manage.py migrate`
4. Run server `python3 ./backend/manage.py runserver`
4. Run fixtures `python3 ./backend/manage.py loaddata user.json`


**NOTE**: 
Some of points from task wasn't much clear like is
 admin user can edit car info or not except moving car to and from garage. SO i made following permissions:
 Superuser can do anything with car and garage entries. 
 Admin can only edit car and garage entries.
