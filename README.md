# Hellometer Take Home Assessment

## Application Insights

Shows the slowest wait time and when they occurred. Lists the wait times and applies `Alert` and `Warning` tags to the slowest wait times. The user (store owner) should dig into these times to see why the customer had to wait so long for their order.

## Other Features

- Be able to select multiple stores.
- See the graph of all `Wait Times`.
- See the graph of total order time broken down into `Order Time`, `Wait Time`, and `Payment Time`.

## Running the Application

### Prerequisites

These are the versions I'm running but would most likely work with other versions.

```
Node.js - 16.16.0
yarn - 1.22.19
```

### Start the backend server

```
cd server
yarn
yarn start
```

### Start the frontend server

```
cd web
yarn
yarn start
```

Visit `http://localhost:3000/` to see the application.
