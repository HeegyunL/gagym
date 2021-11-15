import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import rootSaga from "../middleware";
import partnerReducer from "./modules/partner"
import diaryReducer from "./modules/diary"
import trainerReducer from "./modules/trainer"
import reservationReducer from "./modules/reservation"



//saga middleware 생성
//redux saga는 redux 상태처리 전/후를 관리 해주는 라이브러리
const sagaMiddleware = createSagaMiddleware();

//global state(전역상태) 저장소 만듬
//다른 컴포넌트와 state가 공유됨
export const store = configureStore({
  reducer : {
    partner : partnerReducer,
    diary : diaryReducer,
    trainer : trainerReducer,
    reservation: reservationReducer,
  },
  middleware : [sagaMiddleware],
  devTools :true //개발툴 사용 여부
})

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;