
# Stack

Database: PostgreSQL\
Framework: Express.js\
Language: TypeScript

# Setup

1-Create .env file in root directory and set db-uri value to your database URI:

/.env
```bash
db-uri={your PostgreSQL URI}
```

2-Install modules.

```bash
  npm install
```

3-Compile the typescript files to javascript files:

```bash
  npm run build
```

4-Run the server:

```bash
  npm run start
```

# Unit Testing

```bash
  npm run test
```

# Endpoints

### POST /api/tasks
Creates a new task with given properties.

Request Body: 
```json
  {
      "title": string,
      "description": string,
      "dueDate": string ( ISO 8601 date format)
  }
```

returns the created task object in JSON format (with "id" property)

### GET /api/tasks/{taskId}

returns the the task object in JSON format.

### PUT /api/tasks/{taskId}

Updates the task with the given properties in request body:

Request Body: 
```json
  {
      "title": string,
      "description": string,
      "dueDate": string ( ISO 8601 date format)
  }
```

### DELETE /api/tasks/{taskId}

Deletes the task with the given id.

