import { readDB } from "../dbController.js";

const getUsers = () => readDB("users");

const UsersRoute = [
  {
    method: 'get',
    route: '/users',
    handler: (req, res) => {
      const users = getUsers();
      res.status(200).send(users);
    }
  },
  {
    method: 'get',
    route: '/users/:id',
    handler: ({ params: { id } }, res) => {
      try {
        const users = getUsers();
        const find = users[id];
        if (!find) { throw Error("Not found"); }

        res.status(200).json(users);
      } catch (err) {
        res.status(404).send({ status: 'error', error: err.toString() });
      }
    }
  }
];

export default UsersRoute;