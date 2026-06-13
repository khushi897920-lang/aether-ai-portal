import Employee from '../models/Employee.js';

// @desc    Fetch all employee entries
// @route   GET /api/employees
// @access  Private
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({});
    return res.status(200).json(employees);
  } catch (error) {
    console.error('getEmployees Pipeline Exception:', error.message);
    return res.status(500).json({
      message: 'Failed to retrieve employee ledger: ' + error.message
    });
  }
};

// @desc    Create a new employee record
// @route   POST /api/employees
// @access  Private
export const createEmployee = async (req, res) => {
  try {
    const { name, email, department, role, status, salary, joinDate } = req.body;

    if (!name || !email || !department || !role || salary === undefined || !joinDate) {
      return res.status(400).json({
        message: 'Required input fields (name, email, department, role, salary, joinDate) are missing'
      });
    }

    // Check email uniqueness in database
    const employeeExists = await Employee.findOne({ email });
    if (employeeExists) {
      return res.status(400).json({
        message: 'Duplicate record: Employee email already registered in Atlas'
      });
    }

    const employee = await Employee.create({
      name,
      email,
      department,
      role,
      status: status || 'Active',
      salary,
      joinDate
    });

    return res.status(201).json(employee);
  } catch (error) {
    console.error('createEmployee Pipeline Exception:', error.message);
    return res.status(500).json({
      message: 'Failed to register employee node: ' + error.message
    });
  }
};

// @desc    Update individual employee profile
// @route   PUT /api/employees/:id
// @access  Private
export const updateEmployee = async (req, res) => {
  try {
    const { name, email, department, role, status, salary, joinDate } = req.body;

    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({
        message: 'Employee record not found for unique ID'
      });
    }

    // Check if updating email to another existing employee's email
    if (email && email.toLowerCase() !== employee.email.toLowerCase()) {
      const emailExists = await Employee.findOne({ email });
      if (emailExists) {
        return res.status(400).json({
          message: 'Conflict: Email already associated with another employee'
        });
      }
    }

    // Apply modifications cleanly
    employee.name = name ?? employee.name;
    employee.email = email ?? employee.email;
    employee.department = department ?? employee.department;
    employee.role = role ?? employee.role;
    employee.status = status ?? employee.status;
    employee.salary = salary ?? employee.salary;
    employee.joinDate = joinDate ?? employee.joinDate;

    const updatedEmployee = await employee.save();
    return res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error('updateEmployee Pipeline Exception:', error.message);
    return res.status(500).json({
      message: 'Failed to update employee record: ' + error.message
    });
  }
};

// @desc    Remove employee record permanently
// @route   DELETE /api/employees/:id
// @access  Private
export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({
        message: 'Employee record not found for unique ID'
      });
    }

    await employee.deleteOne();
    return res.status(200).json({
      message: 'Employee record removed successfully'
    });
  } catch (error) {
    console.error('deleteEmployee Pipeline Exception:', error.message);
    return res.status(500).json({
      message: 'Failed to delete employee record: ' + error.message
    });
  }
};
