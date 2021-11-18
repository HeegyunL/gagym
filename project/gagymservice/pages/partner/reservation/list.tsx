import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../../components/layout";
import { requestFetchReservation } from "../../../middleware/modules/reservation";
import { AppDispatch, RootState } from "../../../provider";

const list = () => {
  const reservation = useSelector((state: RootState) => state.reservation);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!reservation.isFetched) {
      dispatch(requestFetchReservation());
    }
  }, [dispatch, reservation.isFetched]);

  return (
    <Layout>
      <div>
        <body>
          <div className="mx-auto mt-5" style={{ width: "850px" }}>
            <h4 className=" float-start">예약 내역</h4>
            <button className="btn btn-primary float-end btn-sm">
              상세 보기
            </button>
            <table className="table mx-auto">
              <thead>
                <tr>
                  <th scope="col">이름</th>
                  <th scope="col">헬스장명</th>
                  <th scope="col">전화번호</th>
                  <th scope="col">희망 운영권</th>
                  <th scope="col">희망 강사</th>
                </tr>
              </thead>
              <tbody>
                {reservation.data.map((item) => (
                  <tr
                    onClick={() => {
                      router.push(`/partner/reservation/detail/${item.id}`);
                    }}
                  >
                    <td>{item.memberName}</td>
                    <td>{item.gymName}</td>
                    <td>{item.memberPhone}</td>
                    <td>{item.boughtService}</td>
                    <td>{item.trainerName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </body>
      </div>
    </Layout>
  );
};
export default list;
