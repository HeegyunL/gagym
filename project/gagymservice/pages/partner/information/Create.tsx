import { MutableRefObject, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { AppDispatch, RootState } from "../../../provider";
import { requestAddPartner } from "../../../middleware/modules/partner";
import { PartnerItem } from "../../../provider/modules/partner";

import Layout from "../../../components/layout";
const Create = () => {
  const gymNameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const gymCoNumRef = useRef() as MutableRefObject<HTMLInputElement>;
  const gymLocateSiRef = useRef() as MutableRefObject<HTMLInputElement>;
  const gymLocateGunGuRef = useRef() as MutableRefObject<HTMLInputElement>;
  const gymAddressRef = useRef() as MutableRefObject<HTMLInputElement>;
  const gymPhoneNumRef = useRef() as MutableRefObject<HTMLInputElement>;
  const gymTimeRef = useRef() as MutableRefObject<HTMLInputElement>;
  const gymServiceRef = useRef() as MutableRefObject<HTMLInputElement>;
  const gymPhotoRef = useRef() as MutableRefObject<HTMLInputElement>;
  const gym1DayPriceRef = useRef() as MutableRefObject<HTMLInputElement>;
  const gym3DayPriceRef = useRef() as MutableRefObject<HTMLInputElement>;
  const gym7DayPriceRef = useRef() as MutableRefObject<HTMLInputElement>;
  const gymMonthPriceRef = useRef() as MutableRefObject<HTMLInputElement>;
  const gym3MonthPriceRef = useRef() as MutableRefObject<HTMLInputElement>;
  const gym6MonthPriceRef = useRef() as MutableRefObject<HTMLInputElement>;
  const gymYearPriceRef = useRef() as MutableRefObject<HTMLInputElement>;

  const partnerData = useSelector((state: RootState) => state.partner.data);

  const isAddCompleted = useSelector(
    (state: RootState) => state.partner.isAddCompleted
  );

  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  useEffect(() => {
    console.log("--isAddCompleted 변경 :" + isAddCompleted);
    isAddCompleted && router.push(`/partner/information/list`);
  }, [isAddCompleted, router, dispatch]);

  const handleAddClick = () => {
    if (gymPhotoRef.current?.files?.length) {
      const imageFile = gymPhotoRef.current.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const item: PartnerItem = {
          id: partnerData.length ? partnerData[0].id + 1 : 1,
          gymName: gymNameRef.current?.value,
          gymCoNum: gymCoNumRef.current?.value,
          gymLocateSi: gymLocateSiRef.current?.value,
          gymLocateGunGu: gymLocateGunGuRef.current?.value,
          gymAddress: gymAddressRef.current?.value,
          gymPhoneNum: gymPhoneNumRef.current?.value,
          gymTime: gymTimeRef.current?.value,
          gymService: gymServiceRef.current?.value,
          gymPhoto: reader.result ? reader.result.toString() : "",
          // gymPhoto: gymPhotoRef.current?.value,
          fileName: imageFile.name,
          fileType: imageFile.type,
          gym1DayPrice: gym1DayPriceRef.current?.value,
          gym3DayPrice: gym3DayPriceRef.current?.value,
          gym7DayPrice: gym7DayPriceRef.current?.value,
          gymMonthPrice: gymMonthPriceRef.current?.value,
          gym3MonthPrice: gym3MonthPriceRef.current?.value,
          gym6MonthPrice: gym6MonthPriceRef.current?.value,
          gymYearPrice: gymYearPriceRef.current?.value,
        };

        //Saga action
        dispatch(requestAddPartner(item));
        // router.push(`/partner/information/list`);
      };
      reader.readAsDataURL(imageFile);
    }
  };

  return (
    <Layout>
      <body>
        <div className="mx-auto" style={{ width: "850px" }}>
          <h4 className="mt-5 text-center"> 등록 하기</h4>
          {/* 헬스장명 */}
          <div className="d-flex mt-4">
            <h4 className="col me-3 text-nowrap text-center">헬스장 명</h4>
            <div style={{ width: "70%" }}>
              <input
                ref={gymNameRef}
                style={{
                  width: "400px",
                  height: "45px",
                  borderBlockEndWidth: "4px",
                }}
              ></input>
            </div>
          </div>
          {/* 사업자번호 */}
          <div className="d-flex mt-4">
            <h4 className="col me-3 text-nowrap text-center">사업자번호</h4>
            <div style={{ width: "70%" }}>
              <input
                ref={gymCoNumRef}
                style={{
                  width: "400px",
                  height: "45px",
                  borderBlockEndWidth: "4px",
                }}
              ></input>
            </div>
          </div>
          {/* 지역 선택 */}
          <div className="mt-3 d-flex">
            <h4 className="col me-3 text-nowrap text-center">지역 선택</h4>
            <div style={{ width: "70%" }}>
              <div
                className="input-group"
                style={{
                  width: "400px",
                  height: "45px",
                  borderBlockEndWidth: "4px",
                }}
              >
                <input
                  ref={gymLocateSiRef}
                  type="text"
                  aria-label="First name"
                  placeholder="시"
                  className="form-control"
                  style={{ borderBlockEndWidth: "4px" }}
                />
                <input
                  ref={gymLocateGunGuRef}
                  type="text"
                  aria-label="Last name"
                  placeholder="군/구"
                  className="form-control"
                  style={{ borderBlockEndWidth: "4px" }}
                />
              </div>
            </div>
          </div>
          {/* 주소 */}
          <div className="mt-3 d-flex">
            <h4 className="col me-3 text-nowrap text-center">주소</h4>
            <div style={{ width: "70%" }}>
              <div style={{ width: "70%" }}>
                <input
                  ref={gymAddressRef}
                  style={{
                    width: "400px",
                    height: "45px",
                    borderBlockEndWidth: "4px",
                  }}
                ></input>
              </div>
            </div>
          </div>
          {/* 전화 번호 */}
          <div className="mt-3 d-flex">
            <h4 className="col me-3 text-nowrap text-center">전화 번호</h4>
            <div style={{ width: "70%" }}>
              <input
                ref={gymPhoneNumRef}
                style={{
                  width: "400px",
                  height: "45px",
                  borderBlockEndWidth: "4px",
                }}
              ></input>
            </div>
          </div>
          {/* 운영 시간 */}
          <div className="mt-3 d-flex">
            <h4 className="col me-3 text-nowrap text-center">운영 시간</h4>
            <div style={{ width: "70%" }}>
              <input
                ref={gymTimeRef}
                style={{
                  width: "400px",
                  height: "45px",
                  borderBlockEndWidth: "4px",
                }}
              ></input>
            </div>
          </div>
          {/* 부가 서비스 */}
          <div className="mt-3 d-flex">
            <h4 className="col me-3 text-nowrap text-center">부가서비스</h4>
            <div style={{ width: "70%" }}>
              <input
                ref={gymServiceRef}
                placeholder=" 부가 서비스등을 작성 해주세요 ex)샤워, 와이파이 등등"
                style={{
                  width: "400px",
                  height: "45px",
                  borderBlockEndWidth: "4px",
                }}
              ></input>
            </div>
          </div>
          {/* 헬스장 사진 */}
          {/* 사진 */}
          <div className="d-flex mt-4">
            <h4 className="col me-3 text-nowrap text-center">사진</h4>
            <div style={{ width: "70%" }}>
              <div>
                {/* <Image className=" mt-3" style={{ width: "100px", height:"100px" }} src={trainerData.} alt="trainerPhoto" />                */}
                <input
                  style={{ width: "67%" }}
                  className="form-control mt-2"
                  type="file"
                  accept="image/*"
                  // onChange={() => {
                  //     changeFile();
                  // }}
                  ref={gymPhotoRef}
                />
              </div>
            </div>
          </div>
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
                      <h5>헬스장</h5>
                    </td>
                    <td>
                      <input
                        ref={gym1DayPriceRef}
                        className="ms-4"
                        type="text"
                        style={{ width: "180px" }}
                      ></input>
                    </td>
                    <td>
                      <input ref={gym3DayPriceRef} type="text"></input>
                    </td>
                    <td>
                      <input ref={gym7DayPriceRef} type="text"></input>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 ms-5 d-flex">
              <table className="ms-5">
                <thead>
                  <th className="text-center">-</th>
                  <th className="text-center">1달</th>
                  <th className="text-center">3달</th>
                  <th className="text-center">6달</th>
                  <th className="text-center">12달</th>
                </thead>
                <tbody>
                  <tr className="justify-content-between">
                    <td className="text-center text-nowrap">
                      <h5>헬스장</h5>
                    </td>
                    <td>
                      <input
                        ref={gymMonthPriceRef}
                        className="ms-4"
                        type="text"
                      ></input>
                    </td>
                    <td>
                      <input ref={gym3MonthPriceRef} type="text"></input>
                    </td>
                    <td>
                      <input ref={gym6MonthPriceRef} type="text"></input>
                    </td>
                    <td>
                      <input ref={gymYearPriceRef} type="text"></input>
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
export default Create;
