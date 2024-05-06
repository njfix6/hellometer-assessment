# Hellometer Take Home Assessment

## Application Insights

Shows the slowest wait time and when they occured. Lists the wait times and applies "Alert" and "Warning" tags to the slowest times. The user should dig into these times to see why the order took so long to make.

## Other Features

- Be able to select multiple stores
- See breakdown of each order data brokend down from `Order Time`, `Wait Time`, and `Payment Time`.

## Running the Application

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
