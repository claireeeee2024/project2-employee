import User from "../models/userModel.js";

export const validateEmail = (email) => {
  if (!email) {
    return "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    return "Email is invalid";
  }
  return null;
};

export const validatePassword = (password) => {
  if (!password) {
    return "Password is required";
  } else if (password.length < 6) {
    return "Password must be at least 6 characters";
  }
  return null;
};

/**
 * Validates the document sequence for a given user and document type.
 *
 * @param {Object} user - The user object containing the visa status documents.
 * @param {string} documentType - The type of document to validate the sequence for.
 * @returns {Object} An object with 'isValid' boolean and 'message' string.
 */
export const validateDocumentSequence = (user, documentType) => {
  // Validate the document type

  const documentSequence = ['OPT Receipt', 'OPT EAD', 'I-983', 'I-20'];
  if (!documentSequence.includes(documentType)) {
    return { isValid: false, message: "Invalid document type" };
  }

  // Validate document sequence
  const currentIndex = documentSequence.indexOf(documentType);
  if (currentIndex > 0) {
    const previousDocumentType = mapDocumentType(documentSequence[currentIndex - 1]);
    const previousDocument = user.visaStatus.documents[previousDocumentType];

    if (!previousDocument || previousDocument.status !== 'Approved') {
      return { isValid: false, message: "Previous document must be approved before uploading" };
    }
  }

  // Check if the current document has already been approved
  const document = mapDocumentType(documentType);
  if (user.visaStatus.documents[document] && user.visaStatus.documents[document].status === 'Approved') {
    return { isValid: false, message: "This document has already been approved and cannot be changed" };
  }

  return { isValid: true, message: "Document sequence is valid" };
};

export const validateUsername = (username) => {
  if (!username) {
    return "Username is required";
  } else if (username.length < 5) {
    return "Username must be at least 5 characters";
  }
  return null;
};

export const mapDocumentType = (frontendDocType) => {
  const mapping = {
    'OPT Receipt': 'optReceipt',
    'OPT EAD': 'optEAD',
    'I-983': 'i983',
    'I-20': 'i20'
  };
  return mapping[frontendDocType] || frontendDocType;
};