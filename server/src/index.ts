import server from "./server";

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
