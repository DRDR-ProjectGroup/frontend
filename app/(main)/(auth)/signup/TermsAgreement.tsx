interface TermsAgreementProps {
  isTermsAgreed: boolean;
  setIsTermsAgreed: (isTermsAgreed: boolean) => void;
}

export default function TermsAgreement({
  isTermsAgreed,
  setIsTermsAgreed,
}: TermsAgreementProps) {
  return (
    <div className="mb-8 pb-5 border-b border-primitive-grayPrimary">
      <ul className="max-h-40 overflow-y-auto space-y-2 text-xs text-text-third">
        <li>
          - 회원가입 시, 수집되는 정보는 어떠한 영리의 목적없이, 회원 서비스
          제공을 위해 이용됩니다.
        </li>
        <li>- 회원가입 동안 회원정보는 비공개 상태로 유지됩니다.</li>
        <li>
          - 회원 탈퇴 시, 30일 동안 정보는 보관되며, 이후 완전히 삭제됩니다.
        </li>
      </ul>
      <div className="flex items-center gap-2 mt-4">
        <input
          type="checkbox"
          className="w-4 h-4"
          id="terms-of-service"
          checked={isTermsAgreed}
          onChange={() => setIsTermsAgreed(!isTermsAgreed)}
        />
        <label
          htmlFor="terms-of-service"
          className="text-sm font-normal cursor-pointer"
        >
          회원가입 이용약관에 동의합니다.
        </label>
      </div>
    </div>
  );
}
