import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { validateDocumentSequence , mapDocumentType} from "../utils/validation.js";

// @desc    Get all employees profile
// @route   GET /api/hr/profile
// @access  Private/Admin
export const getEmployeeProfiles = asyncHandler(async (req, res) => {
    const employees = await User.find()
      .sort({ "personalInfo.lastName": 1 })
      .select(
        "personalInfo.firstName personalInfo.lastName personalInfo.ssn citizenshipStatus.workAuthorizationType contactInfo.cellPhone email"
      );
  
    // Calculate total number of employees
  
    // Format the employee data
    const formattedEmployees = employees.map((employee) => ({
      id: employee._id,
      name: `${employee.personalInfo.lastName}, ${employee.personalInfo.firstName}`,
      ssn: employee.personalInfo.ssn,
      workAuthorizationTitle:
        employee.citizenshipStatus.workAuthorizationType || "N/A",
      phoneNumber: employee.contactInfo.cellPhone,
      email: employee.email,
    }));
  
    res.status(200).json({
      employees: formattedEmployees,
    });
  });
  
  // @desc    Get one employee profile
  // @route   GET /api/hr/profile/:id
  // @access  Private/Admin
  // maybe merge with get personal information
  export const getEmployeeFullProfile = asyncHandler(async (req, res) => {
    const  employeeId  = req.params.id;

  
    const employee = await User.findById(employeeId).select("-password"); // Exclude the password field
  
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
  
    res.status(200).json(employee);
  });

  // @desc    Update visa document status (HR approve or reject visa document)
// @route   PUT /api/hr/visa-document-status/:id
// @access  Private/Admin
export const updateVisaDocumentStatus = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("Employee not found");
  }

  let { document: frontendDocumentType, status, feedback } = req.body;
  
  if (!frontendDocumentType || !status) {
    res.status(400);
    throw new Error("Document type and status are required");
  }

  // Map the frontend document type to the backend field name
  const documentType = mapDocumentType(frontendDocumentType);

  // Validate the document type
  const validationResult = validateDocumentSequence(user, frontendDocumentType);
  if (!validationResult.isValid) {
    return res.status(400).json({ message: validationResult.message });
  }

  // Update the document status
  const updateData = {
    [`visaStatus.documents.${documentType}.status`]: status,
    [`visaStatus.documents.${documentType}.feedback`]: feedback,
  };

  // if (status === "Approved") {

  //   const documentSequence = ["optReceipt", "optEAD", "i983", "i20"];
    
  //   // Find the index of the current document
  //   const currentIndex = documentSequence.indexOf(documentType);
    
  //   // If there's a next document in the sequence, set it as the current document
  //   if (currentIndex < documentSequence.length - 1) {
  //     const nextDocument = documentSequence[currentIndex + 1];
  //     updateData["visaStatus.currentDocument"] = mapDocumentTypeToFrontend(nextDocument);
  //   } else {
  //     // If it's the last document, set currentDocument to null or some final state
  //     updateData["visaStatus.currentDocument"] = null;
  //   }
  // }


  const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, {new: true,});

  res.json({
    message: "Document status updated successfully",
    visaStatus: updatedUser.visaStatus,
  });
});
  
  // @desc    Get all users' visa status (HR view)
  // @route   GET /api/hr/visa-status
  // @access  Private/Admin
  export const getAllVisaStatus = asyncHandler(async (req, res) => {
    const users = await User.find({}).select(
      "personalInfo.firstName personalInfo.lastName citizenshipStatus visaStatus"
    );
    res.json(users);
  });
  
  // @desc    Get all users with in-progress visa status (HR view)
  // @route   GET /api/users/visa-status/in-progress
  // @access  Private/Admin
  export const getVisaStatusInProgress = asyncHandler(async (req, res) => {
    const users = await User.find({
      "visaStatus.currentDocument": { $ne: null },
      $or: [
        { "visaStatus.documents.optReceipt.status": { $ne: "Approved" } },
        { "visaStatus.documents.optEAD.status": { $ne: "Approved" } },
        { "visaStatus.documents.i983.status": { $ne: "Approved" } },
        { "visaStatus.documents.i20.status": { $ne: "Approved" } },
      ],
    }).select(
      "personalInfo.firstName personalInfo.lastName citizenshipStatus visaStatus"
    );
    res.json(users);
  });
  
  // @desc search employee
  // @route GET /api/hr/search
  // @access Private
  export const searchEmployee = asyncHandler(async (req, res) => {
    const { searchTerm } = req.query;
    const users = await User.find({
      $or: [
        { "personalInfo.firstName": { $regex: searchTerm, $options: "i" } },
        { "personalInfo.lastName": { $regex: searchTerm, $options: "i" } },
        { "personalInfo.preferredName": { $regex: searchTerm, $options: "i" } },
      ],
    }).select(
      "personalInfo.firstName personalInfo.lastName personalInfo.preferredName"
    );
    res.status(200).json(users);
  });
  