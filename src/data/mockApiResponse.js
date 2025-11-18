export const mockApiResponse = {
  riskId: 181,
  programme: {
    meta: {
      programmeReference: '016954A25A',
      lastUpdated: '2025-05-31',
    },
    statusSummary: [
      { label: 'Bound', value: 38 },
      { label: 'TBA', value: 14 },
      { label: 'Declined', value: 8 },
      { label: 'Lead Only', value: 6 },
    ],
    parties: [
      { role: 'Assured', name: 'Beacon Infrastructure Ltd', programmes: 3, premium: 24.8 },
      { role: 'Reinsured', name: 'Blue Horizon Mutual', programmes: 5, premium: 41.2 },
      { role: 'Broker', name: 'Arc & Finch', programmes: 9, premium: 88.1 },
      { role: 'Broker Contact', name: 'Jessie Morgan', programmes: 9, premium: 88.1 },
    ],
    premiumHistory: [
      { year: '2021', written: 12.4, signed: 10.1 },
      { year: '2022', written: 18.1, signed: 14.6 },
      { year: '2023', written: 22.6, signed: 19.3 },
      { year: '2024', written: 26.8, signed: 23.2 },
      { year: '2025', written: 28.9, signed: 25.6 },
    ],
    rateChange: [
      { segment: 'All Risk', change: 6.1, p25: 2.5, p75: 8.3 },
      { segment: 'North America', change: 7.4, p25: 4.2, p75: 10.6 },
      { segment: 'EMEA', change: 3.8, p25: 1.1, p75: 6.4 },
      { segment: 'APAC', change: 5.5, p25: 3.2, p75: 7.1 },
    ],
  },
  aspOutputs: {
    OutputSubmissionSummary: '<div class="asp-block"><h3>Submission summary</h3><ul><li>All sections present</li><li>Loss runs attached</li><li>Schedule of values validated</li></ul></div>',
    OutputRenewalTermsComparison: '<div class="asp-block"><h3>Renewal terms</h3><p>Line size and attachment increased +10% versus PY.</p></div>',
    OutputWhatsMissing: '<div class="asp-block warning">Statement of values missing natural hazard scores for 11 locations.</div>',
    JobID: 302,
  },
};
