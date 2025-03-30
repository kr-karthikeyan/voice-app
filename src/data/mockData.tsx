import { Room } from "@/types";

export const mockRooms: Room[] = [
  {
    id: "1",
    name: "Tech Talk",
    speakers: [
      { id: "1", name: "Karthik", avatar: "/avatar1.png", isSpeaker: true },
      { id: "2", name: "Jarvis", avatar: "/avatar2.png", isSpeaker: true },
    ],
    listeners: [
      { id: "3", name: "Tony", avatar: "/avatar3.png", isSpeaker: false },
      { id: "4", name: "Steve", avatar: "/avatar4.png", isSpeaker: false },
    ],
  },
  {
    id: "2",
    name: "Gaming Room",
    speakers: [
      { id: "5", name: "Thor", avatar: "/avatar5.png", isSpeaker: true },
    ],
    listeners: [
      { id: "6", name: "Loki", avatar: "/avatar6.png", isSpeaker: false },
      { id: "7", name: "Hulk", avatar: "/avatar7.png", isSpeaker: false },
    ],
  },
];
