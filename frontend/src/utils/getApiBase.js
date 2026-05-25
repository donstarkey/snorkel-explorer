export function getApiBase() {
  if (window.location.hostname === "localhost") {
    return "http://localhost:5000";
  }

  return "https://snorkel-explorer-api-fkdrfydqepcpeuga.azurewebsites.net";
}
