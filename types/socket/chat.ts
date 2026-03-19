// 채팅 전송
export type SendChatMessageRequest = {
  message: string;
};

// 채팅 수신
export type ReceiveChatMessageResponse = {
  memberId: string;
  nickname: string;
  message: string;
  timestamp: string;
};

// 접속자 목록 수신
export type ChatUserInfo = {
  memberId: string;
  nickname: string;
};
export type ChatUsersResponse = {
  users: ChatUserInfo[];
};
