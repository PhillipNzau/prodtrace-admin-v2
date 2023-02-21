export interface ChatResModel{
  count?: number,
  next?: null,
  previous?: null,
  results: ChatModel,
}

export interface ChatModel {
  id: string,
  title: string,
  message: string,
  is_message_read: boolean,
  is_message_replied: boolean,
  reply: null,
  user_id: string,
  created_at: string,
  updated_at: string

}
