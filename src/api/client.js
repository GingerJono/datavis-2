const baseUrl = 'https://common-dalint-api-management.azure-api.net/dev/dalint/api/v1';
const subscriptionKey = '9a84719bcc7541b6a525b7be4377e8be';

export async function fetchAspOutputs(riskId) {
  const url = `${baseUrl}/risk/asp-outputs/${riskId}?subscription-key=${subscriptionKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load ASP outputs (${response.status})`);
  }
  const payload = await response.json();
  return payload?.risk_asp_outputs?.[0] ?? {};
}

export async function fetchProgrammeData(riskId) {
  const url = `${baseUrl}/risk/programme/${riskId}?subscription-key=${subscriptionKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load programme data (${response.status})`);
  }
  return response.json();
}
