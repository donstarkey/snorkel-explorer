export function getApiBase() {
  if (window.location.hostname === "localhost") {
    return "";
  }

  return "https://snorkel-explorer-api-fkdrfydqepcpeuga.azurewebsites.net";
}
