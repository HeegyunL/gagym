import axios from "axios";

export interface DiaryPagingResponse {
  content: DiaryItemResponse[];
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface DiaryItemResponse {
  id: number;
  memberName: string;
  diaryMorning: string;
  diaryLunch: string;
  diaryDinner: string;
  diaryRoutine: string;
  diaryRequest: string;
  trainerName: string;
  trainerFeedback: string;
  diaryCreateTime: number;

}
export interface DiaryItemRequest {
  memberName: string;
  diaryMorning: string;
  diaryLunch: string;
  diaryDinner: string;
  diaryRoutine: string;
  diaryRequest: string;
  trainerName: string;
  trainerFeedback: string;
  //diaryCreateTime: number;
}

const diaryApi = {

  fetch: () =>
  axios.get<DiaryItemResponse[]>(`http://localhost:8080/diary`),

  fetchPaging: (page: number, size: number) =>
    axios.get<DiaryPagingResponse>(
      `http://localhost:8080/diary`
    ),


  add: (diaryItem: DiaryItemRequest) =>
    axios.post<DiaryItemResponse>(
      `http://localhost:8080/diary`,
      diaryItem
    ),

  remove: (id: number) =>
    axios.delete<boolean>(`http://localhost:8080/diary/${id}`),


  modify: (id: number, diaryItem: DiaryItemRequest) =>
    axios.put<DiaryItemResponse>(
      `http://localhost:8080/diary/${id}`,
      diaryItem
    )
};

export default diaryApi;