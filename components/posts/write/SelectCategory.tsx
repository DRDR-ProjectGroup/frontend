import Select from '@/components/ui/Select';
import { useGroupAndCategoryQuery } from '@/query/admin/category/useCategoryQuery';

export default function SelectCategory({
  category,
  setCategory,
}: {
  category: string;
  setCategory: (category: string) => void;
}) {
  const {
    data: groupAndCategory,
    isLoading,
    isError,
  } = useGroupAndCategoryQuery();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  if (!groupAndCategory?.data) return <div>카테고리 데이터가 없습니다.</div>;
  const categoryGroups = groupAndCategory.data;

  return (
    <div>
      <Select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">카테고리 선택</option>
        {categoryGroups.map((group) => (
          <optgroup key={group.groupId} label={group.groupName}>
            {group.categories.map((category) => (
              <option
                key={category.categoryId}
                value={category.categoryAddress}
              >
                {category.categoryName}
              </option>
            ))}
          </optgroup>
        ))}
      </Select>
    </div>
  );
}
