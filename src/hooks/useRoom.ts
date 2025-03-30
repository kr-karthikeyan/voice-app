import { useState } from "react";
import { Room, User } from "@/types";

export const useRoom = (initialRoom: Room) => {
  const [room, setRoom] = useState<Room>(initialRoom);
  const [isJoined, setIsJoined] = useState(false);

  const joinRoom = () => {
    setIsJoined(true);
    // Here you would typically make an API call to join the room
    // and update the room state with the new user
  };

  const leaveRoom = () => {
    setIsJoined(false);
    // Here you would typically make an API call to leave the room
    // and update the room state to remove the user
  };

  const toggleMute = (userId: string) => {
    setRoom((prevRoom) => ({
      ...prevRoom,
      speakers: prevRoom.speakers.map((speaker) =>
        speaker.id === userId
          ? { ...speaker, isMuted: !speaker.isMuted }
          : speaker
      ),
    }));
  };

  const toggleSpeaking = (userId: string) => {
    setRoom((prevRoom) => ({
      ...prevRoom,
      speakers: prevRoom.speakers.map((speaker) =>
        speaker.id === userId
          ? { ...speaker, speaking: !speaker.speaking }
          : speaker
      ),
    }));
  };

  const promoteToSpeaker = (userId: string) => {
    setRoom((prevRoom) => {
      const user = prevRoom.listeners.find((listener) => listener.id === userId);
      if (!user) return prevRoom;

      return {
        ...prevRoom,
        speakers: [
          ...prevRoom.speakers,
          {
            ...user,
            isMuted: false,
            speaking: false,
          },
        ],
        listeners: prevRoom.listeners.filter((listener) => listener.id !== userId),
      };
    });
  };

  const demoteToListener = (userId: string) => {
    setRoom((prevRoom) => {
      const user = prevRoom.speakers.find((speaker) => speaker.id === userId);
      if (!user) return prevRoom;

      return {
        ...prevRoom,
        speakers: prevRoom.speakers.filter((speaker) => speaker.id !== userId),
        listeners: [
          ...prevRoom.listeners,
          {
            ...user,
            isMuted: false,
            speaking: false,
          },
        ],
      };
    });
  };

  return {
    room,
    isJoined,
    joinRoom,
    leaveRoom,
    toggleMute,
    toggleSpeaking,
    promoteToSpeaker,
    demoteToListener,
  };
};
