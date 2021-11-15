import Link from "next/link";
import styles from "./sidebar.module.css"

export default function SideBar() {
  return (
    <nav className={styles.nav}>
      <Link href="/partner/information/list">
        <a href="/partner/information/Create" className="">
        헬스장 정보
        </a>
      </Link>
      <Link href="/partner/reservation/list">
        <a href="/partner/information/detail/id" className="">예약 내역</a>
      </Link>
      <Link href="/partner/ptDiary/list">
        <a href="/partner/ptDiary/list" className="">PT 일지</a>
      </Link>
      <Link href="/partner/information/Create">
        <a href="/partner/ptDiary/list" className="">체육관 등록하기</a>
      </Link>
      <Link href="/partner/information/Tcreate">
        <a href="/partner/ptDiary/list" className="">강사 등록하기</a>
      </Link>
    </nav>
  );
}