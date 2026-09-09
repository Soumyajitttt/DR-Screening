const GRADE_LABELS = {
  0: "Grade 0: Normal",
  1: "Grade 1: Mild DR",
  2: "Grade 2: Moderate DR",
  3: "Grade 3: Severe DR",
  4: "Grade 4: Proliferative DR"
};

function labelForGrade(grade) {
  return GRADE_LABELS[grade] ?? "Unknown grade";
}

module.exports = { GRADE_LABELS, labelForGrade };
