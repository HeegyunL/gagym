import Link from "next/link";
import { useRouter } from "next/router";
import React, { MutableRefObject, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import Layout from "../../../../components/layout";
import partnerSaga from "../../../../middleware/modules/partner";
import { AppDispatch, RootState } from "../../../../provider";
import { PartnerItemResponse } from "../../../api/partner";
import { requestModifyPartner } from "../../../../middleware/modules/partner";
import { GetServerSideProps } from "next";
import partner from "../../../../provider/modules/partner";
import { requestModifyTrainer } from "../../../../middleware/modules/trainer";
 
const PartnerEdit = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const id = router.query.id as string;

  const PartnerItem = useSelector((state:RootState)=>state.partner.data.find((item)=>item.id ===+id))
  const TrainerItem = useSelector((state:RootState)=> state.trainer.data.filter((item)=>item.gymCode === +id))
  
  const isModifyCompleted = useSelector((state:RootState)=> state.partner.isModifyCompleted);

    // 헬스장
    const gymNameRef=useRef() as MutableRefObject<HTMLInputElement>;
    const gymCoNumRef=useRef() as MutableRefObject<HTMLInputElement>;
    const gymLocateSiRef=useRef() as MutableRefObject<HTMLInputElement>;
    const gymLocateGunGuRef=useRef() as MutableRefObject<HTMLInputElement>;
    const gymAddressRef=useRef() as MutableRefObject<HTMLInputElement>;
    const gymPhoneNumRef=useRef() as MutableRefObject<HTMLInputElement>;
    const gymTimeRef=useRef() as MutableRefObject<HTMLInputElement>;
    const gymServiceRef=useRef() as MutableRefObject<HTMLInputElement>;
    const gym1DayPriceRef=useRef() as MutableRefObject<HTMLInputElement>;
    const gym3DayPriceRef=useRef() as MutableRefObject<HTMLInputElement>;
    const gym7DayPriceRef=useRef() as MutableRefObject<HTMLInputElement>;
    const gymMonthPriceRef=useRef() as MutableRefObject<HTMLInputElement>;
    const gym3MonthPriceRef=useRef() as MutableRefObject<HTMLInputElement>;
    const gym6MonthPriceRef=useRef() as MutableRefObject<HTMLInputElement>;
    const gymYearPriceRef=useRef() as MutableRefObject<HTMLInputElement>;
    



    const handleSaveClick =()=>{
      if(PartnerItem){
        const item ={...PartnerItem};
        item.gymName = gymNameRef.current?.value;
        item.gymCoNum= gymCoNumRef.current?.value;
        item.gymLocateSi =gymLocateSiRef.current?.value;
        item.gymLocateGunGu = gymLocateGunGuRef.current?.value;
        item.gymAddress = gymAddressRef.current?.value;
        item.gymPhoneNum=gymPhoneNumRef.current?.value;
        item.gymService=gymServiceRef.current?.value;
        item.gymTime=gymTimeRef.current?.value;
        item.gym1DayPrice=gym1DayPriceRef.current?.value;
        item.gym3DayPrice=gym1DayPriceRef.current?.value;
        item.gym7DayPrice=gym1DayPriceRef.current?.value;
        item.gymMonthPrice=gymMonthPriceRef.current?.value;
        item.gym3MonthPrice=gym3MonthPriceRef.current?.value;
        item.gym6MonthPrice=gym6MonthPriceRef.current?.value;
        item.gymYearPrice=gymYearPriceRef.current?.value;
        
        dispatch(requestModifyPartner(item));
        router.push("/partner/information/list");
      }
    }


    const [modalOpen, setModalOpen] = React.useState(false);
    // 강사
    const trainerNameRef=useRef() as MutableRefObject<HTMLInputElement>;
    const trainerIntroRef=useRef() as MutableRefObject<HTMLInputElement>;
    const trainerPhotoUrlRef=useRef<HTMLInputElement>(null);

    const pt1TimePriceRef=useRef() as MutableRefObject<HTMLInputElement>;
    const pt10TimePriceRef=useRef() as MutableRefObject<HTMLInputElement>;
    const pt30TimePriceRef=useRef() as MutableRefObject<HTMLInputElement>;

    const yoga1TimePriceRef=useRef() as MutableRefObject<HTMLInputElement>;
    const yoga10TimePriceRef=useRef() as MutableRefObject<HTMLInputElement>;
    const yoga30TimePriceRef=useRef() as MutableRefObject<HTMLInputElement>;

    const pilates1TimePriceRef=useRef() as MutableRefObject<HTMLInputElement>;
    const pilates10TimePriceRef=useRef() as MutableRefObject<HTMLInputElement>;
    const pilates30TimePriceRef=useRef() as MutableRefObject<HTMLInputElement>;
    
    // const trainerSaveClick =()=>{
    //   if(TrainerItem){
    //     const item ={...TrainerItem};
    //     item.trainerName = trainerNameRef.current?.value;
    //     item.trainerIntro= trainerIntroRef.current?.value;
    //     item.pt1TimePrice =pt1TimePriceRef.current?.value;
    //     item.pt10TimePrice = pt10TimePriceRef.current?.value;
    //     item.pt30TimePrice = pt30TimePriceRef.current?.value;
    //     item.yoga1TimePrice=yoga1TimePriceRef.current?.value;
    //     item.yoga10TimePrice=yoga10TimePriceRef.current?.value;
    //     item.yoga30TimePrice=yoga30TimePriceRef.current?.value;
    //     item.pilates1TimePrice=pilates1TimePriceRef.current?.value;
    //     item.pilates10TimePrice=pilates10TimePriceRef.current?.value;
    //     item.pilates30TimePrice=pilates30TimePriceRef.current?.value;
        
    //     dispatch(requestModifyTrainer(item));
    //     router.push("/partner/information/list");
    //   }
    // }

    useEffect(()=>{
      
      isModifyCompleted &&router.push(`/partner/information/list/`);
    },[isModifyCompleted,router,]);

    
  return(
    <Layout>
      {PartnerItem &&(
      <body 
        >
        <div className="mx-auto mt-5" style={{width:"850px"}} >
          <h4 className="mt-5 text-center"> 헬스장 정보</h4>
          {/* 헬스장 명 */}
          <div className="d-flex mt-5">
            <h4 
            className="col me-3 text-nowrap text-center"
            style ={{width : "200px"}}
            >헬스장 명</h4> 
            <input 
            defaultValue={PartnerItem?.gymName} 
            ref={gymNameRef} 
            style ={{width : "400px", 
            height:"45px", borderBlockEndWidth:"4px"}}>
            </input>
          </div> 
          {/* 사업자 번호 */}
          <div className="d-flex mt-3">
            <h4 
            className="col me-3 text-nowrap text-center"
            style ={{width : "200px"}}
            >사업자 번호</h4> 
            <input ref={gymCoNumRef} style ={{width : "400px", height:"45px", borderBlockEndWidth:"4px"}} defaultValue={PartnerItem?.gymCoNum}></input>
          </div> 
          {/* 지역 */}
          <div className="d-flex mt-3">
            <h4 
            className="col me-3 text-nowrap text-center"
            style ={{width : "200px"}}
            >지역</h4> 
            <div className="input-group"
                style ={{width : "400px", height:"45px", borderBlockEndWidth:"4px"}}>
                    <input ref={gymLocateSiRef} defaultValue={PartnerItem?.gymLocateSi} type="text" aria-label="First name"  className="form-control" style ={{borderBlockEndWidth:"4px"}}/>
                    <input ref={gymLocateGunGuRef} defaultValue={PartnerItem?.gymLocateGunGu} type="text" aria-label="Last name" className="form-control" style ={{borderBlockEndWidth:"4px"}}/>
                </div>   
          </div> 
          {/* 주소 */}
          <div className="d-flex mt-3">
            <h4 
            className="col me-3 text-nowrap text-center"
            style ={{width : "200px"}}
            >주소</h4> 
            <input ref={gymAddressRef}style ={{width : "400px", height:"45px", borderBlockEndWidth:"4px"}} defaultValue={PartnerItem?.gymAddress}></input>
          </div> 
          {/* 전화번호 */}
          <div className="d-flex mt-3">
            <h4 
            className="col me-3 text-nowrap text-center"
            style ={{width : "200px"}}
            >전화 번호</h4> 
            <input ref={gymPhoneNumRef} style ={{width : "400px", height:"45px", borderBlockEndWidth:"4px"}} defaultValue={PartnerItem?.gymPhoneNum}></input>
          </div> 
          {/* 운영시간 */}
          <div className="d-flex mt-3">
            <h4 
            className="col me-3 text-nowrap text-center"
            style ={{width : "200px"}}
            >운영시간</h4> 
            <input ref={gymTimeRef} style ={{width : "400px", height:"45px", borderBlockEndWidth:"4px"}} defaultValue={PartnerItem?.gymTime}></input>
          </div> 
          {/* 강사 소개 */}
          <div className="mt-3 d-flex" >
            <h4 
            className="col me-3 text-nowrap text-center"
            style ={{width : "200px"}}
            >강사 소개</h4> 
            <p style ={{width : "400px", height:"45px", borderBlockEndWidth:"4px"}} className="d-flex">
            {TrainerItem.map((item)=>(
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
                  </div>
                  <ModalBody>
                    <div className="d-flex">
                      <p>이름 :</p>
                      <input
                      ref={trainerNameRef}
                      style = {{width : "80%", height:"30px", borderBlockEndWidth:"4px" , marginLeft:"2.3rem"}}
                      defaultValue={item.trainerName}></input>
                    </div>
                    <div className="d-flex">
                      <p>한줄 소개 :</p>
                      <input 
                      ref={trainerIntroRef}
                      className="ms-1"
                      style = {{width : "80%", height:"30px", borderBlockEndWidth:"4px"}}
                      defaultValue={item.trainerIntro}></input>
                    </div>
                    <div className="d-flex">
                      <table className="table" >
                        <thead >
                          <tr >
                            <th className="text-center me-3" scope="col"><h3></h3></th>
                            <th className="text-center" scope="col">1Time</th>
                            <th className="text-center" scope="col">10Time</th>
                            <th className="text-center" scope="col">30Time</th>
                          </tr>
                        </thead>
                        <tbody >
                          <tr className="mt-5">
                            <td className="text-center"><h5>PT</h5></td>
                            <td>
                              <input 
                              ref={pt1TimePriceRef}
                              style = {{width : "80%", height:"30px", borderBlockEndWidth:"4px"}}
                              className="text-center" defaultValue={item.pt1TimePrice} ></input>
                            </td>
                            <td>
                             <input
                             ref={pt10TimePriceRef}
                             style = {{width : "80%", height:"30px", borderBlockEndWidth:"4px"}}
                             className="text-center" defaultValue={item.pt10TimePrice}></input>
                            </td>
                            <td>
                              <input 
                              ref={pt30TimePriceRef}
                              style = {{width : "80%", height:"30px", borderBlockEndWidth:"4px"}}
                              className="text-center" defaultValue={item.pt30TimePrice}></input>
                            </td>
                          </tr>
                          <tr className="mt-5">
                            <td className="text-center"><h5>요가</h5></td>
                            <td>
                              <input 
                              ref={yoga1TimePriceRef}
                              style = {{width : "80%", height:"30px", borderBlockEndWidth:"4px"}}
                              className="text-center" defaultValue={item.pt1TimePrice}></input>
                            </td>
                            <td>
                             <input
                             ref={yoga10TimePriceRef}
                             style = {{width : "80%", height:"30px", borderBlockEndWidth:"4px"}}
                             className="text-center" defaultValue={item.pt10TimePrice}></input>
                            </td>
                            <td>
                              <input 
                              ref={yoga30TimePriceRef}
                              style = {{width : "80%", height:"30px", borderBlockEndWidth:"4px"}}
                              className="text-center" defaultValue={item.pt30TimePrice}></input>
                            </td>
                          </tr>
                          <tr className="mt-5">
                            <td className="text-center"><h5>필라테스</h5></td>
                            <td>
                              <input 
                              ref={pilates1TimePriceRef}
                              style = {{width : "80%", height:"30px", borderBlockEndWidth:"4px"}}
                              className="text-center" defaultValue={item.pt1TimePrice}></input>
                            </td>
                            <td>
                             <input 
                             ref={pilates10TimePriceRef}
                             style = {{width : "80%", height:"30px", borderBlockEndWidth:"4px"}}
                             className="text-center" defaultValue={item.pt10TimePrice}></input>
                            </td>
                            <td>
                              <input 
                              ref={pilates30TimePriceRef}
                              style = {{width : "80%", height:"30px", borderBlockEndWidth:"4px"}}
                              className="text-center" defaultValue={item.pt30TimePrice}></input>
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
              <table className=" table " >
                <thead>
                  <tr>
                    <th className="text-center me-3" scope="col"><h3> </h3></th>
                    <th className="text-center" scope="col">1Day</th>
                    <th className="text-center" scope="col">3Day</th>
                    <th className="text-center" scope="col">7Day</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="">
                    <th className="text-center" scope="row"><h5>헬스장</h5></th>
                    <td>
                        <input ref={gym1DayPriceRef}className="text-center" defaultValue={PartnerItem?.gym1DayPrice}></input>
                    </td>
                    <td>
                    <input ref={gym3DayPriceRef} className="text-center" defaultValue={PartnerItem?.gym3DayPrice}></input>
                    </td>
                    <td>
                    <input ref={gym7DayPriceRef}className="text-center" defaultValue={PartnerItem?.gym7DayPrice}></input>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 ms-5 d-flex">
              <table className="ms-3 table"  >
                <thead>
                  <tr>
                    <th className="text-center"><h3> </h3></th>
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
                    <input ref={gymMonthPriceRef} className="text-center" defaultValue={PartnerItem?.gymMonthPrice}></input>
                    </td>
                    <td>
                    <input ref={gym3MonthPriceRef}className="text-center" defaultValue={PartnerItem?.gym3MonthPrice}></input>
                    </td>
                    <td>
                    <input ref={gym6MonthPriceRef}className="text-center" defaultValue={PartnerItem?.gym6MonthPrice}></input>
                    </td>
                    <td>
                    <input ref={gymYearPriceRef}className="text-center" defaultValue={PartnerItem?.gymYearPrice}></input>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* 버튼 */}
          <div className="d-grid mt-3  d-md-flex justify-content-end">
            <button className="btn btn-primary mb-3" type="button"  
            onClick={() => {
              handleSaveClick();
            }}>저장</button>
            <button className="btn btn-primary ms-3 mb-3" type="button">목록</button>
          </div>
        </div>
      </body>
      )}
    </Layout>
        )
}


export default PartnerEdit;

