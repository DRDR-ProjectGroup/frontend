import Button from '@/components/ui/Button';
import { formatDate } from '@/lib/utils/formatDate';
import { useChangeAdminMemberStatusMutation } from '@/query/admin/member/useAdminMemberMutations';
import { AdminMemberItem } from '@/types/api/adminMember';

export default function Table({
  memberList,
}: {
  memberList: AdminMemberItem[];
}) {
  const { mutate: changeMemberStatus } = useChangeAdminMemberStatusMutation();
  const handleChangeMemberStatus = (
    memberId: number,
    status: 'BLOCKED' | 'ACTIVE',
  ) => {
    changeMemberStatus(
      {
        memberId,
        status: status === 'BLOCKED' ? 'ACTIVE' : 'BLOCKED',
      },
      {
        onSuccess: (response) => {
          alert(response.message);
        },
        onError: (error) => {
          alert(error.message);
        },
      },
    );
  };
  return (
    <div className="w-full rounded-md border border-primitive-grayPrimary overflow-x-auto">
      <table className="min-w-full table-fixed text-xs text-text-second border-collapse text-center">
        <colgroup>
          <col className="w-[80px]" />
          <col className="w-[150px]" />
          <col className="w-[150px]" />
          <col />
          <col className="w-[100px]" />
          <col className="w-[100px]" />
          <col className="w-[70px]" />
          <col className="w-[100px]" />
        </colgroup>
        <thead>
          <tr className="h-10">
            <th className="px-2">회원 ID</th>
            <th className="px-2">닉네임</th>
            <th className="px-2">유저네임</th>
            <th className="px-2">이메일</th>
            <th className="px-2">권한</th>
            <th className="px-2">생성일</th>
            <th className="px-2">상태</th>
            <th className="px-2">관리</th>
          </tr>
        </thead>
        <tbody className="bg-primitive-white">
          {memberList.map((member) => (
            <tr key={member.memberId} className="h-15">
              <td className="px-2">{member.memberId}</td>
              <td className="px-2 max-w-[150px] truncate">{member.nickname}</td>
              <td className="px-2 max-w-[150px] truncate">{member.username}</td>
              <td className="px-2 max-w-[300px] truncate">{member.email}</td>
              <td className="px-2">{member.role}</td>
              <td className="px-2">{formatDate(member.createdAt)}</td>
              <td className="px-2">{member.status}</td>
              <td className="px-2">
                {member.status !== 'DELETED' && (
                  <Button
                    size="sm"
                    variant="tertiary"
                    onClick={() => {
                      if (member.status === 'DELETED') return;
                      handleChangeMemberStatus(member.memberId, member.status);
                    }}
                    className={`${member.status === 'ACTIVE' ? 'border border-primitive-red text-primitive-red' : ''}`}
                  >
                    {member.status === 'ACTIVE' ? '차단' : '차단 해제'}
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
