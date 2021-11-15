import { fork } from "redux-saga/effects";
import partnerSaga from "./modules/partner";
import diarySaga from "./modules/diary";
import trainerSaga from "./modules/trainer";

export default function* rootSaga(){
  yield fork(partnerSaga);
  yield fork(trainerSaga);
  yield fork(diarySaga);
}