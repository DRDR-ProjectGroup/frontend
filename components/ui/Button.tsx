// 버튼 디자인 종류 > 4가지
// primary초록 / secondary검정 / thirdary흰색 / disabled회색
type ButtonProps {
  variant? : "primary" | "secondary" | "thirdary" | "disabled";
  callBack? : () => {};
  text: string;
}

export default function Button({
  variant = "primary",
  callBack,
  text
} : ButtonProps) {
  return <button onClick={callBack}>{text}</button>;
}
