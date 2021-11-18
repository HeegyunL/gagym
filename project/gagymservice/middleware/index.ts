import { fork } from "redux-saga/effects";
import partnerSaga from "./modules/partner";
import diarySaga from "./modules/diary";
import trainerSaga from "./modules/trainer";
import reservationSaga from "./modules/reservation";

export default function* rootSaga(){
  yield fork(partnerSaga);
  yield fork(trainerSaga);
  yield fork(diarySaga);
  yield fork(reservationSaga);
  
}