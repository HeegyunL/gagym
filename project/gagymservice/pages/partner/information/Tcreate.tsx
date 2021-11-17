import { MutableRefObject, useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { AppDispatch, RootState } from "../../../provider";
import { TrainerItem } from "../../../provider/modules/trainer";
import { requestAddTrainer } from "../../../middleware/modules/trainer";
import { Image } from "react-bootstrap";
import { requestFetchPartner } from "../../../middleware/modules/partner";

import React from "react";
import Layout from "../../../components/layout";
const Tcreate = () => {
  const gymCodeRef = useRef() as MutableRefObject<HTMLDivElement>;
  const trainerNameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const trainerIntroRef = useRef() as MutableRefObject<HTMLInputElement>;
  // const trainerPhotoUrlRef=useRef<HTMLInputElement>(null);
  const trainerPhotoUrlRef = useRef() as MutableRefObject<HTMLInputElement>;

  const pt1TimePriceRef = useRef() as MutableRefObject<HTMLInputElement>;
  const pt10TimePriceRef = useRef() as MutableRefObject<HTMLInputElement>;
  const pt30TimePriceRef = useRef() as MutableRefObject<HTMLInputElement>;

  const yoga1TimePriceRef = useRef() as MutableRefObject<HTMLInputElement>;
  const yoga10TimePriceRef = useRef() as MutableRefObject<HTMLInputElement>;
  const yoga30TimePriceRef = useRef() as MutableRefObject<HTMLInputElement>;

  const pilates1TimePriceRef = useRef() as MutableRefObject<HTMLInputElement>;
  const pilates10TimePriceRef = useRef() as MutableRefObject<HTMLInputElement>;
  const pilates30TimePriceRef = useRef() as MutableRefObject<HTMLInputElement>;

  const partnerData = useSelector((state: RootState) => state.partner);
  const trainerData = useSelector((state: RootState) => state.trainer.data);
  const isAddCompleted = useSelector(
    (state: RootState) => state.trainer.isAddCompleted
  );
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  // const id = router.query.id as string;

  useEffect(() => {
    if (!partnerData.isFetched) {
      dispatch(requestFetchPartner());
    }
    console.log("--isAddCompleted 변경: " + isAddCompleted);
    isAddCompleted &&
      // router.push(`/partner/information/detail/${partnerData.data.find((item)=>item.id)}`);
      router.push(`/partner/information/list`);
  }, [isAddCompleted, router, dispatch]);

  const [url, setUrl] = useState<string | undefined>("");

  const changeFile = () => {
    console.log("changed");

    if (trainerPhotoUrlRef.current?.files?.length) {
      const imageFile = trainerPhotoUrlRef.current.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        setUrl(reader.result?.toString());
      };
      reader.readAsDataURL(imageFile);
    }
  };
  //   let checked = document.querySelectorAll("input[type='checkbox']:checked");

  const handleAddClick = () => {
    if (trainerPhotoUrlRef.current?.files?.length) {
      const imageFile = trainerPhotoUrlRef.current.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const radio = gymCodeRef.current.querySelector(
          "input[type=radio]:checked"
        ) as HTMLInputElement;
        console.log("gymcode");
        console.log(radio.value);
        const item: TrainerItem = {
          id: trainerData.length ? trainerData[0].id + 1 : 1,
          gymCode: Number(radio.value),
          trainerName: trainerNameRef.current?.value,
          trainerIntro: trainerIntroRef.current?.value,
          // trainerPhotoUrl:reader.result ? reader.result.toString() : "",
          trainerPhotoUrl: trainerPhotoUrlRef.current?.value,
          pt1TimePrice: pt1TimePriceRef.current?.value,
          pt10TimePrice: pt10TimePriceRef.current?.value,
          pt30TimePrice: pt30TimePriceRef.current?.value,
          yoga1TimePrice: yoga1TimePriceRef.current?.value,
          yoga10TimePrice: yoga10TimePriceRef.current?.value,
          yoga30TimePrice: yoga30TimePriceRef.current?.value,
          pilates1TimePrice: pilates1TimePriceRef.current?.value,
          pilates10TimePrice: pilates10TimePriceRef.current?.value,
          pilates30TimePrice: pilates30TimePriceRef.current?.value,
        };
        dispatch(requestAddTrainer(item));
        // router.push(`/partner/information/tList`)
      };
      reader.readAsDataURL(imageFile);
    }
  };

  return (
    <Layout>
      <body>
        <div className="mx-auto" style={{ width: "850px" }}>
          <h4 className="mt-5 text-center"> 등록 하기</h4>
          {/* 헬스장 이름 */}
          <div className="d-flex mt-4">
            <h4
              className=" mt-4 text-nowrap text-center"
              style={{ width: "239px" }}
            >
              헬스장 이름
            </h4>
            <div
              className="btn-group mt-4 ms-2"
              role="group"
              aria-label="Basic checkbox toggle button group"
              style={{ width: "400px", height: "2rem" }}
              ref={gymCodeRef}
            >
              {partnerData.data.map((item, index) => (
                <div className="ms-2" key={`partner-item-${index}`}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gymName"
                      id={item.gymName}
                      value={item.id}
                    />
                    <label className="form-check-label" htmlFor={item.gymName}>
                      {item.gymName}
                    </label>
                  </div>
                </div>
              ))}
            </div>
            {/* <div style={{width:"70%"}}>
                       <input ref={gymNameRef} style ={{width : "400px", height:"45px", borderBlockEndWidth:"4px"}}></input>
                    </div> */}
          </div>
          {/* 강사 이름 */}
          <div className="d-flex mt-4">
            <h4 className="col me-3 text-nowrap text-center">강사 이름</h4>
            <div style={{ width: "70%" }}>
              <input
                ref={trainerNameRef}
                style={{
                  width: "400px",
                  height: "45px",
                  borderBlockEndWidth: "4px",
                }}
              ></input>
            </div>
          </div>
          {/* 한줄 소개 */}
          <div className="d-flex mt-4">
            <h4 className="col me-3 text-nowrap text-center">한줄 소개</h4>
            <div style={{ width: "70%" }}>
              <input
                ref={trainerIntroRef}
                style={{
                  width: "400px",
                  height: "45px",
                  borderBlockEndWidth: "4px",
                }}
              ></input>
            </div>
          </div>
          {/* 사진 */}
          <div className="d-flex mt-4">
            <h4 className="col me-3 text-nowrap text-center">사진</h4>
            <div style={{ width: "70%" }}>
              <div>
                <Image
                  className=" mt-3"
                  style={{ width: "100px", height: "100px" }}
                  src={url}
                  alt="trainerPhoto"
                />
                <input
                  style={{ width: "67%" }}
                  className="form-control mt-2"
                  type="file"
                  accept="image/*"
                  onChange={() => {
                    changeFile();
                  }}
                  ref={trainerPhotoUrlRef}
                />
              </div>
            </div>
          </div>
          {/* 강사 서비스 */}
          {/* <div className="mt-3 d-flex">
                    <h4
                    className="col text-nowrap text-center"
                    style ={{width : "200px"}}
                    >강사 서비스</h4> 
                    <div style={{width:"70%"}}>
                        <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group"
                        style ={{width : "400px"}}>
                            <input  
                                type="checkbox" 
                                className="btn-check" 
                                name="ptService" 
                                id="PT"     
                                autoComplete="off"
                                onClick={()=>('getCheckboxValue()')}
                                />
                            <label 
                                className="btn btn-outline-primary" 
                                htmlFor="PT">PT</label>

                            <input 
                                type="checkbox" 
                                className="btn-check" 
                                name="ptService" 
                                id="Pilates" 
                                autoComplete="off" 
                                onClick={()=>('getCheckboxValue()')}
                                />
                            <label className="btn btn-outline-primary" htmlFor="Pilates">필라테스</label>

                            <input 
                                type="checkbox" 
                                className="btn-check" 
                                name="ptService" 
                                id="Yoga" 
                                autoComplete="off" 
                                onClick={()=>('getCheckboxValue()')}
                                />
                            <label className="btn btn-outline-primary" htmlFor="Yoga">요가</label>
                        </div>
                        <div>
                        <div id='result'></div>
                        </div>
                    </div>
                </div> */}
          {/* 가격 */}
          <div>
            <h3
              className="col mt-4 text-nowrap text-center"
              style={{ width: "239px" }}
            >
              가 격
            </h3>
            <div className="mt-3 ms-5 d-flex">
              <table className="ms-5">
                <thead>
                  <th className="text-center me-3"></th>
                  <th className="text-center">1Day</th>
                  <th className="text-center">3Day</th>
                  <th className="text-center">7Day</th>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">
                      <h5>PT</h5>
                    </td>
                    <td>
                      <input
                        ref={pt1TimePriceRef}
                        className="ms-4"
                        type="text"
                        style={{ width: "180px" }}
                      ></input>
                    </td>
                    <td>
                      <input ref={pt10TimePriceRef} type="text"></input>
                    </td>
                    <td>
                      <input ref={pt30TimePriceRef} type="text"></input>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <h5>요가</h5>
                    </td>
                    <td>
                      <input
                        ref={yoga1TimePriceRef}
                        className="ms-4"
                        type="text"
                        style={{ width: "180px" }}
                      ></input>
                    </td>
                    <td>
                      <input ref={yoga10TimePriceRef} type="text"></input>
                    </td>
                    <td>
                      <input ref={yoga30TimePriceRef} type="text"></input>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <h5>필라테스</h5>
                    </td>
                    <td>
                      <input
                        ref={pilates1TimePriceRef}
                        className="ms-4"
                        type="text"
                        style={{ width: "180px" }}
                      ></input>
                    </td>
                    <td>
                      <input ref={pilates10TimePriceRef} type="text"></input>
                    </td>
                    <td>
                      <input ref={pilates30TimePriceRef} type="text"></input>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* 등록 버튼 */}
          <div className="d-grid mt-3  d-md-flex justify-content-center">
            <button
              className="btn btn-primary mb-3"
              type="button"
              onClick={() => {
                handleAddClick();
              }}
            >
              등록하기
            </button>
          </div>
        </div>
      </body>
    </Layout>
  );
};
export default Tcreate;
