import { FiUser } from "react-icons/fi";

export default function UserChip({ name, className }: { name: string, className?: string }) {
  return <div className={`flex items-center gap-2 ${className ?? ''}`}>
    <FiUser className="w-6 h-6 rounded-full border-2 border-text-primary text-text-primary" />
    <span className="text-sm font-medium text-text-primary">{name}</span>
  </div>;
}