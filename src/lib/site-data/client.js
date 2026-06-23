import { seedSite } from './seed'
import { migrateLegacySite } from '../builder/migrateLegacyPage'

const DB = 'site-builder-db'
const STORE = 'documents'

function idb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB, 1)
    request.onupgradeneeded = () => request.result.createObjectStore(STORE)
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

async function getLocal(key) {
  const db = await idb()
  return new Promise((resolve) => {
    const tx = db.transaction(STORE)
    const request = tx.objectStore(STORE).get(key)
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => resolve(null)
  })
}

async function setLocal(key, value) {
  const db = await idb()
  return new Promise((resolve) => {
    const tx = db.transaction(STORE, 'readwrite')
    tx.objectStore(STORE).put(value, key)
    tx.oncomplete = () => resolve()
  })
}

async function api(path, opts = {}) {
  const response = await fetch(path, {
    headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
    ...opts,
  })
  if (!response.ok) throw new Error(await response.text())
  return response.json()
}

function normalizeSite(site) {
  return migrateLegacySite(site || seedSite)
}

export async function loadSite(mode = 'published') {
  try {
    return normalizeSite(await api(`/api/site?mode=${mode}`))
  } catch {
    return normalizeSite((await getLocal(mode)) || seedSite)
  }
}

export async function saveDraft(site) {
  const next = normalizeSite({
    ...site,
    updatedAt: new Date().toISOString(),
    publishState: { ...site.publishState, hasDraftChanges: true, lastDraftSavedAt: new Date().toISOString() },
  })
  try {
    await api('/api/site', { method: 'POST', body: JSON.stringify({ mode: 'draft', site: next }) })
  } catch {
    await setLocal('draft', next)
  }
  return next
}

export async function publishSite(site) {
  const next = normalizeSite({
    ...site,
    updatedAt: new Date().toISOString(),
    publishState: { ...site.publishState, hasDraftChanges: false, lastPublishedAt: new Date().toISOString() },
  })
  try {
    await api('/api/site', { method: 'POST', body: JSON.stringify({ mode: 'published', site: next }) })
    await api('/api/site', { method: 'POST', body: JSON.stringify({ mode: 'draft', site: next }) })
  } catch {
    await setLocal('published', next)
    await setLocal('draft', next)
  }
  return next
}

export async function login(password) {
  return api('/api/auth', { method: 'POST', body: JSON.stringify({ password }) })
}
