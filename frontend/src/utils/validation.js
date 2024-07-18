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
export const validateName = (name) => {
  if (!name) {
    return "Name is required";
  } else if (name.length < 5) {
    return "Name must be at least 5 characters";
  }
  return null;
};

export const validateUsername = (username) => {
  if (!username) {
    return "Username is required";
  } else if (username.length < 2) {
    return "Username must be at least 2 characters";
  }
  return null;
};

export const validateForm = (username, password, email) => {
  const errors = {};
  if (username) errors.username = validateUsername(username);
  if (password) errors.password = validatePassword(password);
  if (email) errors.email = validateEmail(email);
  return errors;
};

export const mapDocumentType = (frontendDocType) => {
  const mapping = {
    "OPT Receipt": "optReceipt",
    "OPT EAD": "optEAD",
    "I-983": "i983",
    "I-20": "i20",
  };
  return mapping[frontendDocType] || frontendDocType;
};
