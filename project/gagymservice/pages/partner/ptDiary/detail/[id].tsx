
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../../../components/layout"
import { requestFetchDiarys } from "../../../../middleware/modules/diary";
import { AppDispatch, RootState } from "../../../../provider";

const PTdetail = ()=>{

    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const id = router.query.id as string;

    let diaryItem = useSelector((state : RootState)=>state.diary.data.find((item)=>item.id === +id)) 
    let diary = useSelector((state : RootState)=>state.diary) 

    useEffect(() => {
        dispatch(
          requestFetchDiarys()
        );
    }, [dispatch, diary.isFetched]);

    return(
        <Layout>
            {diaryItem &&(
            <body>
                <div className="mx-auto mt-5" style={{width:"850px"}}>
                <h4 className="mt-5 text-center"> PT 일지</h4>
                    <div className="d-flex mt-5">
                        <h4 
                        className="col me-3 text-nowrap text-center"
                        style ={{width : "200px"}}
                        >이름</h4> 
                        <p style ={{width : "400px", height:"45px", borderBlockEndWidth:"4px"}}> {diaryItem.memberName}</p>
                    </div> 
                    <div className="d-flex mt-3">
                        <h4 
                        className="col me-3 text-nowrap text-center"
                        style ={{width : "200px"}}
                        >아침 식단</h4> 
                       <p style ={{width : "400px", height:"45px", borderBlockEndWidth:"4px"}}>{diaryItem.diaryMorning}</p>
                    </div> 
                    <div className="d-flex mt-3">
                        <h4 
                        className="col me-3 text-nowrap text-center"
                        style ={{width : "200px"}}
                        >점심 식단</h4> 
                        <p style ={{width : "400px", height:"45px", borderBlockEndWidth:"4px"}}>{diaryItem.diaryLunch}</p>
                    </div> 
                    <div className="d-flex mt-3">
                        <h4 
                        className="col me-3 text-nowrap text-center"
                        style ={{width : "200px"}}
                        >저녁 식단</h4> 
                        <p style ={{width : "400px", height:"45px", borderBlockEndWidth:"4px"}}>{diaryItem.diaryDinner}</p>
                    </div> 
                    <div className="d-flex mt-3">
                        <h4 
                        className="col me-3 text-nowrap text-center"
                        style ={{width : "200px"}}
                        >운동 내역</h4> 
                        <p style ={{width : "400px", height:"45px", borderBlockEndWidth:"4px"}}> {diaryItem.diaryRoutine}</p>
                    </div> 
                    <div className="d-flex mt-3">
                        <h4 
                        className="col me-3 text-nowrap text-center"
                        style ={{width : "200px"}}
                        >문의 사항</h4> 
                        <p style ={{width : "400px", height:"45px", borderBlockEndWidth:"4px"}}> {diaryItem.diaryRequest}</p>
                    </div> 
                    <div className="d-flex mt-3">
                        <h4 
                        className="col me-3 text-nowrap text-center"
                        style ={{width : "200px"}}
                        >피드백</h4> 
                        <p style ={{width : "400px", height:"45px", borderBlockEndWidth:"4px"}}>{diaryItem.trainerFeedback}</p>
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