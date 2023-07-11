import Student from "../Student/Student";

const StudentTable = (props) => {
  const { studentList = [], deleteStudent, openUpdateStudentModal } = props;

  const listStudentTableRow =
    studentList &&
    studentList.map((student, index) => {
      return (
        <Student
          key={student.id}
          student={student}
          order={index}
          deleteStudent={deleteStudent}
          openUpdateStudentModal={openUpdateStudentModal}
        />
      );
    });
  return (
    <div className="student-list">
      <p>
        <strong>Tổng Số:</strong> {studentList.length} Học sinh
      </p>
      <table class="table table-striped table-hover p-2 shadow">
        <thead>
          <tr style={{ backgroundColor: "cadetblue" }}>
            <th scope="col" className="text-center">
              STT
            </th>
            <th scope="col">Họ tên</th>
            <th scope="col">Lớp</th>
            <th className="text-center" scope="col">
              Điểm Toán
            </th>
            <th className="text-center" scope="col">
              Điểm Lý
            </th>
            <th className="text-center" scope="col">
              Điểm Hoá
            </th>
            <th className="text-center" scope="col">
              GPA
            </th>
            <th className="text-center" scope="col">
              Xếp loại
            </th>
            <th scope="col">...</th>
          </tr>
        </thead>
        <tbody>{listStudentTableRow}</tbody>
      </table>
    </div>
  );
};

export default StudentTable;
