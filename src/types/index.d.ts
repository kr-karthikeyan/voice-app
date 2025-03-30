export interface User {
    id: string;
    name: string;
    avatar: string;
    isSpeaker: boolean;
    isMuted?: boolean;
    speaking?: boolean;
  }
  
  export interface Room {
    id: string;
    name: string;
    speakers: User[];
    listeners: User[];
  }
  