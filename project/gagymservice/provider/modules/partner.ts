import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TrainerItem } from "./trainer";


export interface PartnerItem {
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
  fileType:string;
  fileName:string;
  gym1DayPrice : string;
  gym3DayPrice : string;
  gym7DayPrice : string;
  gymMonthPrice : string;
  gym3MonthPrice : string;
  gym6MonthPrice : string;
  gymYearPrice : string;
  // gymTrainer : TrainerItem[];
}



// export interface TrainerItem {
//   id: number;
//   trainerName:string;
//   trainerIntro:string;
//   trainerPhotoUrl:string;
//   pt1TimePrice:string;
//   pt10TimePrice:string;
//   pt30TimePrice:string;
//   yoga1TimePrice:string;
//   yoga10TimePrice:string;
//   yoga30TimePrice:string;
//   pilates1TimePrice:string;
//   pilates10TimePrice:string;
//   pilates30TimePrice:string;

// }
interface PartnerState {
  data : PartnerItem[];
  isFetched : boolean;
  isAddCompleted? : boolean;
  isRemoveCompleted?: boolean;
  isModifyCompleted?: boolean;

}









const initialState : PartnerState ={
  data : [],
  isFetched :false,
}


const partnerSlice = createSlice({
  name : "partner",
  initialState,
  reducers:{
    // Payload로 item객체를 받음
    addPartner : (state, action:PayloadAction<PartnerItem>)=>{
      const partner = action.payload;
      console.log("--in reducer function--");
      console.log(partner);
      state.data.unshift(partner);
      state.isAddCompleted = true; //추가확인 표시
    },
    //payload 없는 reducer
    //complted 관련된 속성을 삭제함 (undefined 상태)
    initialCompleted: (state) => {
      delete state.isAddCompleted;
      delete state.isRemoveCompleted;
      delete state.isModifyCompleted;
    },
    initialPartnerItem : (state, action: PayloadAction<PartnerItem>)=>{
      const partner = action.payload;
      state.data=[{ ...partner }];
    },
    initialPartner: (state, action:PayloadAction<PartnerItem[]>)=>{
      const partner = action.payload;
      state.data = partner;
      state.isFetched = true;
    },
    
    removePartner: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      // id에 해당하는 아이템의 index를 찾고 그 index로 splice를 한다.
      state.data.splice(
        state.data.findIndex((item) => item.id === id),
        1
      );
      state.isRemoveCompleted = true; // 삭제 되었음을 표시
    },
    modifyPartner: (state, action: PayloadAction<PartnerItem>) => {
      // 생성해서 넘긴 객체
      const modifyItem = action.payload;
      // state에 있는 객체
      const partnerItem = state.data.find((item) => item.id === modifyItem.id);
      // state에 있는 객체의 속성을 넘김 객체의 속성으로 변경
      if (partnerItem) {
        partnerItem.gymName=modifyItem.gymName;
        partnerItem.gymCoNum=modifyItem.gymCoNum;
        partnerItem.gymLocateSi=modifyItem.gymLocateSi;
        partnerItem.gymLocateGunGu=modifyItem.gymLocateGunGu;
        partnerItem.gymAddress=modifyItem.gymAddress;
        partnerItem.gymPhoneNum=modifyItem.gymPhoneNum;
        partnerItem.gymTime=modifyItem.gymTime;
        partnerItem.gymService=modifyItem.gymService;
        partnerItem.gymPhoto=modifyItem.gymPhoto;
        partnerItem.fileName = modifyItem.fileName;
        partnerItem.fileType = modifyItem.fileType;
        partnerItem.gym1DayPrice=modifyItem.gym1DayPrice;
        partnerItem.gym3DayPrice=modifyItem.gym3DayPrice;
        partnerItem.gym7DayPrice=modifyItem.gym7DayPrice;
        partnerItem.gymMonthPrice=modifyItem.gymMonthPrice;
        partnerItem.gym3MonthPrice=modifyItem.gym3MonthPrice;
        partnerItem.gym6MonthPrice=modifyItem.gym6MonthPrice;
        partnerItem.gymYearPrice=modifyItem.gymYearPrice;
        // partnerItem.gymTrainer=modifyItem.gymTrainer;

        
      }
      state.isModifyCompleted = true; // 변경 되었음을 표시
    },
   
    
    

  },
});

export const {
  addPartner,
  initialCompleted,
  initialPartnerItem,
  initialPartner,
  modifyPartner,
  removePartner
}= partnerSlice.actions;

export default partnerSlice.reducer;