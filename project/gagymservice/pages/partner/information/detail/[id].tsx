
import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import Layout from "../../../../components/layout";
import { requestFetchPartner, requestRemovePartner } from "../../../../middleware/modules/partner";
import { requestFetchTrainer } from "../../../../middleware/modules/trainer";
import { AppDispatch, RootState, store } from "../../../../provider";
import { removePartner } from "../../../../provider/modules/partner";


  const PartnerDetail = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    
    const id = router.query.id as string;
    console.log(id)
    
    let partners = useSelector((state : RootState) => 
    state.partner.data.find((item) => item.id === +id ));
   
    const isRemoveCompleted = useSelector(
      (state:RootState)=> state.partner.isRemoveCompleted
      );
      
    
    const [modalOpen, setModalOpen] = React.useState(false);
    const trainer = useSelector((state:RootState)=>state.trainer)

    useEffect(() => {
        dispatch(
          requestFetchTrainer()
        );
      isRemoveCompleted&&router.push(`/partner/information/list`)
    }, [dispatch, trainer.isFetched, isRemoveCompleted,router]);

    
    const handleDeleteClick = () => {
      dispatch(requestRemovePartner(+id));
      router.push(`/partner/information/list`)
    }
    
    const trainers = trainer.data.filter((item)=>item.gymCode == partners?.id);
    
  return(
    <Layout>
      <body>
      {partners &&(
        <div className="mx-auto mt-5" style={{width:"850px"}}>
          <h4 className="mt-5 text-center"> 헬스장 정보</h4>
          {/* 헬스장 명 */}
          <div className="d-flex mt-5">
            <h4 
            className="col me-3 text-nowrap text-center"
            style ={{width : "200px"}}
            >헬스장 명</h4> 
            <p style ={{width : "400px", height:"45px", borderBlockEndWidth:"4px"}}> {partners.gymName}</p>
          </div> 
          {/* 사업자 번호 */}
          <div className="d-flex mt-3">
            <h4 
            className="col me-3 text-nowrap text-center"
            style ={{width : "200px"}}
            >사업자 번호</h4> 
            <p style ={{width : "400px", height:"45px", borderBlockEndWidth:"4px"}}>{partners.gymCoNum}</p>
          </div> 
          {/* 지역 */}
          <div className="d-flex mt-3">
            <h4 
            className="col me-3 text-nowrap text-center"
            style ={{width : "200px"}}
            >지역</h4> 
            <p style ={{width : "400px", height:"45px", borderBlockEndWidth:"4px"}}>
              {partners.gymLocateSi} {partners.gymLocateGunGu}</p>
          </div> 
          {/* 주소 */}
          <div className="d-flex mt-3">
            <h4 
            className="col me-3 text-nowrap text-center"
            style ={{width : "200px"}}
            >주소</h4> 
            <p style ={{width : "400px", height:"45px", borderBlockEndWidth:"4px"}}>{partners.gymAddress}</p>
          </div> 
          {/* 전화번호 */}
          <div className="d-flex mt-3">
            <h4 
            className="col me-3 text-nowrap text-center"
            style ={{width : "200px"}}
            >전화 번호</h4> 
            <p style ={{width : "400px", height:"45px", borderBlockEndWidth:"4px"}}>{partners.gymPhoneNum}</p>
          </div> 
          {/* 운영시간 */}
          <div className="d-flex mt-3">
            <h4 
            className="col me-3 text-nowrap text-center"
            style ={{width : "200px"}}
            >운영시간</h4> 
            <p style ={{width : "400px", height:"45px", borderBlockEndWidth:"4px"}}>{partners.gymTime}</p>
          </div> 
          {/* 강사 소개 */}
          {/* {trainers&&( */}
          <div className="mt-3 d-flex" >
            <h4 
            className="col me-3 text-nowrap text-center"
            style ={{width : "200px"}}
            >강사 소개</h4> 
            <p style ={{width : "400px", height:"45px", borderBlockEndWidth:"4px"}} className="d-flex">
            {trainers.map((item, index)=>(
              <div className="d-flex ms-2"> 
                <Button
                  color="primary"
                  type="button"
                  onClick={() => setModalOpen(!modalOpen)}
                >
                 {item.trainerName}
                </Button>
                <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
                  <div className=" modal-header">
                    <h5 className=" modal-title" id="exampleModalLabel">
                      강사 소개
                    </h5>
                    <button
                      aria-label="Close"
                      className=" close"
                      type="button"
                      onClick={() => setModalOpen(!modalOpen)}
                    >
                      <span aria-hidden={true}>×</span>
                    </button>
                  </div>
                  <ModalBody>
                    <div className="">
                      <div className="d-flex">
                        <p>이름 :</p>
                        <p>{item.trainerName}</p>
                      </div>
                      <div className="d-flex">
                        <p>한줄 소개 :</p>
                        <p>{item.trainerIntro}</p>
                      </div>
                      <div className="d-flex">
                      <img style={{ width: "50%" }} src={item.trainerPhotoUrl} alt="TrainerPhoto" />
                      </div>
                    </div>
                    <div className="d-flex">
                      <table className="table">
                        <thead>
                          <tr>
                            <th className="text-center me-3" scope="col"><h3>-</h3></th>
                            <th className="text-center" scope="col">1Time</th>
                            <th className="text-center" scope="col">10Time</th>
                            <th className="text-center" scope="col">30Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="mt-5">
                            <td className="text-center"><h5>PT</h5></td>
                            <td>
                              <p className="text-center" >{item.pt1TimePrice}</p>
                            </td>
                            <td>
                             <p className="text-center" >{item.pt10TimePrice}</p>
                            </td>
                            <td>
                              <p className="text-center" >{item.pt30TimePrice}</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="secondary"
                      type="button"
                      onClick={() => setModalOpen(!modalOpen)}
                    >
                      Close
                    </Button>
                    <Button color="primary" type="button">
                      Save changes
                    </Button>
                  </ModalFooter>
                </Modal>
              </div>
              
              ))}
            </p>
            </div>
          {/* 가격 */}
          <div>
            <h4 
            className="col text-nowrap text-center"
            style ={{width : "434px"}}
            >가 격</h4> 
            <div className="mt-3 ms-5 d-flex">
              <table className=" table ms-5 " style={{width:"780px"}}>
                <thead>
                  <tr>
                    <th className="text-center me-3" scope="col"><h3></h3></th>
                    <th className="text-center" scope="col">1Day</th>
                    <th className="text-center" scope="col">3Day</th>
                    <th className="text-center" scope="col">7Day</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="">
                    <th className="text-center" scope="row"><h5>헬스장</h5></th>
                    <td>
                        <p className="text-center" >{partners.gym1DayPrice}</p>
                    </td>
                    <td>
                    <p className="text-center" >{partners.gym3DayPrice}</p>
                    </td>
                    <td>
                    <p className="text-center" >{partners.gym7DayPrice}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 ms-5 d-flex">
            <table className=" table ms-5 " style={{width:"780px"}}>
                <thead>
                  <tr>
                    <th className="text-center"><h3></h3></th>
                    <th className="text-center">1달</th>
                    <th className="text-center">3달</th>
                    <th className="text-center">6달</th>
                    <th className="text-center">12달</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="justify-content-between">
                    <td className="text-center text-nowrap"><h5>헬스장</h5></td>
                    <td>
                        <p className="text-center" >{partners.gymMonthPrice}</p>
                    </td>
                    <td>
                    <p className="text-center" >{partners.gym3MonthPrice}</p>
                    </td>
                    <td>
                    <p className="text-center" >{partners.gym6MonthPrice}</p>
                    </td>
                    <td>
                    <p className="text-center" >{partners.gymYearPrice}</p>
                    </td>
                  </tr>
                  
                </tbody>
              </table>
            </div>
          </div>
          {/* 버튼 */}
          <div className="d-grid mt-3  d-md-flex justify-content-end">
            <button className="btn btn-primary mb-3 " type="button" onClick={()=>{router.push(`/partner/information/edit/${partners?.id}`)}}>수정</button>
            <button className="btn btn-primary mb-3 " type="button" onClick={() => {
                handleDeleteClick();
              }}>삭제</button>
            <button className="btn btn-primary ms-3 mb-3" type="button">목록</button>
          </div>
        </div>
          )}
      </body>
    </Layout>
       ) 
      }
     
export default PartnerDetail;

