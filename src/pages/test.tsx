import RoomCard from "@/components/Room";
import { Room } from "@/types";

const mockRoom: Room = {
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
};

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-900 p-10">
      <RoomCard room={mockRoom} />
    </div>
  );
}
