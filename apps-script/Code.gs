/**
 * Gym Quest leaderboard backend (Google Apps Script).
 *
 * Setup: create a Google Sheet > Extensions > Apps Script > paste this file > change KEY below >
 * Deploy > New deployment > type "Web app" > Execute as "Me", Who has access "Anyone" >
 * copy the /exec URL into gym-quest/js/config.js (ENDPOINT) and use the same KEY there.
 *
 * Sheets (created automatically):
 *   Profiles : one row per student. A name can be registered only once ("one profile per student").
 *   Scores   : one row per student with their badge list and badge count (the leaderboard).
 */
var KEY = 'gq-change-me';

function doGet(e) { return handle_(e.parameter || {}); }
function doPost(e) {
  var body = {};
  try { body = JSON.parse(e.postData.contents); } catch (err) { return out_({ ok: false, error: 'bad json' }); }
  return handle_(body);
}

function handle_(p) {
  if (p.key !== KEY) return out_({ ok: false, error: 'bad key' });
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    switch (p.action) {
      case 'register': return out_(register_(p));
      case 'score': return out_(score_(p));
      case 'leaderboard': return out_(leaderboard_());
      default: return out_({ ok: false, error: 'unknown action' });
    }
  } finally { lock.releaseLock(); }
}

function out_(obj) { return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON); }
function sheet_(name, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet(), sh = ss.getSheetByName(name);
  if (!sh) { sh = ss.insertSheet(name); sh.appendRow(headers); sh.setFrozenRows(1); }
  return sh;
}
function nameKey_(name) { return String(name || '').toLowerCase().replace(/\s+/g, ' ').trim(); }
function clean_(s, n) { return String(s || '').replace(/[<>]/g, '').substring(0, n || 60); }

function register_(p) {
  var name = clean_(p.name, 40), stream = clean_(p.stream, 2), level = Number(p.level);
  if (!name || ['G1', 'G2', 'G3'].indexOf(stream) < 0 || [1, 2, 3, 4].indexOf(level) < 0) return { ok: false, error: 'invalid' };
  var sh = sheet_('Profiles', ['nameKey', 'name', 'stream', 'level', 'created']);
  var key = nameKey_(name), data = sh.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) if (data[i][0] === key) return { ok: false, error: 'exists' };
  sh.appendRow([key, name, stream, level, new Date()]);
  return { ok: true };
}

function score_(p) {
  var name = clean_(p.name, 40), key = nameKey_(name);
  var gyms = (p.gyms || []).slice(0, 400).map(function (g) { return clean_(g, 80); });
  var sh = sheet_('Scores', ['nameKey', 'name', 'stream', 'level', 'badges', 'lastBadgeAt', 'avatar', 'gyms']);
  var data = sh.getDataRange().getValues(), row = -1;
  for (var i = 1; i < data.length; i++) if (data[i][0] === key) { row = i + 1; break; }
  var vals = [key, name, clean_(p.stream, 2), Number(p.level) || 1, gyms.length, new Date(), JSON.stringify(p.avatar || {}).substring(0, 400), gyms.join(',')];
  if (row < 0) sh.appendRow(vals); else sh.getRange(row, 1, 1, vals.length).setValues([vals]);
  return { ok: true, badges: gyms.length };
}

function leaderboard_() {
  var sh = sheet_('Scores', ['nameKey', 'name', 'stream', 'level', 'badges', 'lastBadgeAt', 'avatar', 'gyms']);
  var data = sh.getDataRange().getValues(), rows = [];
  for (var i = 1; i < data.length; i++) {
    var av = {}; try { av = JSON.parse(data[i][6] || '{}'); } catch (e) {}
    rows.push({ name: data[i][1], stream: data[i][2], level: data[i][3], badges: Number(data[i][4]) || 0, at: data[i][5] ? new Date(data[i][5]).getTime() : 0, avatar: av });
  }
  rows.sort(function (a, b) { return b.badges - a.badges || a.at - b.at; });
  return { ok: true, rows: rows.slice(0, 100) };
}
