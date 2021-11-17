import axios from "axios";
import { TrainerItem } from "../../provider/modules/trainer";

export interface PartnerItemResponse{
  id: number;
  gymName:string;
  gymCoNum : string;
  gymLocateSi : string;
  gymLocateGunGu : string;
  gymAddress : string;
  gymPhoneNum : string;
  gymTime : string;
  gymService :string;
  gymPhoto:string;
  fileName:string;
  fileType:string;
  gym1DayPrice : string;
  gym3DayPrice : string;
  gym7DayPrice : string;
  gymMonthPrice : string;
  gym3MonthPrice : string;
  gym6MonthPrice : string;
  gymYearPrice : string;
  // gymTrainer: TrainerItem[];

}
export interface PartnerItemRequest{
  id: number;
  gymName:string;
  gymCoNum : string;
  gymLocateSi : string;
  gymLocateGunGu : string;
  gymAddress : string;
  gymPhoneNum : string;
  gymTime : string;
  gymService :string;
  gymPhoto:string;
  fileName:string;
  fileType:string;
  gym1DayPrice : string;
  gym3DayPrice : string;
  gym7DayPrice : string;
  gymMonthPrice : string;
  gym3MonthPrice : string;
  gym6MonthPrice : string;
  gymYearPrice : string;
  // gymTrainer : TrainerItem[];
}


const partnerApi = {
  get: () =>
    axios.get<PartnerItemResponse>(
       `http://localhost:8080/partner`
    ),
  // axios.get<응답데이터의타입>(요청URL);
  // GET 요청URL HTTP/1.1
  fetch: () =>
  axios.get<PartnerItemResponse[]>(`http://localhost:8080/partner`),
  
    add:(partnerItem:PartnerItemRequest)=>
  axios.post<PartnerItemResponse>(
    `http://localhost:8080/partner`,
    partnerItem
  ),
  addMq:(partnerItem:PartnerItemRequest)=>
  axios.post<PartnerItemResponse>(
    `http://localhost:7070/partner`,
    partnerItem
  ),
  remove:(id:number) =>
  axios.delete<boolean>(`http://localhost:8080/partner/${id}`),

  modify :( id:number,partnerItem:PartnerItemRequest)=>
  axios.put<PartnerItemResponse>(
    `http://localhost:8080/partner/${id}`,
    partnerItem
  )
};
export default partnerApi;