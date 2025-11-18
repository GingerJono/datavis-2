import React from 'react';

const emptyState = (label) => (
  <div className="empty-state">No {label} content available.</div>
);

export function AspPanel({ output, view }) {
  const htmlMap = {
    Submission: output?.OutputSubmissionSummary,
    Renewal: output?.OutputRenewalTermsComparison,
    Missing: output?.OutputWhatsMissing,
    Links: output?.JobID ? `
      <div class="asp-links">
        <a href="https://common-dalint-api-management.azure-api.net/dev/dalint/api/v1/cytora/email-download/${output.JobID}?subscription-key=9a84719bcc7541b6a525b7be4377e8be" target="_blank" rel="noreferrer">Cytora Email Download</a>
        <a href="https://common-dalint-api-management.azure-api.net/dev/dalint/api/v1/pricing/prop-om-pricing-sheet/${output.JobID}?subscription-key=c219dc02b3ea4f3280fd6673c2e19900" target="_blank" rel="noreferrer">Property OM Pricing Sheet</a>
      </div>`
      : null,
  };

  const html = htmlMap[view];
  if (html) {
    return <div className="asp-panel" dangerouslySetInnerHTML={{ __html: html }} />;
  }

  return <div className="asp-panel">{emptyState(view.toLowerCase())}</div>;
}
