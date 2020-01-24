export interface CommentsInterface {
  id: number;
  date: string;
  idCommentator: number;
  idOrder: number;
  message: string;
  name: string;
  photo: string;
  role: string;
  senderEmail: string;
  isFile?: boolean;
}
