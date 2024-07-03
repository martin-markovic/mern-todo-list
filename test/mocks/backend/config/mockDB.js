class MockDB {
  constructor() {
    this.storage = {
      users: [
        {
          id: 1,
          name: "John Doe",
          email: "johndoe@gmail.com",
          password: "password123",
          password2: "password123",
          token: "qwertyasdfgzxc1",
        },
        {
          id: 2,
          name: "Jane Doe",
          email: "janedoe@gmail.com",
          password: "password123",
          password2: "password123",
          token: null,
        },
      ],
      goals: [
        {
          user: 1,
          text: "John Goal 1",
          isCompleted: false,
        },
        {
          user: 2,
          text: "Jane Goal 1",
          isCompleted: false,
        },
      ],
    };
  }

  find(collection, query) {
    return this.storage[collection].filter((item) => {
      return Object.keys(query).every((key) => item[key] === query[key]);
    });
  }

  findOne(collection, query) {
    return this.storage[collection].filter((item) => {
      return Object.keys(query).find((key) => item[key] === query[key]);
    });
  }
  insertOne(collection, newItem) {
    this.storage[collection].push(newItem);
    return newItem;
  }

  updateOne(collection, query, update) {
    const item = this.findOne(collection, query);
    if (item) {
      Object.assign(item, update);
    }
    return item;
  }
  deleteOne(collection, query) {
    const index = this.storage[collection].findIndex((item) => {
      return Object.keys(query).every((key) => item[key] === query[key]);
    });

    if (index > -1) {
      return this.storage[collection].splice(index, 1);
    }
    return null;
  }
}

const mockDB = new MockDB();
export default mockDB;
