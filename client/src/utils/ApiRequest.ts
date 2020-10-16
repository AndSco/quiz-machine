export default async (endpoint: string, target: "trivia" | "programming") => {
  const response = await (await fetch(endpoint)).json();
  return target === "programming" ? response : response.results;
};
