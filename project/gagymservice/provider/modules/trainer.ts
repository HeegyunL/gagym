import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TrainerItem {

  id: number;
  gymCode:string;
  trainerName:string;
  trainerIntro:string;
  trainerPhotoUrl:string;
  pt1TimePrice?:string;
  pt10TimePrice?:string;
  pt30TimePrice?:string;
  yoga1TimePrice?:string;
  yoga10TimePrice?:string;
  yoga30TimePrice?:string;
  pilates1TimePrice?:string;
  pilates10TimePrice?:string;
  pilates30TimePrice?:string;
}





interface TrainerState {
  data : TrainerItem[];
  isFetched : boolean;
  isAddCompleted? : boolean;
  isModifyCompleted? : boolean;

}


const initialState : TrainerState ={
  data : [],
  isFetched :false,
}


const trainerSlice = createSlice({
  name : "trainer",
  initialState,
  reducers:{
    // Payload로 item객체를 받음
    addTrainer : (state, action:PayloadAction<TrainerItem>)=>{
      const trainer = action.payload;
      console.log("--in reducer function--");
      console.log(trainer);
      state.data.unshift(trainer);
      state.isAddCompleted = true; //추가확인 표시
    },
    //payload 없는 reducer
    //complted 관련된 속성을 삭제함 (undefined 상태)
    initialCompleted : (state)=>{
      delete state.isAddCompleted;
    }, 
    initialTrainerItem : (state, action: PayloadAction<TrainerItem>)=>{
      const trainer = action.payload;
      state.data=[{ ...trainer }];
    },
    initialTrainer:(state, action:PayloadAction<TrainerItem[]>)=>{
      const trainer = action.payload;
      state.data = trainer;
      state.isFetched = true;
    },
    modifyTrainer: (state, action: PayloadAction<TrainerItem>) => {
      // 생성해서 넘긴 객체
      const modifyItem = action.payload;
      // state에 있는 객체
      const trainerItem = state.data.find((item) => item.id === modifyItem.id);
      // state에 있는 객체의 속성을 넘김 객체의 속성으로 변경
      if (trainerItem) {
        trainerItem.gymCode=modifyItem.gymCode;
        trainerItem.trainerName=modifyItem.trainerName;
        trainerItem.trainerIntro=modifyItem.trainerIntro;
        trainerItem.trainerPhotoUrl=modifyItem.trainerPhotoUrl;
        trainerItem.pt1TimePrice=modifyItem.pt1TimePrice;
        trainerItem.pt10TimePrice=modifyItem.pt10TimePrice;
        trainerItem.pt30TimePrice=modifyItem.pt30TimePrice;
        trainerItem.yoga1TimePrice=modifyItem.yoga1TimePrice;
        trainerItem.yoga10TimePrice=modifyItem.yoga10TimePrice;
        trainerItem.yoga30TimePrice=modifyItem.yoga30TimePrice;
        trainerItem.pilates1TimePrice=modifyItem.pilates1TimePrice;
        trainerItem.pilates10TimePrice=modifyItem.pilates10TimePrice;
        trainerItem.pilates30TimePrice=modifyItem.pilates30TimePrice;

        
      }
      state.isModifyCompleted = true; // 변경 되었음을 표시
    },
    

  },
});
export const {
  addTrainer,
  initialCompleted,
  initialTrainerItem,
  initialTrainer,
  modifyTrainer
}= trainerSlice.actions;
export default trainerSlice.reducer;