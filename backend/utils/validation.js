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
