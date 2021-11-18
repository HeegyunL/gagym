import { useRouter } from "next/router";
import { MutableRefObject, useEffect, useRef } from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../../../components/layout";
import {
  requestFetchDiarys,
  requestModifyDiary,
  requestRemoveDiary,
} from "../../../../middleware/modules/diary";
import { AppDispatch, RootState } from "../../../../provider";
import React from "react";

const PTdetail = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const id = router.query.id as string;

  const diaryItem = useSelector((state: RootState) =>
    state.diary.data.find((item) => item.id === +id)
  );
  const isModifyCompleted = useSelector(
    (state: RootState) => state.diary.isModifyCompleted
  );
  const isRemoveCompleted = useSelector(
    (state: RootState) => state.partner.isRemoveCompleted
  );

  const feedBackRef = useRef() as MutableRefObject<HTMLInputElement>;
  const trainerSaveClick = () => {
    if (diaryItem) {
      const item = { ...diaryItem };
      item.trainerFeedback = feedBackRef.current?.value;

      dispatch(requestModifyDiary(item));
      router.push(`/partner/ptDiary/list`);
    }
  };
  const handleDeleteClick = () => {
    dispatch(requestRemoveDiary(+id));
    router.push(`/partner/ptDiary/list`);
  };
  useEffect(() => {
    isRemoveCompleted && router.push(`/partner/ptDiary/list`);
  }, [dispatch, isRemoveCompleted, router]);

  return (
    <Layout>
      {diaryItem && (
        <body>
          <div className="mx-auto mt-5" style={{ width: "850px" }}>
            <h4 className="mt-5 text-center"> PT 일지</h4>
            <div className="d-flex mt-5">
              <h4
                className="col me-3 text-nowrap text-center"
                style={{ width: "200px" }}
              >
                이름
              </h4>
              <p
                style={{
                  width: "400px",
                  height: "45px",
                  borderBlockEndWidth: "4px",
                }}
              >
                {" "}
                {diaryItem.memberName}
              </p>
            </div>
            <div className="d-flex mt-3">
              <h4
                className="col me-3 text-nowrap text-center"
                style={{ width: "200px" }}
              >
                아침 식단
              </h4>
              <p
                style={{
                  width: "400px",
                  height: "45px",
                  borderBlockEndWidth: "4px",
                }}
              >
                {diaryItem.diaryMorning}
              </p>
            </div>
            <div className="d-flex mt-3">
              <h4
                className="col me-3 text-nowrap text-center"
                style={{ width: "200px" }}
              >
                점심 식단
              </h4>
              <p
                style={{
                  width: "400px",
                  height: "45px",
                  borderBlockEndWidth: "4px",
                }}
              >
                {diaryItem.diaryLunch}
              </p>
            </div>
            <div className="d-flex mt-3">
              <h4
                className="col me-3 text-nowrap text-center"
                style={{ width: "200px" }}
              >
                저녁 식단
              </h4>
              <p
                style={{
                  width: "400px",
                  height: "45px",
                  borderBlockEndWidth: "4px",
                }}
              >
                {diaryItem.diaryDinner}
              </p>
            </div>
            <div className="d-flex mt-3">
              <h4
                className="col me-3 text-nowrap text-center"
                style={{ width: "200px" }}
              >
                운동 내역
              </h4>
              <p
                style={{
                  width: "400px",
                  height: "45px",
                  borderBlockEndWidth: "4px",
                }}
              >
                {" "}
                {diaryItem.diaryRoutine}
              </p>
            </div>
            <div className="d-flex mt-3">
              <h4
                className="col me-3 text-nowrap text-center"
                style={{ width: "200px" }}
              >
                문의 사항
              </h4>
              <p
                style={{
                  width: "400px",
                  height: "45px",
                  borderBlockEndWidth: "4px",
                }}
              >
                {" "}
                {diaryItem.diaryRequest}
              </p>
            </div>
            <div className="d-flex mt-3">
              <h4
                className="col me-3 text-nowrap text-center"
                style={{ width: "200px" }}
              >
                피드백
              </h4>
              <p
                style={{
                  width: "400px",
                  height: "45px",
                  borderBlockEndWidth: "4px",
                }}
              >
                {diaryItem.trainerFeedback}
              </p>
            </div>
            <div className="d-grid mt-3  d-md-flex justify-content-between">
              <div className="d-flex ms-2">
                <Button
                  color="primary"
                  type="button"
                  onClick={() => setModalOpen(!modalOpen)}
                >
                  {" "}
                  피드백
                </Button>
                <Modal
                  toggle={() => setModalOpen(!modalOpen)}
                  isOpen={modalOpen}
                >
                  <div className=" modal-header">
                    <h5
                      className=" modal-title"
                      // id="exampleModalLabel"
                    >
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
                      <div className="">
                        <p>피드백 :</p>
                        <input ref={feedBackRef}></input>
                      </div>
                    </div>
                    <div className="d-flex"></div>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="secondary"
                      type="button"
                      onClick={() => setModalOpen(!modalOpen)}
                    >
                      Close
                    </Button>
                    <Button
                      color="primary"
                      type="button"
                      onClick={() => {
                        trainerSaveClick();
                        // , setModalOpen(!modalOpen);
                      }}
                    >
                      피드백 보내기
                    </Button>
                  </ModalFooter>
                </Modal>
              </div>
              <button className="btn btn-primary mb-3" type="button">
                목록
              </button>
              <button
                onClick={() => handleDeleteClick()}
                className="btn btn-primary mb-3"
                type="button"
              >
                삭제
              </button>
            </div>
          </div>
        </body>
      )}
    </Layout>
  );
};

export default PTdetail;
