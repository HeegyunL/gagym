import axios from "axios";

export interface TrainerItemResponse{
  id: number;
  gymCode:number;
  trainerName:string;
  trainerIntro:string;
  trainerPhotoUrl:string;
  pt1TimePrice:string;
  pt10TimePrice:string;
  pt30TimePrice:string;
  yoga1TimePrice:string;
  yoga10TimePrice:string;
  yoga30TimePrice:string;
  pilates1TimePrice:string;
  pilates10TimePrice:string;
  pilates30TimePrice:string;
}

export interface TrainerItemRequest{
  id: number;
  gymCode:number;
  trainerName:string;
  trainerIntro:string;
  trainerPhotoUrl:string;
  pt1TimePrice:string | undefined;
  pt10TimePrice:string| undefined;
  pt30TimePrice:string| undefined;
  yoga1TimePrice:string| undefined;
  yoga10TimePrice:string| undefined;
  yoga30TimePrice:string| undefined;
  pilates1TimePrice:string| undefined;
  pilates10TimePrice:string| undefined;
  pilates30TimePrice:string| undefined;
}

const trainerApi = {
  get: () =>
    axios.get<TrainerItemResponse>(
       `http://localhost:8080/trainer`
    ),
  // axios.get<응답데이터의타입>(요청URL);
  // GET 요청URL HTTP/1.1
  fetch: () =>
  axios.get<TrainerItemResponse[]>(`http://localhost:8080/trainer`),
  
    add:(trainerItem:TrainerItemRequest)=>
  axios.post<TrainerItemResponse>(
    `http://localhost:8080/trainer`,
    trainerItem
  ),
  remove:(id:number) =>
  axios.delete<boolean>(`http://localhost:8080/trainer/${id}`),

  modify :( id:number,trainerItem:TrainerItemRequest)=>
  axios.put<TrainerItemResponse>(
    `http://localhost:8080/trainer/${id}`,
    trainerItem
  )
};
export default trainerApi;