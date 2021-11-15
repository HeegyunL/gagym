import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../../components/layout"
import { requestFetchPartner } from "../../../middleware/modules/partner";
import { AppDispatch, RootState } from "../../../provider";


const list=()=>{
  const partner = useSelector((state:RootState)=> state.partner);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!partner.isFetched) {
      dispatch(
        requestFetchPartner()
      );
    }
  }, [dispatch, partner.isFetched]);

  
    return(
        <Layout>
            <div>
            <body >
           <div className="mx-auto mt-5" style={{width:"850px"}}>
        <h4 className=" float-start">
             헬스장 정보
          </h4>
          <button className="btn btn-primary float-end btn-sm">
            상세 보기
          </button>
        <table className="table mx-auto" >
          <thead>
            <tr>
              <th scope="col">헬스장명</th>
              <th scope="col">지역</th>
              <th scope="col">전화번호</th>
              <th scope="col">운영 시간</th>
            </tr>
          </thead>
          <tbody className="tbody">
              {partner.data.map((item)=>(
            <tr onClick={()=>{router.push(`/partner/information/detail/${item.id}`)}}>
              <td>{item.gymName}</td>
              <td>{item.gymLocateSi}{item.gymLocateGunGu}</td>
              <td>{item.gymPhoneNum}</td>
              <td>{item.gymTime}</td>
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
export default list;