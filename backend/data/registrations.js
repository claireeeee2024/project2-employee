const registrations = [
  // hr onboarding approved
  {
    name: "Hr Williams",
    email: "hr@email.com",
    registrationToken:
      "8a9bfbf37387bb5940c560698e4ce6b71668cdf415c31071aed7d7396c407caa",
    expiresAt: new Date(Date.now() + 3 * 60 * 60 * 1000),
    status: "Submitted",
  },
  // registered, not submitted
  {
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    registrationToken:
      "bf0ca79148131afe4e2db89602162d8db4f4aa004fa0790361f17f934deea6e8",
    status: "Not Submitted",
    expiresAt: new Date(Date.now() + 3 * 60 * 60 * 1000),
  },
  // onboarding not submitted
  {
    name: "David Brown",
    email: "david.brown@example.com",
    registrationToken:
      "0edc5d200c49e7e2b96bef139585226e7cfc2d56c8d25bcdc2466032c74a57e1",
    status: "Not Submitted",
    expiresAt: new Date(Date.now() + 3 * 60 * 60 * 1000),
  },
  // onboarding citizen rejected
  {
    name: "Carol Lee",
    email: "carol.lee@example.com",
    registrationToken:
      "193b1500cf84e029ec554dfad88375ad3d4659ffcd84e38ad740151606f8c959",
    status: "Submitted",
    expiresAt: new Date(Date.now() + 3 * 60 * 60 * 1000),
  },
  // onboarding opt recipt pending
  {
    name: "Eva Martin",
    email: "eva.martin@example.com",
    registrationToken:
      "75f99af29330831f5d2d39871afce4d72d56e6c2e8af165e1d29e1adf9f60061",
    status: "Submitted",
    expiresAt: new Date(Date.now() + 3 * 60 * 60 * 1000),
  },
  // onboarding opt recipt rejected
  {
    name: "Bob Williams",
    email: "bob.williams@example.com",
    registrationToken:
      "9d06944bd2d09ea9e580716425c18967ff47c25c09a9bbc02d8e88a7f2a1572b1",
    expiresAt: new Date(Date.now() + 3 * 60 * 60 * 1000),
    status: "Submitted",
  },
  // visa opt ead pending
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    registrationToken:
      "3698ca210d9a84da525a9876853b8d8520be6c474170ea71ac0d1a1de7198c74",
    expiresAt: new Date(Date.now() + 3 * 60 * 60 * 1000),
    status: "Submitted",
  },
  // token 1 expired
  {
    name: "token1",
    email: "token1@example.com",
    registrationToken:
      "e5be70a04565a438b9299b4e379803fb342ec7da4d4509a31b24dcf5aeac5121",
    expiresAt: new Date(),
    status: "Not Submitted",
  },
];

export default registrations;
