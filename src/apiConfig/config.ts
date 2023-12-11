"use client";

interface configType {
  API_URL: string;
}
// Switches between different environments
const configSwitcher = (environmentType: string) => {
  let configuration: configType;

  switch (environmentType) {
    case "localhost":
      configuration = {
        API_URL: `http://localhost:3000/api/`,
      };
      break;
    default:
      configuration = {
        /* Default Local Config */
        API_URL: `http://localhost:3000/api/`,
      };
  }

  return configuration;
};

// Just change the string to 'local', 'sandbox', 'staging' or 'prod' to switch between different environments.
export const config = configSwitcher(window.location.hostname);
