"use client";
import { usePathname, useSearchParams } from "next/navigation";

interface configType {
  API_URL: string;
}
// Switches between different environments
const configSwitcher = (environmentType: string) => {
  // const pathname = usePathname();
  // const searchParams = useSearchParams();

  console.log("window.location.hostname>>>>", window.location.hostname);
  let configuration;

  switch (environmentType) {
    case "localhost":
      configuration = {
        API_URL: `http://localhost:3000/api/`,
      };
      break;
    case "tailor05.vercel.app":
      configuration = {
        API_URL: `https:/tailor05.vercel.app/api/`,
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
// export const config = configSwitcher(window.location.hostname);
export const config =
  typeof window !== "undefined"
    ? configSwitcher(window.location.hostname)
    : { API_URL: "" };
