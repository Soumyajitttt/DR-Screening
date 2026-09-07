// Plain, unstyled badge - just renders the text for now.
// Hook a className like `grade-${grade}` here later for severity coloring.
export default function GradeBadge({ grade, gradeText }) {
  return <span data-grade={grade}>{gradeText}</span>;
}
