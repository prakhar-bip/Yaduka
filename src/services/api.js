// Frontend API client communicating with the FastAPI backend
const API_BASE = '/api';

export async function scanWebsite(url) {
  const response = await fetch(`${API_BASE}/intake/scan-website`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url })
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({ detail: 'Failed to scan website' }));
    throw new Error(err.detail || 'Failed to scan website');
  }
  return response.json();
}

export async function submitComprehensiveIntake(payload) {
  const response = await fetch(`${API_BASE}/intake/comprehensive`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({ detail: 'Failed to submit comprehensive business profile' }));
    throw new Error(err.detail || 'Failed to submit comprehensive business profile');
  }
  return response.json();
}

export async function getMarketResearch(businessId) {
  const response = await fetch(`${API_BASE}/research/${businessId}`);
  if (!response.ok) {
    throw new Error('Failed to retrieve market research report');
  }
  return response.json();
}

export async function generateMarketResearch(businessId) {
  const response = await fetch(`${API_BASE}/research/generate/${businessId}`, {
    method: 'POST'
  });
  if (!response.ok) {
    throw new Error('Failed to generate market research report');
  }
  return response.json();
}

export async function getBusinessProfile(id) {
  const response = await fetch(`${API_BASE}/intake/${id}`);
  if (!response.ok) {
    throw new Error('Failed to retrieve business profile');
  }
  return response.json();
}

export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    return await res.json();
  } catch (e) {
    return { status: 'offline', error: e.message };
  }
}

// --- Step 4 & 5: Strategy War Room & Master Execution Plan ---

export async function startStrategySession(businessId) {
  const response = await fetch(`${API_BASE}/strategy/start/${businessId}`, {
    method: 'POST'
  });
  if (!response.ok) {
    throw new Error('Failed to start strategy session');
  }
  return response.json();
}

export async function sendStrategyMessage(sessionId, userMessage, decisionType = null) {
  const response = await fetch(`${API_BASE}/strategy/message`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      session_id: sessionId,
      user_message: userMessage,
      decision_type: decisionType
    })
  });
  if (!response.ok) {
    throw new Error('Failed to send strategy message');
  }
  return response.json();
}

export async function finalizeMasterPlan(businessId, agreedStrategy = null) {
  const response = await fetch(`${API_BASE}/strategy/finalize/${businessId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ agreed_strategy: agreedStrategy })
  });
  if (!response.ok) {
    throw new Error('Failed to generate master execution plan');
  }
  return response.json();
}

export async function getMasterPlan(businessId) {
  const response = await fetch(`${API_BASE}/strategy/plan/${businessId}`);
  if (!response.ok) {
    throw new Error('Failed to retrieve master execution plan');
  }
  return response.json();
}
