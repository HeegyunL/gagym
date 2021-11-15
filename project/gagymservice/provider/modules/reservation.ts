import { createSlice, PayloadAction } from "@reduxjs/toolkit";



export interface ReservationItem {
  id: number;
  memberName: string;
  gymName:string;
  memberPhoneNum:string;
  reservationService:string;
  reservationTeacher:string;
  request:string;
}



export interface ReservationPage {
  data: ReservationItem[];
  totalElements: number;
  totalPages: number;
  page: number;
  pageSize: number;
  isLast: boolean;
}
interface ReservationState {
  data : ReservationItem[];
  isFetched : boolean;
  isAddCompleted? : boolean;
  isRemoveCompleted?: boolean; 
  isModifyCompleted?: boolean;
  totalElements?: number;
  totalPages: number;
  page: number;
  pageSize: number;
  isLast?: boolean;
}

const initialState : ReservationState ={
  data: [
    {
      id:1,
      memberName:"나멸치",
      gymName: " 이희균",
      memberPhoneNum:"010-1203-1231",
      reservationService:"pt1회 이용권, 헬스장 3일권",
      reservationTeacher:"한동기",
      request:"하체 중심ㄱㄴ?",
    }
  ],
  isFetched: false,
  page: 0,
  pageSize: 5,
  totalPages: 0,
}


const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    addReservation: (state, action: PayloadAction<ReservationItem>) => {
      const reservation = action.payload;
      console.log("--in reducer function--");
      console.log(reservation);
      state.data.unshift(reservation);
      state.isAddCompleted = true; 
    },

    initialCompleted: (state) => {
      delete state.isAddCompleted;
      delete state.isRemoveCompleted;
      delete state.isModifyCompleted;
    },

    removeReservation: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.data.splice(
        state.data.findIndex((item) => item.id === id),
        1
      );
      state.isRemoveCompleted = true;
    },
    modifyReservation: (state, action: PayloadAction<ReservationItem>) => {
      const modifyItem = action.payload;
      const reservationItem = state.data.find((item) => item.id === modifyItem.id);
      if (reservationItem) {
        reservationItem.memberName = modifyItem.memberName;
        reservationItem.gymName = modifyItem.gymName;
        reservationItem.memberPhoneNum = modifyItem.memberPhoneNum;
        reservationItem.reservationService = modifyItem.reservationService;
        reservationItem.reservationTeacher = modifyItem.reservationTeacher;

      }
           state.isModifyCompleted = true;
    },

    initialReservation: (state, action: PayloadAction<ReservationItem[]>) => {
      const reservations = action.payload;
      state.data = reservations;
      state.isFetched = true;
    },
    initialPagedReservation: (state, action: PayloadAction<ReservationPage>) => {

      state.data = action.payload.data;
      state.totalElements = action.payload.totalElements;
      state.totalPages = action.payload.totalPages;
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
      state.isLast = action.payload.isLast;
      state.isFetched = true;
    },
  },
});

export const { 
  addReservation, 
  removeReservation, 
  modifyReservation,  
  initialReservation,
  initialCompleted,
  initialPagedReservation,
} = reservationSlice.actions;


export default reservationSlice.reducer;