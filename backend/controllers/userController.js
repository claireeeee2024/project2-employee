import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import { validateDocumentSequence } from "../utils/validation.js";



// @desc    Get all employees profile
// @route   GET /api/users/profile
// @access  Private/Admin
export const getEmployeeProfiles = asyncHandler(async (req, res) => {
    const employees = await User.find()
        .sort({ 'personalInfo.lastName': 1 })
        .select('personalInfo.firstName personalInfo.lastName personalInfo.ssn citizenshipStatus.workAuthorizationType contactInfo.cellPhone email');

      // Calculate total number of employees
      const totalEmployees = employees.length;

      // Format the employee data
      const formattedEmployees = employees.map(employee => ({
        id: employee._id,
        name: `${employee.personalInfo.lastName}, ${employee.personalInfo.firstName}`,
        ssn: employee.personalInfo.ssn,
        workAuthorizationTitle: employee.citizenshipStatus.workAuthorizationType || 'N/A',
        phoneNumber: employee.contactInfo.cellPhone,
        email: employee.email
      }));

      res.status(200).json({
        totalEmployees,
        employees: formattedEmployees
      });
});


// @desc    Get one employee profile
// @route   GET /api/users/profile/:id
// @access  Private/Admin
// maybe merge with get personal information
export const getEmployeeFullProfile = asyncHandler(async (req, res) => {
    const { employeeId } = req.params;

    const employee = await User.findById(employeeId)
      .select('-password'); // Exclude the password field

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json(employee);
})


// @desc    Get one user's visa status by ID (for employee)
// @route   GET /api/users/visa-status/:id
// @access  Private
export const getVisaStatusById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json({
        visaStatus: user.visaStatus,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  });

  // @desc    Upload user visa files (for employee)
  // @route   PUT /api/users/visa-status/:id
  // @access  Private
  export const updateVisaStatus = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    const documentSequence = ['optReceipt', 'optEAD', 'i983', 'i20'];
    if (user) {
        const { documentType, file } = req.body; // Assuming file is a string (file path or URL)

        if (!documentType || !file) {
            res.status(400);
            throw new Error("Document type and file are required");
        }

        // Validate the document
        const validationResult = validateDocumentSequence(user, documentType);
        if (!validationResult.isValid) {
          return res.status(400).json({ message: validationResult.message });
        }

        // Update the document status and file path
      
        const updateData = {
          [`visaStatus.documents.${documentType}.file`]: file,
          [`visaStatus.documents.${documentType}.status`]: 'Pending',
          'visaStatus.currentDocument': documentType
        };

        const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json({ message: 'Document uploaded successfully', visaStatus: updatedUser.visaStatus });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
  })


// @desc    Update visa document status (HR approve or reject visa document)
// @route   PUT /api/users/visa-document-status/:id
// @access  Private/Admin
export const updateVisaDocumentStatus = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("Employee not found");
    }

    const { documentType, status, feedback } = req.body;
    if (!documentType || !status) {
        res.status(400);
        throw new Error("Document type and status are required");
    }

    // Validate the document type
    const validationResult = validateDocumentSequence(user, documentType);
    if (!validationResult.isValid) {
      return res.status(400).json({ message: validationResult.message });
    }

    // Update the document status
    const updateData = {
        [`visaStatus.documents.${documentType}.status`]: status,
        [`visaStatus.documents.${documentType}.feedback`]: feedback
    };
    const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json({ message: 'Document status updated successfully', visaStatus: updatedUser.visaStatus });


})

// @desc    Get all users' visa status (HR view)
// @route   GET /api/users/visa-status
// @access  Private/Admin
export const getAllVisaStatus = asyncHandler(async (req, res) => {
    const users = await User.find({}).select('personalInfo.firstName personalInfo.lastName citizenshipStatus visaStatus');
    res.json(users);
});


// @desc    Get all users with in-progress visa status (HR view)
// @route   GET /api/users/visa-status/in-progress
// @access  Private/Admin
export const getVisaStatusInProgress = asyncHandler(async (req, res) => {
    const users = await User.find({
        'visaStatus.currentDocument': { $ne: null },
        $or: [
          { 'visaStatus.documents.optReceipt.status': { $ne: 'Approved' } },
          { 'visaStatus.documents.optEAD.status': { $ne: 'Approved' } },
          { 'visaStatus.documents.i983.status': { $ne: 'Approved' } },
          { 'visaStatus.documents.i20.status': { $ne: 'Approved' } }
        ]
      }).select('personalInfo.firstName personalInfo.lastName citizenshipStatus visaStatus');
    res.json(users);
});


// @desc search employee
// @route GET /api/users/search
// @access Private
export const searchEmployee = asyncHandler(async (req, res) => {
    const { searchTerm } = req.query;
    const users = await User.find({
      $or: [
        { 'personalInfo.firstName': { $regex: searchTerm, $options: 'i' } },
        { 'personalInfo.lastName': { $regex: searchTerm, $options: 'i' } },
        { 'personalInfo.preferredName': { $regex: searchTerm, $options: 'i' } }
      ]
    }).select('personalInfo.firstName personalInfo.lastName personalInfo.preferredName');
    res.status(200).json(users);
});

