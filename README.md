# elourve - Art Beyond Walls
#### A digital art gallery

---

## How to run:
First, make sure you have Docker and docker-compose installed.

### Production:

#### 1. Create backend image:
Navigate to the ``backend`` directory and execute:
```
docker build -t elouvre-backend .
```

#### 2. Create frontend image:
Navigate to the ``frontend`` directory and execute:
```
docker build -t elouvre-frontend .
```

#### 3. Create .env file:
In the root directory create a ``.env`` file with the following variables (change values):
```config
JWT_SECRET_KEY="supersecret"
JWT_EXP_MINUTES=43800
BACKEND_HOST="http://localhost"
BACKEND_PORT=8081
FRONTEND_PORT=3000
MONGO_DB_USER="mongoadmin"
MONGO_DB_PASSWORD="mongopassword"
MONGO_DB_HOST="mongo-db"
MONGO_DB_PORT=27017
```

#### 4. Run all services:
Finally, to start all services, execute:
```
docker-compose up
```

### Development:

#### 1. Start the database:
Navigate to the ``development-db`` directory. There, create a ``.env`` file with the following variables:
```config
MONGO_DB_USER="mongoadmin"
MONGO_DB_PASSWORD="mongopassword"
MONGO_DB_PORT=27017
```

Then execute:
```
docker-compose up
```

A MongoDB database with the name "elouvredb" and should be initialized.


#### 2. Start the backend:
Navigate to the ``backend`` directory. There, create a ``.env`` file with the following variables:
```config
JWT_SECRET_KEY="supersecret"
JWT_EXP_MINUTES=43800
BACKEND_PORT=8081
MONGO_DB_USER="mongoadmin"
MONGO_DB_PASSWORD="mongopassword"
MONGO_DB_HOST="localhost"
MONGO_DB_PORT=27017
```

Then install all dependencies by executing:
```
npm install
```

To run the backend, execute:
```
npm run dev
```

#### 3. Start the frontend:
Navigate to the ``frontend`` directory. There, create a ``.env`` file with the following variables:
```config
NEXT_PUBLIC_BACKEND_HOST="http://localhost"
NEXT_PUBLIC_BACKEND_PORT=8081
```

Then install all dependencies by executing:
```
npm install
```

To run the frontend, execute:
```
npm run dev
```