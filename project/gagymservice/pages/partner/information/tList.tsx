import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../../components/layout"
import { requestFetchTrainer } from "../../../middleware/modules/trainer";
import { AppDispatch, RootState } from "../../../provider";


const tList=()=>{
  const trainer = useSelector((state:RootState)=> state.trainer);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
      dispatch(
        requestFetchTrainer()
      );
    
  }, [dispatch, trainer.isFetched]);

  
    return(
        <Layout>
            <div>
            <body >
           <div className="mx-auto mt-5" style={{width:"850px"}}>
        <h4 className=" float-start">
             강사 정보
          </h4>
          <button className="btn btn-primary float-end btn-sm">
            상세 보기
          </button>
        <table className="table mx-auto" >
          <thead>
            <tr>
              <th scope="col">헬스장코드</th>
              <th scope="col">이름</th>
              <th scope="col">한줄소개</th>
            </tr>
          </thead>
          <tbody className="tbody">
              {trainer.data.map((item)=>(
            <tr onClick={()=>{router.push(`/partner/information/detail/${item.id}`)}}>
              <td>{item.gymCode}</td>
              <td>{item.trainerName}</td>
              <td>{item.trainerIntro}</td>
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
export default tList;