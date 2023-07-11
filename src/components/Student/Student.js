import { calcStudentGPA, studentTagByGPA } from "../../utils/helpers";
import IconWrapper from "../IconWrapper/IconWrapper";
import "./Student.css";
import { AiOutlineDelete, AiFillEdit } from "react-icons/ai";
const Student = (props) => {
  const { order, student, deleteStudent, openUpdateStudentModal } = props;
  const { studentName, classCode, math, phy, chem, id } = student || {};
  const gpa = calcStudentGPA(student);
  const studentTag = studentTagByGPA(student);

  return (
    <tr>
      <th scope="row" className="text-center">
        {order + 1}
      </th>
      <td>{studentName}</td>
      <td>{classCode}</td>
      <td className="text-center">{math}</td>
      <td className="text-center">{phy}</td>
      <td className="text-center">{chem}</td>
      <td className="text-center">{gpa}</td>
      <td className="text-center">{studentTag}</td>

      <td>
        <div className="d-flex align-items-center gap-2">
          <IconWrapper
            bg="bg-secondary"
            onClick={() => openUpdateStudentModal(id)}
            data-bs-toggle="modal"
            data-bs-target="#addStudentForm"
          >
            <AiFillEdit color="white" />
          </IconWrapper>
          <IconWrapper onClick={() => deleteStudent(id)}>
            <AiOutlineDelete color="white" />
          </IconWrapper>
        </div>
      </td>
    </tr>
  );
};

export default Student;
