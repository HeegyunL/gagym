import { takeEvery, call, select, put, takeLatest} from "@redux-saga/core/effects";
import { createAction, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { dataUrlToFile } from "../../lib/string";
import api,{ PartnerItemRequest, PartnerItemResponse } from "../../pages/api/partner";
import { RootState } from "../../provider";
import partnerReducer,{ addPartner,  initialCompleted, initialPartner, initialPartnerItem, modifyPartner, PartnerItem,removePartner } from "../../provider/modules/partner";
import { TrainerItem } from "../../provider/modules/trainer";
import fileApi from "../../pages/api/file";
import partner from "../../provider/modules/partner";


// saga action 생성 부분
//partner를 추가하도록 요청하는  action creator를 생성

//전체 데이터 조회에서 추가할 때
export const requestAddPartner = createAction<PartnerItem>(
  `${partnerReducer.name}/requestAddPartner`
);
//partner를 가져오는 action
export const requestFetchPartner = createAction(
  `${partnerReducer.name}/requestFetchPartner`
);

// 1건만 가져오는 action
export const requestFetchPartnerItem = createAction<number>(
  `${partnerReducer.name}/requestFetchPartnerItem`
);

export const requestRemovePartner = createAction<number>(
  `${partnerReducer.name}/requestRemovePartner`
);

export const requestModifyPartner=createAction<PartnerItem>(
  `${partnerReducer.name}/requestModifyPartner`
)




// saga action 처리 부분
function* addData(action : PayloadAction<PartnerItem>){
  // action의 payload로 넘어온 객체
  const partnerItemPayload = action.payload;


  // s3업로드
  // URL -> file변환
  // const file : File = yield call(
  //   dataUrlToFile,
  //   partnerItemPayload.gymPhoto,
  //   partnerItemPayload.fileName,
  //   partnerItemPayload.fileType
  // );
  //   //form data객체 생성
  //   const formFile = new FormData();
  //   formFile.set("file",file);

  //   //multipart/ form-data로 업로드
  //   const fileUrl:AxiosResponse<string> = yield call(fileApi.upload, formFile);


  // rest api로 보낼 요청객체
  const partnerItemRequest : PartnerItemRequest ={
    id:partnerItemPayload.id,
    gymName:partnerItemPayload.gymName,
    gymCoNum : partnerItemPayload.gymCoNum,
    gymLocateSi : partnerItemPayload.gymLocateSi,
    gymLocateGunGu : partnerItemPayload.gymLocateGunGu,
    gymAddress : partnerItemPayload.gymAddress,
    gymPhoneNum : partnerItemPayload.gymPhoneNum,
    gymTime : partnerItemPayload.gymTime,
    gymService :partnerItemPayload.gymService,
    // gymPhoto: fileUrl.data,
    // gymPhoto: partnerItemPayload.gymPhoto,
    // fileType : partnerItemPayload.fileType,
    // fileName : partnerItemPayload.fileName,
    gym1DayPrice : partnerItemPayload.gym1DayPrice,
    gym3DayPrice : partnerItemPayload.gym3DayPrice,
    gym7DayPrice : partnerItemPayload.gym7DayPrice,
    gymMonthPrice : partnerItemPayload.gymMonthPrice,
    gym3MonthPrice : partnerItemPayload.gym3MonthPrice,
    gym6MonthPrice : partnerItemPayload.gym6MonthPrice,
    gymYearPrice : partnerItemPayload.gymYearPrice,
    // gymTrainer :partnerItemPayload.gymTrainer,
  }
  const result : AxiosResponse<PartnerItemResponse> = yield call(
    api.add,
    partnerItemRequest
  )

  //redux state 변경
  //redux state 조회하기
  const partnerData : PartnerItem[]= yield select(
    (state:RootState)=> state.partner.data
  );

 const partnerItem : PartnerItem={
  id:result.data.id,
  gymName:result.data.gymName,
  gymCoNum : result.data.gymCoNum,
  gymLocateSi : result.data.gymLocateSi,
  gymLocateGunGu : result.data.gymLocateGunGu,
  gymAddress : result.data.gymAddress,
  gymPhoneNum : result.data.gymPhoneNum,
  gymTime : result.data.gymTime,
  gymService :result.data.gymService,
  // gymPhoto:result.data.gymPhoto,
  // fileType:result.data.fileType,
  // fileName:result.data.fileName,
  gym1DayPrice : result.data.gym1DayPrice,
  gym3DayPrice : result.data.gym3DayPrice,
  gym7DayPrice : result.data.gym7DayPrice,
  gymMonthPrice : result.data.gymMonthPrice,
  gym3MonthPrice : result.data.gym3MonthPrice,
  gym6MonthPrice : result.data.gym6MonthPrice,
  gymYearPrice : result.data.gymYearPrice,
  // gymTrainer : result.data.gymTrainer

 }

 yield put(addPartner(partnerItem));
 yield put(initialCompleted());

}
function* addMqData(action : PayloadAction<PartnerItem>){
  // action의 payload로 넘어온 객체
  const partnerItemPayload = action.payload;


  // s3업로드
  // URL -> file변환
  // const file : File = yield call(
  //   dataUrlToFile,
  //   partnerItemPayload.gymPhoto,
  //   partnerItemPayload.fileName,
  //   partnerItemPayload.fileType
  // );
  //   //form data객체 생성
  //   const formFile = new FormData();
  //   formFile.set("file",file);

  //   //multipart/ form-data로 업로드
  //   const fileUrl:AxiosResponse<string> = yield call(fileApi.upload, formFile);


  // rest api로 보낼 요청객체
  const partnerItemRequest : PartnerItemRequest ={
    id:partnerItemPayload.id,
    gymName:partnerItemPayload.gymName,
    gymCoNum : partnerItemPayload.gymCoNum,
    gymLocateSi : partnerItemPayload.gymLocateSi,
    gymLocateGunGu : partnerItemPayload.gymLocateGunGu,
    gymAddress : partnerItemPayload.gymAddress,
    gymPhoneNum : partnerItemPayload.gymPhoneNum,
    gymTime : partnerItemPayload.gymTime,
    gymService :partnerItemPayload.gymService,
    // gymPhoto: fileUrl.data,
    // gymPhoto: partnerItemPayload.gymPhoto,
    // fileType : partnerItemPayload.fileType,
    // fileName : partnerItemPayload.fileName,
    gym1DayPrice : partnerItemPayload.gym1DayPrice,
    gym3DayPrice : partnerItemPayload.gym3DayPrice,
    gym7DayPrice : partnerItemPayload.gym7DayPrice,
    gymMonthPrice : partnerItemPayload.gymMonthPrice,
    gym3MonthPrice : partnerItemPayload.gym3MonthPrice,
    gym6MonthPrice : partnerItemPayload.gym6MonthPrice,
    gymYearPrice : partnerItemPayload.gymYearPrice,
    // gymTrainer :partnerItemPayload.gymTrainer,
  }
  const result : AxiosResponse<PartnerItemResponse> = yield call(
    api.addMq,
    partnerItemRequest
  )

  //redux state 변경
  //redux state 조회하기
  const partnerData : PartnerItem[]= yield select(
    (state:RootState)=> state.partner.data
  );

 const partnerItem : PartnerItem={
  id:result.data.id,
  gymName:result.data.gymName,
  gymCoNum : result.data.gymCoNum,
  gymLocateSi : result.data.gymLocateSi,
  gymLocateGunGu : result.data.gymLocateGunGu,
  gymAddress : result.data.gymAddress,
  gymPhoneNum : result.data.gymPhoneNum,
  gymTime : result.data.gymTime,
  gymService :result.data.gymService,
  // gymPhoto:result.data.gymPhoto,
  // fileType:result.data.fileType,
  // fileName:result.data.fileName,
  gym1DayPrice : result.data.gym1DayPrice,
  gym3DayPrice : result.data.gym3DayPrice,
  gym7DayPrice : result.data.gym7DayPrice,
  gymMonthPrice : result.data.gymMonthPrice,
  gym3MonthPrice : result.data.gym3MonthPrice,
  gym6MonthPrice : result.data.gym6MonthPrice,
  gymYearPrice : result.data.gymYearPrice,
  // gymTrainer : result.data.gymTrainer

 }

 yield put(addPartner(partnerItem));
 yield put(initialCompleted());

}


//redux side effect
// 1. api 연동
// 2. 파일처리
// 3. 처리중 메시지 보여주기/감추기
// 4. 에러메시지 띄우기

// 서버에서 GET으로 데이터를 가저오고, redux state를 초기화
function* fetchData() {
yield console.log("---fetchData---");
  //백엔드에서 데이터 받아오기
const result: AxiosResponse<PartnerItemResponse[]> = yield call(api.fetch);
  
const partners = result.data.map(
    (item) =>
      ({
        id: item.id,
        gymName: item.gymName,
        gymCoNum : item.gymCoNum,
        gymLocateSi : item.gymLocateSi,
        gymLocateGunGu : item.gymLocateGunGu,
        gymAddress : item.gymAddress,
        gymPhoneNum : item.gymPhoneNum,
        gymTime : item.gymTime,
        gymService :item.gymService,
        // gymPhoto: item.gymPhoto,
        // fileName:item.fileName,
        // fileType:item.fileType,
        gym1DayPrice : item.gym1DayPrice,
        gym3DayPrice : item.gym3DayPrice,
        gym7DayPrice : item.gym7DayPrice,
        gymMonthPrice : item.gymMonthPrice,
        gym3MonthPrice : item.gym3MonthPrice,
        gym6MonthPrice : item.gym6MonthPrice,
        gymYearPrice : item.gymYearPrice,
        // gymTrainer: item.gymTrainer,
     } as PartnerItem)
  )
  yield put(initialPartner(partners))
  }

  function* fetchDataItem(action: PayloadAction<number>) {
    yield console.log("--fetchDataItem--");
  
    const id = action.payload;
  
    // 백엔드에서 데이터 받아오기
    const result: AxiosResponse<PartnerItemResponse> = yield call(api.fetch);
  
    const partner = result.data;
    if (partner) {
      // state 초기화 reducer 실행
      yield put(initialPartnerItem(partner));
    }
  }

  function* removeData(action:PayloadAction<number>){
    yield console.log("--removeData--")

    const id = action.payload;

    // s3 파일 삭제
    // const partnerItem : PartnerItem = yield select((state : RootState)=>
    // state.partner.data.find((item)=>item.id===id)
    // );

    // const urlArr=partnerItem.gymPhoto.split("/");
    // const objectKey = urlArr[urlArr.length -1];

    //file api 호출해서 s3에 파일 삭제
    // yield call(fileApi.remove, objectKey);
    //  ----------------

    const result : AxiosResponse<boolean> = yield call(api.remove, id);
    if(result.data){
      yield put(removePartner(id));
    }
    yield put(initialCompleted());
    

    }
  


  function* modifyData(action: PayloadAction<PartnerItem>) {
    yield console.log("--modifyData--");
  
    const partnerItemPayload = action.payload;

    // let fileUrl= action.payload.gymPhoto;
    // if(action.payload.gymPhoto.startsWith("data")){
    //   const partnerItmeFile : PartnerItem = yield select((state: RootState)=>
    //   state.partner.data.find((item)=>item.id ===partnerItemPayload.id)
    //   );
    //   const urlArr = partnerItmeFile.gymPhoto.split("/");
    //   const objectKey = urlArr[urlArr.length - 1];

    //   yield call(fileApi.remove, objectKey);
    //   const file: File = yield call(
    //     dataUrlToFile,
    //     partnerItemPayload.gymPhoto,
    //     partnerItemPayload.fileName,
    //     partnerItemPayload.fileType
    //   );

    //   const formFile = new FormData();
    //   formFile.set("file",file);

    //   const fileRes: AxiosResponse<string> = yield call(fileApi.upload, formFile);
    //   fileUrl = fileRes.data;
    // }

  
    const partnerItemRequest: PartnerItemRequest = {
      id:partnerItemPayload.id,
      gymName:partnerItemPayload.gymName,
      gymCoNum : partnerItemPayload.gymCoNum,
      gymLocateSi : partnerItemPayload.gymLocateSi,
      gymLocateGunGu : partnerItemPayload.gymLocateGunGu,
      gymAddress : partnerItemPayload.gymAddress,
      gymPhoneNum : partnerItemPayload.gymPhoneNum,
      gymTime : partnerItemPayload.gymTime,
      gymService :partnerItemPayload.gymService,
      // gymPhoto:partnerItemPayload.gymPhoto,
      // fileName:partnerItemPayload.fileName,
      // fileType:partnerItemPayload.fileType,
      gym1DayPrice : partnerItemPayload.gym1DayPrice,
      gym3DayPrice : partnerItemPayload.gym3DayPrice,
      gym7DayPrice : partnerItemPayload.gym7DayPrice,
      gymMonthPrice : partnerItemPayload.gymMonthPrice,
      gym3MonthPrice : partnerItemPayload.gym3MonthPrice,
      gym6MonthPrice : partnerItemPayload.gym6MonthPrice,
      gymYearPrice : partnerItemPayload.gymYearPrice,
      // gymTrainer : partnerItemPayload.gymTrainer
  
    };
  
    const result: AxiosResponse<PartnerItemResponse> = yield call(
      api.modify,
      partnerItemPayload.id,
      partnerItemRequest
    );
  
    const partnerItem: PartnerItem = {
      id:result.data.id,
      gymName:result.data.gymName,
      gymCoNum : result.data.gymCoNum,
      gymLocateSi : result.data.gymLocateSi,
      gymLocateGunGu : result.data.gymLocateGunGu,
      gymAddress : result.data.gymAddress,
      gymPhoneNum : result.data.gymPhoneNum,
      gymTime : result.data.gymTime,
      gymService :result.data.gymService,
      // gymPhoto:result.data.gymPhoto,
      // fileName: result.data.fileName,
      // fileType: result.data.fileType,
      gym1DayPrice : result.data.gym1DayPrice,
      gym3DayPrice : result.data.gym3DayPrice,
      gym7DayPrice : result.data.gym7DayPrice,
      gymMonthPrice : result.data.gymMonthPrice,
      gym3MonthPrice : result.data.gym3MonthPrice,
      gym6MonthPrice : result.data.gym6MonthPrice,
      gymYearPrice : result.data.gymYearPrice,
      // gymTrainer : result.data.gymTrainer
    };
  
    yield put(modifyPartner(partnerItem));
  
    yield put(initialCompleted());
  }

// saga action을 감지하는 부분
export default function* partnerSaga(){
  //동일한 타입의 액션은 모두 처리함
  yield takeEvery(requestAddPartner, addData);
  yield takeEvery(requestAddPartner, addMqData);

  yield takeLatest(requestFetchPartner, fetchData);
  yield takeEvery(requestFetchPartnerItem, fetchData);

  yield takeEvery(requestRemovePartner, removeData);

  yield takeEvery(requestModifyPartner, modifyData);
}