import React, { useEffect, useMemo, useState } from 'react';
import { TabNavigation } from './components/TabNavigation';
import { ContextToggle } from './components/ContextToggle';
import { StatusBarChart } from './components/StatusBarChart';
import { PremiumHistoryChart } from './components/PremiumHistoryChart';
import { RateChangePlot } from './components/RateChangePlot';
import { PartiesTable } from './components/PartiesTable';
import { MetaStrip } from './components/MetaStrip';
import { AspPanel } from './components/AspPanel';
import { fetchAspOutputs, fetchProgrammeData } from './api/client';
import { mockApiResponse } from './data/mockApiResponse';

const tabs = [
  { id: 'asp', label: 'ASP', context: 'asp' },
  { id: 'snapshot', label: 'Snapshot', context: 'portfolio' },
  { id: 'stratification', label: 'Stratification', context: 'portfolio' },
  { id: 'claims', label: 'Claims', context: 'portfolio' },
  { id: 'modelling', label: 'Modelling', context: 'portfolio' },
  { id: 'geography', label: 'Geography', context: 'portfolio' },
  { id: 'history', label: 'History', context: 'portfolio' },
  { id: 'pricing', label: 'Pricing', context: 'portfolio' },
  { id: 'documents', label: 'Documents', context: 'portfolio' },
  { id: 'exceptions', label: 'Exceptions', context: 'portfolio' },
  { id: 'links', label: 'Links/Tools', context: 'portfolio' },
  { id: 'audit', label: 'Audit', context: 'portfolio' },
  { id: 'bdx', label: 'Bordereaux', context: 'portfolio' },
  { id: 'acc', label: 'Acc Check', context: 'portfolio' },
];

const portfolioOptions = [
  { label: 'Programme', value: 'Programme' },
  { label: 'Assured', value: 'Assured' },
  { label: 'Broker', value: 'Broker' },
  { label: 'Segment', value: 'Segment' },
  { label: 'Class', value: 'Class' },
];

const aspOptions = [
  { label: 'Submission', value: 'Submission' },
  { label: 'Renewal', value: 'Renewal' },
  { label: 'Missing', value: 'Missing' },
  { label: 'Links', value: 'Links' },
];

function useQueryParam(name) {
  return useMemo(() => new URLSearchParams(window.location.search).get(name), []);
}

export default function App() {
  const [activeTab, setActiveTab] = useState('asp');
  const [portfolioContext, setPortfolioContext] = useState('Programme');
  const [aspView, setAspView] = useState('Submission');
  const [aspOutput, setAspOutput] = useState({});
  const [programmeData, setProgrammeData] = useState(mockApiResponse.programme);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const riskId = useQueryParam('riskid') || mockApiResponse.riskId;

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      setError('');
      try {
        const [asp, programme] = await Promise.allSettled([
          fetchAspOutputs(riskId),
          fetchProgrammeData(riskId),
        ]);

        if (asp.status === 'fulfilled') {
          setAspOutput(asp.value);
        } else {
          setError('Live ASP outputs unavailable. Showing sample content.');
          setAspOutput(mockApiResponse.aspOutputs);
        }

        if (programme.status === 'fulfilled') {
          const mapped = programme.value?.programme || programme.value;
          setProgrammeData(mapped || mockApiResponse.programme);
        } else {
          setProgrammeData(mockApiResponse.programme);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, [riskId]);

  const showPortfolioContext = tabs.find((t) => t.id === activeTab)?.context === 'portfolio';
  const showAspContext = tabs.find((t) => t.id === activeTab)?.context === 'asp';

  return (
    <div className="page">
      <TabNavigation tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="context-bar">
        <ContextToggle
          label="Context"
          options={portfolioOptions}
          value={portfolioContext}
          onChange={setPortfolioContext}
          visible={showPortfolioContext}
        />
        <ContextToggle
          label="ASP"
          options={aspOptions}
          value={aspView}
          onChange={setAspView}
          visible={showAspContext}
        />
        <div className="grow" />
        <div className="id-chip">
          <span className="meta-label">Risk ID</span>
          <strong>{riskId}</strong>
        </div>
        <MetaStrip programmeRef={programmeData?.meta?.programmeReference} lastUpdated={programmeData?.meta?.lastUpdated} />
      </div>

      {error && <div className="banner warning">{error}</div>}
      {isLoading && <div className="banner info">Refreshing data…</div>}

      <main className="tab-content">
        {activeTab === 'snapshot' && (
          <div className="grid">
            <section className="panel">
              <div className="panel-head">
                <h2>Programme line status</h2>
                <span className="chip">{portfolioContext}</span>
              </div>
              <StatusBarChart data={programmeData.statusSummary} />
            </section>

            <section className="panel">
              <div className="panel-head">
                <h2>Parties</h2>
                <span className="chip">Counterparties</span>
              </div>
              <PartiesTable rows={programmeData.parties} />
            </section>

            <section className="panel span-2">
              <div className="panel-head">
                <h2>Programme premium history</h2>
                <span className="chip">Signed vs written</span>
              </div>
              <PremiumHistoryChart data={programmeData.premiumHistory} />
            </section>

            <section className="panel span-2">
              <div className="panel-head">
                <h2>Rate change</h2>
                <span className="chip">YTD insight</span>
              </div>
              <RateChangePlot data={programmeData.rateChange} />
            </section>
          </div>
        )}

        {activeTab === 'asp' && (
          <div className="grid single">
            <section className="panel span-2">
              <div className="panel-head">
                <h2>ASP outputs</h2>
                <span className="chip">{aspView}</span>
              </div>
              <AspPanel output={aspOutput} view={aspView} />
            </section>
          </div>
        )}

        {activeTab !== 'asp' && activeTab !== 'snapshot' && (
          <div className="placeholder">
            <p className="eyebrow">Coming soon</p>
            <h2>{tabs.find((t) => t.id === activeTab)?.label}</h2>
            <p>
              This layout mirrors the original workbench template. Wire your preferred visualisations
              into the panel grid to complete the view.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
