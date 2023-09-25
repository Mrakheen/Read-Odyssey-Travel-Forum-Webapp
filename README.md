

## :airplane: Getting Started (without Docker)
Setting up <b>Ribbit</b> on your local machine without Docker? Here are the instructions:

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
```

3. Install Ribbit's dependencies

```sh
$ cd backend
$ pip install -r requirements.txt
```

4. Once the DB has been properly set up, run migrations

```sh
$ python manage.py makemigrations
$ python manage.py migrate
```

5. Finally, run the server

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
$ npm install
```

2. Run the server

```sh
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

## :recycle: Continuous Testing <img src="https://github.com/juliantjg/Ribbit/actions/workflows/django.yml/badge.svg">
I've set up Git Actions for this repository to run automated tests on pushes/PRs made on the `main`. 
<details>
 <summary><b>View build snapshot</b></summary>
 <br />
  
![image](https://user-images.githubusercontent.com/53683415/223595202-954dde63-ca1b-4f22-9e1a-442a52a9a78e.png#gh-dark-mode-only)

![image](https://user-images.githubusercontent.com/53683415/223594907-d7bdbe54-7475-443e-a7f6-48d8f2d48576.png#gh-light-mode-only)

</details>
  
## 🛠️ Built With <img src="https://user-images.githubusercontent.com/53683415/223294710-a2ba9d4c-c680-497a-9b71-101f2186fc49.png" width="30"> <img src="https://user-images.githubusercontent.com/53683415/223313723-71cdde37-3494-44e8-80cb-01edecb3311c.png" width="30"> <img src="https://user-images.githubusercontent.com/53683415/224955579-a1ed2e8c-3ab7-41e1-b129-f37466f77c05.png" width="30"> <img src="https://user-images.githubusercontent.com/53683415/223313774-2b46fc19-b811-483f-a53c-978070d5777e.png" width="30"> <img src="https://user-images.githubusercontent.com/53683415/223313813-78e199cc-9a22-4603-99d3-6b50e2bcec0f.png" width="30"> <img src="https://user-images.githubusercontent.com/53683415/223313847-3cf57f1a-11fd-4963-a1df-b3895e478119.png" width="30"> <img src="https://user-images.githubusercontent.com/53683415/224954200-33f50594-34e2-43b6-81e9-f3c0bb269f97.png" width="30">
- <img src="https://user-images.githubusercontent.com/53683415/223294710-a2ba9d4c-c680-497a-9b71-101f2186fc49.png" width="12"> <b><a href="https://reactjs.org/">React</a> -</b> React is a free and open-source front-end JavaScript library for building user interfaces based on components.
- <img src="https://user-images.githubusercontent.com/53683415/223313723-71cdde37-3494-44e8-80cb-01edecb3311c.png" width="12"> <b><a href="https://getbootstrap.com/">Bootstrap</a> -</b> Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development.
- <img src="https://user-images.githubusercontent.com/53683415/224955579-a1ed2e8c-3ab7-41e1-b129-f37466f77c05.png" width="12"> <b><a href="https://www.mysql.com/">MySQL</a> -</b> MySQL is an open-source relational database management system.
- <img src="https://user-images.githubusercontent.com/53683415/223313774-2b46fc19-b811-483f-a53c-978070d5777e.png" width="12"> <b><a href="https://www.digitalocean.com/">Digital Ocean</a> -</b> DigitalOcean Holdings, Inc. is an American multinational technology company and cloud service provider.
- <img src="https://user-images.githubusercontent.com/53683415/223313813-78e199cc-9a22-4603-99d3-6b50e2bcec0f.png" width="12"> <b><a href="https://www.djangoproject.com/">Django</a> -</b> Django is a free and open-source, Python-based web framework that follows the model–template–views architectural pattern.
- <img src="https://user-images.githubusercontent.com/53683415/223313847-3cf57f1a-11fd-4963-a1df-b3895e478119.png" width="12"> <b><a href="https://redux.js.org/">Redux</a> -</b> Redux is an open-source JavaScript library for managing and centralizing application state. It is most commonly used with libraries such as React or Angular for building user interfaces.
- <img src="https://user-images.githubusercontent.com/53683415/224954200-33f50594-34e2-43b6-81e9-f3c0bb269f97.png" width="12"> <b><a href="https://www.docker.com/">Docker</a> -</b> Docker is a set of platform as a service products that use OS-level virtualization to deliver software in packages called containers.


