import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AddNewStudent from "../AddNewStudent/AddNewStudent";
import StudentTable from "../StudentTable/StudentTable";
import { studentMockData } from "../../utils/mockData";
import { calcStudentGPA } from "../../utils/helpers";

import "./StudentManagement.css";

const FILTER_OPTIONS = {
  DEFAULT: 0,
  GPA_ASCENDING: 1,
  GPA_DESCENDING: 2,
  A_TO_Z: 3,
  Z_TO_A: 4,
};

const StudentManagement = () => {
  // State
  const [studentList, setStudentList] = useState(studentMockData || []);
  const [selectedFilter, setSelectedFilter] = useState(FILTER_OPTIONS.DEFAULT);
  const [editingStudent, setEditingStudent] = useState({});

  // Functions
  const handleChangeFilterOption = (e) => setSelectedFilter(e.target.value);

  // Sắp xếp danh sách học sinh
  // Dựa vào filter option
  const sortStudentList = useCallback(() => {
    const sortingStudentList = [...studentList];
    switch (+selectedFilter) {
      case FILTER_OPTIONS.GPA_ASCENDING:
        // 10 5 7 6
        // 5 10
        sortingStudentList.sort(
          (a, b) => calcStudentGPA(a) - calcStudentGPA(b)
        );
        break;
      case FILTER_OPTIONS.GPA_DESCENDING:
        sortingStudentList.sort(
          (a, b) => calcStudentGPA(b) - calcStudentGPA(a)
        );
        break;
      case FILTER_OPTIONS.Z_TO_A:
        sortingStudentList.sort((a, b) => {
          return b.studentName.localeCompare(a.studentName);
        });
        break;
      case FILTER_OPTIONS.A_TO_Z:
        sortingStudentList.sort((a, b) => {
          // c a b e
          //  refString.localCompare(compareStr)
          // return (-) if  ref đứng trước com
          // return (+) if ref đứng sau
          return a.studentName.localeCompare(b.studentName);
        });
        break;
      case FILTER_OPTIONS.DEFAULT:
      default:
        return sortingStudentList;
    }

    return sortingStudentList;
  }, [selectedFilter, studentList]);

  // Thêm mới học sinh
  const onAddStudentHandler = (student) => {
    const newStudent = {
      ...student,
      id: uuidv4(),
    };
    setStudentList([...studentList, newStudent]);
  };

  const onDeleteStudentHandler = (id) => {
    const filteredStudentList = studentList.filter(
      (student) => student.id !== id
    );
    setStudentList(filteredStudentList);
  };

  // Update student
  const onOpenUpdateStudentModal = (studentId) => {
    const existingStudent = studentList.find(
      (student) => student.id === studentId
    );

    if (!existingStudent) return;

    setEditingStudent(existingStudent);
  };

  const onUpdateStudent = (updatingStudent) => {
    setStudentList(
      studentList.map((student) => {
        if (student.id !== updatingStudent.id) return student;
        return updatingStudent;
      })
    );
    setEditingStudent({});
  };

  return (
    <div className="container">
      <h1 className="text-center my-3">DỰ ÁN QUẢN LÝ HỌC SINH</h1>
      <div className="d-flex align-items-center justify-content-end gap-3 mb-5">
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addStudentForm"
        >
          Thêm học sinh mới
        </button>
        <select
          class="form-select"
          style={{ width: "200px" }}
          onChange={handleChangeFilterOption}
          value={selectedFilter}
        >
          <option value={FILTER_OPTIONS.DEFAULT}>Sắp xếp</option>
          <option value={FILTER_OPTIONS.GPA_ASCENDING}>GPA tăng dần</option>
          <option value={FILTER_OPTIONS.GPA_DESCENDING}>GPA giảm dần</option>
          <option value={FILTER_OPTIONS.A_TO_Z}>A -&gt; Z</option>
          <option value={FILTER_OPTIONS.Z_TO_A}>Z -&gt; A</option>
        </select>
      </div>
      <StudentTable
        studentList={sortStudentList()}
        deleteStudent={onDeleteStudentHandler}
        openUpdateStudentModal={onOpenUpdateStudentModal}
      />
      <AddNewStudent
        addNewStudent={onAddStudentHandler}
        initialValues={editingStudent}
        updateStudent={onUpdateStudent}
      />
    </div>
  );
};

export default StudentManagement;

/*
  Props:
    - Được truyền từ component cha -> component con
    - Tham số mặc định của bất kì 1 component
    - READ ONLY (không thể thay đổi)
    - ReactJS => One way data binding 
    (dữ liệu truyền thông prosp => cha -> con)
*/

// Cách 2
// Rendering list react element
// let studentListElements = [];
// for (let i = 0; i < studentList.length; i++) {
//   const { studentName, classCode, math, phy, chem } = studentList[i];
//   studentListElements.push(
//     <Student
//       studentName={studentName}
//       classCode={classCode}
//       math={math}
//       phy={phy}
//       chem={chem}
//     />
//   );
// }

/*
  - Câu hỏi 1: Tại sao khi render 1 list react element cần có unique key
  - Câu hỏi 2: Shallow comparison của React khi cập nhật state  
  - Tìm hiểu trước:
    + Form trong ReactJS
    + Chức năng Delete học sinh
    + Thêm học sinh (với form)
    + Sắp xếp học sinh theo A -> Z
    + Sắp xếp học sinh theo Z -> A
    + Sắp xếp học sinh theo GPA Tăng dần
    + Sắp xếp học sinh theo GPA Giảm dần


*/

/*
  Sort rules:
    [a , b]
    + return số > 0: b đứng trước a => [b ,  a]
    + return số < 0: a đứng trước v => [a , b]
    + 0: keep
*/
