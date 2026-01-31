import Select from "@/components/ui/Select";
import { CategoryGroup } from "@/types/api/category";
import { useEffect, useState } from "react";

export default function SelectCategory({ 
  category, 
  setCategory 
}: { 
  category: string; 
  setCategory: (category: string) => void;
}) {
  const [categoryGroups, setCategoryGroups] = useState<CategoryGroup[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/categories`)
      .then(response => response.json())
      .then(data => setCategoryGroups(data.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  return (
    <div>
      <Select 
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">카테고리 선택</option>
        {categoryGroups.map((group) => (
          <optgroup key={group.groupId} label={group.groupName}>
            {group.categories.map((category) => (
              <option key={category.categoryId} value={category.categoryAddress}>
                {category.categoryName}
              </option>
            ))}
          </optgroup>
        ))}
      </Select>
    </div>
  );
}
