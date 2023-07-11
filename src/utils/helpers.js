export const calcStudentGPA = (student = {}, round = 1) => {
  const { math, phy, chem } = student;
  return ((Number(math) + Number(phy) + Number(chem)) / 3).toFixed(round);
};

export const studentTagByGPA = (student) => {
  const gpa = calcStudentGPA(student);

  if (gpa >= 8) return "Giỏi";
  else if (gpa >= 6.5) return "Khá";
  else if (gpa >= 5) return "Trung Bình";
  else return "Kém";
};
