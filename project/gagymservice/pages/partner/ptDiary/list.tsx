import NavItem from "@restart/ui/esm/NavItem";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../../components/layout";
import { requestFetchDiarys, requestFetchPagingDiarys } from "../../../middleware/modules/diary";
import { requestFetchPartnerItem } from "../../../middleware/modules/partner";
import { AppDispatch, RootState } from "../../../provider";
import { DiaryItemResponse } from "../../api/diary";

const getTimeString = (unixtime: number) => {
  const dateTime = new Date(unixtime);
  var month = ("0" + (1 + dateTime.getMonth())).slice(-2);
  var day = ("0" + dateTime.getDate()).slice(-2);
  return month + "/" + day;
};

const List= ()=>{
  const diary = useSelector((state:RootState)=> state.diary);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!diary.isFetched) {
      dispatch(
        requestFetchPagingDiarys({
          page: 0,
          size: diary.pageSize,
        })
      );
    }
  }, [dispatch, diary.isFetched, diary.pageSize]);

  const handlePageChanged = (page: number) => {
    console.log("--page: " + page);
    dispatch(
      requestFetchPagingDiarys({
        page,
        size: diary.pageSize,
      })
    );
  };

  const handlePageSizeChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.currentTarget.value);
    dispatch(
      requestFetchPagingDiarys({
        page: diary.page,
        size: +e.currentTarget.value,
      })
    );
  };

    return(
        <Layout>
            <div>
            <body >
           <div className="mx-auto mt-5" style={{width:"850px"}}>
          <h4 className=" float-start">
              PT 일지
            </h4>
            <div className="d-flex justify-content-end align-items-center">
                {/*-----------------*/}
                {/*
                <button
                  className="btn btn-secondary btn-sm"
                  style={{ width: "100px;" }}
                  onClick={() => {
                    dispatch(requestFetchDiarys());
                  }}
                >
                  <i className="bi bi-arrow-clockwise"></i>
                </button>
                */}
                <select
                  className="form-select form-select-sm mx-1 p-1"
                  style={{ width: "55px", height: "30px" }}
                  onChange={(e) => {
                    handlePageSizeChanged(e);
                  }}
                >
                  {[3, 5, 10, 20].map((size) => (
                    <option value={size} selected={diary.pageSize === size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
        <table className="table mx-auto" >
          <thead>
            <tr>
              <th scope="col">일자</th>
              <th scope="col">식단내용</th>
              <th scope="col">운동내용</th>
              <th scope="col">문의사항</th>
              <th scope="col">담당강사</th>
              <th scope="col">강사피드백</th>
            </tr>
          </thead>
          <tbody>
          {diary.data.map((item)=>(
            <tr onClick={()=>{router.push(`/partner/ptDiary/detail/${item.id}`)}}>
              <td>{item.diaryCreateTime}</td>
              <td>{item.memberName}</td>
              <td>{item.diaryMorning}</td>
              <td>{item.diaryRoutine}</td>
              <td >{item.diaryRequest}</td>
              <td >{item.trainerFeedback}</td>
            </tr>
          ))}
          </tbody>
        </table>
        </div>
        </body>
        </div>
        </Layout>
        )
}


export default List;