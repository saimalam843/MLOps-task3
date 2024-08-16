

export const validateLogin = (loginFormData: any) => {
    let valid = true;
    const errors = { email: "", password: "" };
  
    if (!loginFormData.email) {
      errors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginFormData.email)) {
      errors.email = "Invalid email format";
      valid = false;
    }
  
    if (!loginFormData.password) {
      errors.password = "Password is required";
      valid = false;
    } else if (loginFormData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
      valid = false;
    }
  
    return { valid, errors };
  };
  
  export const validateSignup = (signupFormData: any) => {
    let valid = true;
    const errors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      budget: "",
    };
  
    if (!signupFormData.firstName) {
      errors.firstName = "First Name is required";
      valid = false;
    } else if (!/^[A-Za-z\s-]{1,50}$/.test(signupFormData.firstName)) {
      errors.firstName = "First Name should be up to 50 characters long and only contain alphabets, spaces, or hyphens";
      valid = false;
    }
  
    if (!signupFormData.lastName) {
      errors.lastName = "Last Name is required";
      valid = false;
    } else if (!/^[A-Za-z\s-]{1,50}$/.test(signupFormData.lastName)) {
      errors.lastName = "Last Name should be up to 50 characters long and only contain alphabets, spaces, or hyphens";
      valid = false;
    }
  
    if (!signupFormData.email) {
      errors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupFormData.email)) {
      errors.email = "Invalid email format";
      valid = false;
    }
  
    if (!signupFormData.password) {
      errors.password = "Password is required";
      valid = false;
    } else if (signupFormData.password.length < 8 || !/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])/.test(signupFormData.password)) {
      errors.password = "Password must be at least 8 characters long and include letters, numbers, and special characters";
      valid = false;
    }
  
    if (signupFormData.password !== signupFormData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      valid = false;
    }
  
    if (!signupFormData.budget) {
      errors.budget = "Budget is required";
      valid = false;
    } else if (!/^\d{1,8}$/.test(signupFormData.budget) || Number(signupFormData.budget) < 1 || Number(signupFormData.budget) > 99999999) {
      errors.budget = "Budget must be a number between 1 and 99999999";
      valid = false;
    }
  
    return { valid, errors };
  };
  