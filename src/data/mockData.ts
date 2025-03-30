export const mockUsers = [
  {
    id: "1",
    name: "Karthik",
    avatar: "https://avatars.githubusercontent.com/u/1?v=4",
    isMuted: false,
    speaking: false,
  },
  {
    id: "2",
    name: "Jarvis",
    avatar: "https://avatars.githubusercontent.com/u/2?v=4",
    isMuted: false,
    speaking: false,
  },
  {
    id: "3",
    name: "Tony",
    avatar: "https://avatars.githubusercontent.com/u/3?v=4",
    isMuted: false,
    speaking: false,
  },
  {
    id: "4",
    name: "Peter",
    avatar: "https://avatars.githubusercontent.com/u/4?v=4",
    isMuted: false,
    speaking: false,
  },
];

export const mockRooms = [
  {
    id: "1",
    name: "Tech Talk",
    speakers: mockUsers.slice(0, 2),
    listeners: mockUsers.slice(2),
    maxSpeakers: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Coffee Chat",
    speakers: mockUsers.slice(1, 3),
    listeners: [mockUsers[0], mockUsers[3]],
    maxSpeakers: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]; 