class MockDB {
  constructor() {
    this.storage = {
      users: [],
      goals: [],
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
