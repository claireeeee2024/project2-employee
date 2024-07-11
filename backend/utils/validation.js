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

export const validateUsername = (username) => {
  if (!username) {
    return "Username is required";
  } else if (username.length < 5) {
    return "Username must be at least 5 characters";
  }
  return null;
};
