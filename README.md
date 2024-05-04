# Django-Task-Tracker
This repository contains a backend for task management system built with Django Rest Framework.

The frontend is available [here](https://github.com/HurasAdam/React-Django-Task-Tracker).

## Table of Contents
- [Overview](#overview)
- [Installation](#installation)
- [Tests](#tests)
- [Docker](#docker-compose)
- [Features](#features)
- [Tools](#technologies-and-frameworks)
- [License](#license)


## Overview
The application allows users to create, edit, and organize tasks effectively. The frontend, developed with React, provides an intuitive user interface for task management, while the backend, powered by Django and Django Rest Framework, manages task data, user authentication, and more. The project leverages the power of React for dynamic and responsive interactions, coupled with the robustness of Django for secure backend operations.


## Installation
### Running project locally
Please refer to [backend README.md](backend/README.md)

### docker-compose
Building Docker Image
<br>
` docker-compose build `
<br>
Running Docker Container
<br>
` docker-compose up -d `


## Tests
Backend

` pytest backend/ --import-mode=importlib `

## Features


## Technologies and frameworks

- Backend
    
    [![Python](https://skillicons.dev/icons?i=python)](https://skillicons.dev) 
    [![Django](https://skillicons.dev/icons?i=django)](https://skillicons.dev)
    - Django Rest Framework
    - drf-yasg
    - django-channels

- Databases
    - For Dev

        [![SQLite](https://skillicons.dev/icons?i=sqlite)](https://skillicons.dev)
    - For Prod
    
        [![PostgreSQL](https://skillicons.dev/icons?i=postgres)](https://skillicons.dev)

- Other

    [![VisualStudio](https://skillicons.dev/icons?i=vscode)](https://skillicons.dev)
    [![Docker](https://skillicons.dev/icons?i=docker)](https://skillicons.dev)
    [![Postman](https://skillicons.dev/icons?i=postman)](https://skillicons.dev)


## License
Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
