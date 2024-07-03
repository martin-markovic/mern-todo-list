class MockUserData {
  constructor() {
    this.users = [
      {
        id: 1,
        name: "John Doe",
        email: "johndoe@gmail.com",
        password: "password123",
        password2: "password123",
        token: null,
      },
      {
        id: 2,
        name: "Jane Doe",
        email: "janedoe@gmail.com",
        password: "password123",
        password2: "password123",
        token: null,
      },
    ];

    this.goals = [
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
    ];
  }
}

const mockUserData = new MockUserData();
export default mockUserData;
