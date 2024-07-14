const registrations = [
  {
    email: "hr@email.com",
    name: "hrtest",
    registrationToken:
      "37b5182641f9f53c8698f40b9d767e455c5dc12b1ec27ff081745fa947e53f12",
    expiresAt: new Date(Date.now() + 3 * 60 * 60 * 1000),
    status: "Not Submitted",
  },
  {
    name: "token1",
    email: "token1@example.com",
    registrationToken:
      "9ede343e8236fd2ac24ba843ff254c18666c92f66e3d2a4ed957e8c274cec00d",
    expiresAt: new Date(Date.now() + 3 * 60 * 60 * 1000),
    status: "Submitted",
  },
  {
    name: "token2",
    email: "token2@example.com",
    registrationToken:
      "cb9a0c1a5bd307128f3f5c9a55b82d67ae47a6ddfdfdb7a977107c91c0d9f934",
    status: "Not Submitted",
    expiresAt: new Date(Date.now() + 3 * 60 * 60 * 1000),
  },
];

export default registrations;
