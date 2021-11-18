import reservationReducer, {
  initialCompleted,
  initialDiary,
  modifyDiary,
  removeDiary,
} from "../../provider/modules/diary";
import { createAction, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { addReservation, initialReservation, modifyReservation, removeReservation, ReservationItem } from "../../provider/modules/reservation";
import { call, put, takeEvery, takeLatest } from "@redux-saga/core/effects";
import { AxiosResponse } from "axios";
import api,{ ReservationItemRequest, ReservationItemResponse } from "../../pages/api/reservation";





/* ========= saga action을 생성하는 부분 =============== */

export const requestAddReservation = createAction<ReservationItem>(
  `${reservationReducer.name}/requestAddReservation`
);

export const requestFetchReservation = createAction(
  `${reservationReducer.name}/requestFetchReservation`
);
export const requestFetchReservationItem = createAction<number>(
  `${reservationReducer.name}/requestFetchReservationItem`
);

export const requestRemoveReservation = createAction<number>(
  `${reservationReducer.name}/requestRemoveReservation`
);

export const requestModifyReservation = createAction<ReservationItem>(
  `${reservationReducer.name}/requestModifyReservation`
);

/* ========= saga action을 처리하는 부분 =============== */

function* addData(action: PayloadAction<ReservationItem>) {
  yield console.log("--addData--");
  yield console.log(action);

  
    const reservationItemPayload = action.payload;

    const reservationItemRequest: ReservationItemRequest = {
      id:reservationItemPayload.id,
      memberName: reservationItemPayload.memberName,
      memberPhone:reservationItemPayload.memberPhone,
      memberRequest:reservationItemPayload.memberRequest,
      gymName:reservationItemPayload.gymName,
      trainerName:reservationItemPayload.trainerName,
      boughtService:reservationItemPayload.boughtService

    };

    const result: AxiosResponse<ReservationItemResponse> = yield call(
      api.add,
      reservationItemRequest
    );

    const ReservationItem: ReservationItem = {


      id: result.data.id,
      memberName: result.data.memberName,
      memberPhone:result.data.memberPhone,
      memberRequest:result.data.memberRequest,
      gymName:result.data.gymName,
      trainerName:result.data.trainerName,
      boughtService:result.data.boughtService

    };

    yield put(addReservation(ReservationItem));

    yield put(initialCompleted());

    
  } 



function* fetchData() {
  yield console.log("--fetchData--");

  const result: AxiosResponse<ReservationItemResponse[]> = yield call(api.fetch);

  const reservations = result.data.map(
    (item) =>
      ({

      id: item.id,
      memberName: item.memberName,
      memberPhone:item.memberPhone,
      memberRequest:item.memberRequest,
      gymName:item.gymName,
      trainerName:item.trainerName,
      boughtService:item.boughtService


      } as ReservationItem)
  );

  yield put(initialReservation(reservations));
}

// function* fetchPagingData(action: PayloadAction<PageRequest>) {
//   yield console.log("--fetchPagingData--");

//   const page = action.payload.page;
//   const size = action.payload.size;

//   // 백엔드에서 데이터 받아오기
//   const result: AxiosResponse<ReservationPagingResponse> = yield call(
//     api.fetchPaging,
//     page,
//     size
//   );

//   const reservationPage: ReservationPage = {

//     data: result.data.content.map(
//       (item) =>
//         ({
//           id: item.id,
//           memberName: item.memberName,
//           memberPhone:item.memberPhone,
//           memberRequest:item.memberRequest,
//           gymName:item.gymName,
//           trainerName:item.trainerName,
//           boughtService:item.boughtService
//         } as ReservationItem)
//     ),
//     totalElements: result.data.totalElements,
//     totalPages: result.data.totalPages,
//     page: result.data.number,
//     pageSize: result.data.size,
//     isLast: result.data.last,
//   };

//   yield put(initialPagedReservation(reservationPage));
// }

function* removeData(action: PayloadAction<number>) {
  yield console.log("--removeData--");

  const id = action.payload;

  const result: AxiosResponse<boolean> = yield call(api.remove, id);

  if (result.data) {
    yield put(removeDiary(id));
  }

  yield put(initialCompleted());
}

function* modifyData(action: PayloadAction<ReservationItem>) {
  yield console.log("--modifyData--");

  const reservationItemPayload = action.payload;

  const reservationItemRequest: ReservationItemRequest = {
    id:reservationItemPayload.id,
    memberName: reservationItemPayload.memberName,
    memberPhone:reservationItemPayload.memberPhone,
    memberRequest:reservationItemPayload.memberRequest,
    gymName:reservationItemPayload.gymName,
    trainerName:reservationItemPayload.trainerName,
    boughtService:reservationItemPayload.boughtService

  };

  const result: AxiosResponse<ReservationItemResponse> = yield call(
    api.modify,
    reservationItemPayload.id,
    reservationItemRequest
  );

  const ReservationItem: ReservationItem = {


    id: result.data.id,
    memberName: result.data.memberName,
    memberPhone:result.data.memberPhone,
    memberRequest:result.data.memberRequest,
    gymName:result.data.gymName,
    trainerName:result.data.trainerName,
    boughtService:result.data.boughtService
  };

  yield put(modifyReservation(ReservationItem));

  yield put(initialCompleted());
}




// function* fetchMqData() {
//   yield console.log("--fetchData--");

//   const result: AxiosResponse<ReservationItemResponse[]> = yield call(api.fetchMq);

//   const reservations = result.data.map(
//     (item) =>
//       ({

//       id: item.id,
//       memberName: item.memberName,
//       memberPhone:item.memberPhone,
//       memberRequest:item.memberRequest,
//       gymName:item.gymName,
//       trainerName:item.trainerName,
//       boughtService:item.boughtService


//       } as ReservationItem)
//   );

//   yield put(initialReservation(reservations));
// }

// function* fetchPagingMqData(action: PayloadAction<PageRequest>) {
//   yield console.log("--fetchPagingData--");

//   const page = action.payload.page;
//   const size = action.payload.size;

  // 백엔드에서 데이터 받아오기
  // const result: AxiosResponse<ReservationPagingResponse> = yield call(
  //   api.fetchPagingMq,
  //   page,
  //   size
  // );

  // const reservationPage: ReservationPage = {

  //   data: result.data.content.map(
  //     (item) =>
  //       ({
  //         id: item.id,
  //         memberName: item.memberName,
  //         memberPhone:item.memberPhone,
  //         memberRequest:item.memberRequest,
  //         gymName:item.gymName,
  //         trainerName:item.trainerName,
  //         boughtService:item.boughtService
  //       } as ReservationItem)
  //   ),
  //   totalElements: result.data.totalElements,
  //   totalPages: result.data.totalPages,
  //   page: result.data.number,
  //   pageSize: result.data.size,
  //   isLast: result.data.last,
  // };

  // yield put(initialPagedReservation(reservationPage));
// }



/* ========= saga action을 감지(take)하는 부분 =============== */

export default function* reservationSaga() {

  yield takeEvery(requestAddReservation, addData);

  yield takeLatest(requestFetchReservation, fetchData);
  // yield takeLatest(requestFetchReservation, fetchMqData);
  // yield takeLatest(requestFetchPagingReservation, fetchPagingData);
  // yield takeLatest(requestFetchPagingReservation, fetchPagingMqData);

  yield takeEvery(requestRemoveReservation, removeData);

  yield takeEvery(requestModifyReservation, modifyData);
}