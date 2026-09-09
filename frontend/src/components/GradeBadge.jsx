// Colored pill for a DR grade (0-4). Colors loosely follow the severity
// scale used in the reference wireframe (green -> purple).
const GRADE_STYLES = {
  0: "bg-emerald-100 text-emerald-800",
  1: "bg-yellow-100 text-yellow-800",
  2: "bg-orange-100 text-orange-800",
  3: "bg-red-100 text-red-800",
  4: "bg-purple-100 text-purple-800"
};

export default function GradeBadge({ grade, gradeText }) {
  const styles = GRADE_STYLES[grade] ?? "bg-slate-100 text-slate-700";
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles}`}>
      {gradeText}
    </span>
  );
}
