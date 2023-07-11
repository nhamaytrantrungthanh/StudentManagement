import React, { useEffect, useRef, useState } from "react";

const initialState = {
  studentName: "",
  classCode: "",
  math: "",
  phy: "",
  chem: "",
};

const FORM_MODE = {
  CREATE: "create",
  UPDATE: "update",
};

const AddNewStudent = (props) => {
  const { initialValues, addNewStudent, updateStudent } = props;

  const [student, setStudent] = useState(initialState);
  const [formMode, setFormMode] = useState(FORM_MODE.CREATE);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const hasInitialValues =
      initialValues.studentName &&
      initialValues.classCode &&
      initialValues.math &&
      initialValues.phy &&
      initialValues.chem;

    if (hasInitialValues) {
      setStudent(initialValues);
      setFormMode(FORM_MODE.UPDATE);
    }
  }, [initialValues]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setStudent({
      ...student,
      [name]: value,
    });
  };

  const onSubmitHandler = (event) => {
    // Ngăn chặn hành động submit form của mặc định
    event.preventDefault();

    // Event up: Notify cái function ở component cha biết được
    // button con vừa được click

    if (formMode === FORM_MODE.CREATE) {
      addNewStudent(student);
    } else {
      updateStudent(student);
    }

    // Sau khi thêm xong dữ liệu
    // Clear form về trạng thái ban đầu
    setStudent({ ...initialState });
    closeButtonRef.current.click();
    setFormMode(FORM_MODE.CREATE);
  };

  // Một trong các trường dữ liệu chưa được điền
  // Thì submit button sẽ bị disabled
  const isDisabledSubmitBtn =
    !student.chem ||
    !student.math ||
    !student.phy ||
    !student.classCode ||
    !student.studentName;

  return (
    <div
      class="modal fade"
      id="addStudentForm"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {formMode === FORM_MODE.CREATE
                ? "Add new student"
                : "Update student"}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              ref={closeButtonRef}
            ></button>
          </div>
          <div class="modal-body">
            <form onSubmit={onSubmitHandler}>
              <div className="row">
                <div className="col-6 mb-2">
                  <div>
                    <label htmlFor="studentName" className="form-label">
                      Họ tên
                    </label>
                    <input
                      className="form-control"
                      id="studentName"
                      name="studentName"
                      value={student.studentName}
                      onChange={onChangeHandler}
                    />
                  </div>
                </div>
                <div className="col-6 mb-2">
                  <label htmlFor="classCode" className="form-label">
                    Lớp
                  </label>
                  <input
                    className="form-control"
                    id="classCode"
                    name="classCode"
                    value={student.classCode}
                    onChange={onChangeHandler}
                  />
                </div>
                <div className="col-6 mb-2">
                  <label htmlFor="math" className="form-label">
                    Điểm toán
                  </label>
                  <input
                    className="form-control"
                    id="math"
                    type="number"
                    name="math"
                    value={student.math}
                    onChange={onChangeHandler}
                  />
                </div>
                <div className="col-6 mb-2">
                  <label htmlFor="phy" className="form-label">
                    Điểm lý
                  </label>
                  <input
                    className="form-control"
                    id="phy"
                    type="number"
                    name="phy"
                    onChange={onChangeHandler}
                    value={student.phy}
                  />
                </div>
                <div className="col-6 mb-2">
                  <label htmlFor="chem" className="form-label">
                    Điểm hoá
                  </label>
                  <input
                    className="form-control"
                    id="chem"
                    name="chem"
                    type="number"
                    onChange={onChangeHandler}
                    value={student.chem}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-primary mt-3 "
                  type="submit"
                  disabled={isDisabledSubmitBtn}
                >
                  {formMode === FORM_MODE.CREATE
                    ? "Thêm mới học sinh"
                    : "Cập nhật học sinh"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewStudent;
