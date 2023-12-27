# :airplane: Getting Started

Setting up <b>Read Odyssey</b> on your local machine? Here are the instructions:

<details>
 <summary><b>Setting up the back-end</b></summary>
 <br />
 
1. First clone the repository

```sh
$ git clone https://github.com/Mrakheen/travel-website-project-CSE-3311.git
```

2. Setting up python virtual environment and activating it

```sh
$ python -m venv myenv
$ myenv\Scripts\activate
or
$ source myenv/bin/activate
```

3. Install Redyssey's dependencies

```sh
$ cd backend
$ pip install -r requirements.txt
```

4. Create db file if not exist

```sh
==============================================================================================
if db.sqlite3 does not exist create the file with name "db.sqlite3" in the backend.
The current db file could be corrupted causing migrations in the next step to fail.
==============================================================================================
```

5. Once the DB has been properly set up, run migrations

```sh
$ python manage.py makemigrations
$ python manage.py migrate
```

6. Finally, run the server

```sh
$ python manage.py runserver

=======================================================
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).
March 08, 2023 - 00:40:33
Django version 4.1.3, using settings 'backend.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
=======================================================
```

</details>

<details>
 <summary><b>Setting up the front-end</b></summary>
 <br />
 
1. Install dependencies

```sh
$ cd frontend
$ npm cache clean --force
$ npm install -g react-scripts
$ npm install
```

2. Run the server

```sh
$ npm install react-hook-form
$ npm start

=======================================================
Compiled successfully!

You can now view frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.0.88:3000
=======================================================
```

**That's it!**

</details>

<details>
 <summary><b>Running tests</b></summary>
 <br />

1. To run API tests, simply do the following

```sh
$ cd backend
$ python manage.py test
```
</details> 

# 🛠️ Built With 
- <img src="https://user-images.githubusercontent.com/53683415/223294710-a2ba9d4c-c680-497a-9b71-101f2186fc49.png" width="12"> <b><a href="https://reactjs.org/">React</a> -</b> React is a free and open-source front-end JavaScript library for building user interfaces based on components.
- <img src="https://user-images.githubusercontent.com/53683415/223313723-71cdde37-3494-44e8-80cb-01edecb3311c.png" width="12"> <b><a href="https://getbootstrap.com/">Bootstrap</a> -</b> Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development.
- <img src="https://user-images.githubusercontent.com/53683415/223313813-78e199cc-9a22-4603-99d3-6b50e2bcec0f.png" width="12"> <b><a href="https://www.djangoproject.com/">Django</a> -</b> Django is a free and open-source, Python-based web framework that follows the model–template–views architectural pattern.
- <img src="https://user-images.githubusercontent.com/53683415/223313847-3cf57f1a-11fd-4963-a1df-b3895e478119.png" width="12"> <b><a href="https://redux.js.org/">Redux</a> -</b> Redux is an open-source JavaScript library for managing and centralizing application state. It is most commonly used with libraries such as React or Angular for building user interfaces.


# Video Demos

https://github.com/Mrakheen/Read-Odyssey-Travel-Forum-Webapp/assets/53326887/5b2dd11d-ec6f-41b0-8e9d-4c56ab7ff5bd


https://github.com/Mrakheen/Read-Odyssey-Travel-Forum-Webapp/assets/53326887/d1de442f-f77d-493f-8586-d1af90aeeeb7


https://github.com/Mrakheen/Read-Odyssey-Travel-Forum-Webapp/assets/53326887/5e7c9e3f-f1fe-4de9-b6e4-294cc5cc0d00


https://github.com/Mrakheen/Read-Odyssey-Travel-Forum-Webapp/assets/53326887/ab86d3a9-76df-4838-b5f7-91a00da7b646


https://github.com/Mrakheen/Read-Odyssey-Travel-Forum-Webapp/assets/53326887/da5e6b8c-abdf-4a6b-ac5a-80c593406d43

# Aknowledgements 
<details>
<summary><b>Contributors</b></summary>

1. Mubtasim Ahmed Rakheen
 
2. Hanumath Ponnaluri
   
3. Phu Duc Nguyen
   
4. Freddy Rodriguez
</details>

Thanks to <b>Julian Tjiong</b> for his open-source Github project Ribbit <b>[Github Link: https://github.com/juliantjg/Ribbit]</b>. The project has been built on top of the existing project. 

