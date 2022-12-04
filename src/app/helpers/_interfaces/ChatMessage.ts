export interface IRecentChats {
  "chats": IChatRecent[]
  "rowCount": number

}


export interface IChatRecent {
  senderName: String
  senderIdentityId: String
  date?: String
}

export interface IRecentChatFilter {

  "sectionId"?: string
  "stageId"?: string
  "gradeId"?: string
  "studentName"?: string
  "studentNumber"?: string
  "pageNo": number
  "pageSize": number

}


export interface IChatHistory {
  senderName: String
  senderIdentityId: String
  isAdmin: Boolean
  message: String
  date: String

  attachment: String
  isFile: Boolean
  type: String
}



export interface IAdminReplay {
  receiverIdentityId: String,
  message: String
}
