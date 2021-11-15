import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../../../components/layout"
import { AppDispatch, RootState } from "../../../../provider";
import reservation from "../../../../provider/modules/reservation";

const PTdetail = ()=>{

    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const id = router.query.id as string;
    
    let reservationItem = useSelector((state : RootState)=>state.reservation.data.find((item)=>item.id === +id)) 


    return(
        <Layout>
            {reservationItem&&(
            <body>
                <div className="mx-auto mt-5" style={{width:"850px"}}>
                <h4 className="mt-5 text-center"> 예약 내역</h4>
                    <div className="d-flex mt-5">
                        <h4 
                        className="col me-3 text-nowrap text-center"
                        style ={{width : "200px"}}
                        >헬스장명</h4> 
                        <p style ={{width : "400px", height:"45px", borderBlockEndWidth:"4px"}}> {reservationItem.gymName}</p>
                    </div> 
                    <div className="d-flex mt-3">
                        <h4 
                        className="col me-3 text-nowrap text-center"
                        style ={{width : "200px"}}
                        >이름</h4> 
                       <p style ={{width : "400px", height:"45px", borderBlockEndWidth:"4px"}}> {reservationItem.memberName}</p>
                    </div> 
                    <div className="d-flex mt-3">
                        <h4 
                        className="col me-3 text-nowrap text-center"
                        style ={{width : "200px"}}
                        >연락처</h4> 
                        <p style ={{width : "400px", height:"45px", borderBlockEndWidth:"4px"}}> {reservationItem.memberPhoneNum}</p>
                    </div> 
                    <div className="d-flex mt-3">
                        <h4 
                        className="col me-3 text-nowrap text-center"
                        style ={{width : "200px"}}
                        >희망 이용권</h4> 
                        <p style ={{width : "400px", height:"45px", borderBlockEndWidth:"4px"}}> {reservationItem.reservationService}</p>
                    </div> 
                    <div className="d-flex mt-3">
                        <h4 
                        className="col me-3 text-nowrap text-center"
                        style ={{width : "200px"}}
                        >희망 강사</h4> 
                        <p style ={{width : "400px", height:"45px", borderBlockEndWidth:"4px"}}>{reservationItem.reservationTeacher}</p>
                    </div> 
                    <div className="d-flex mt-3">
                        <h4 
                        className="col me-3 text-nowrap text-center"
                        style ={{width : "200px"}}
                        >문의 사항</h4> 
                        <p style ={{width : "400px", height:"45px", borderBlockEndWidth:"4px"}}> {reservationItem.request}</p>
                    </div> 
                    <div className="d-grid mt-3  d-md-flex justify-content-between">
                    <button className="btn btn-primary mb-3" type="button">응답</button>
                    <button className="btn btn-primary mb-3" type="button">목록</button>
                </div>
                </div>
            </body>
            )}
        </Layout>
    )
}
export default PTdetail;