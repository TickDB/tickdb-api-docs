import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { spawnSync } from 'node:child_process';

// Syntax audit: npm run check:examples
// Optional live checks (require TICKDB_API_KEY): --live-curl, --live-js,
// --live-python, --live-ws, --live-ws-quickstart, --live-ws-standalone.
// Live checks use a few representative examples; an unavailable API is reported
// as a failure instead of being silently treated as a successful code test.

const roots = ['zh-Hans', 'zh-Hant', 'en'];
const executable = new Set(['javascript', 'js', 'python', 'bash', 'sh', 'json']);
const bash = process.platform === 'win32' ? 'bash.exe' : 'bash';

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) return walk(filename);
    return /\.(md|mdx)$/.test(entry.name) ? [filename] : [];
  });
}

function blocks(filename) {
  const source = fs.readFileSync(filename, 'utf8');
  const lines = source.split(/\r?\n/);
  const found = [];
  for (let index = 0; index < lines.length; index++) {
    const opening = lines[index].match(/^```(\w+)(?:\s.*)?$/);
    if (!opening || !executable.has(opening[1])) continue;
    const start = index + 1;
    const body = [];
    while (++index < lines.length && !/^```\s*$/.test(lines[index])) body.push(lines[index]);
    if (index === lines.length) throw new Error(`${filename}:${start}: unterminated fence`);
    found.push({ filename, line: start, language: opening[1], code: body.join('\n') });
  }
  return found;
}

function check(block) {
  const { language, code } = block;
  if (language === 'json') {
    JSON.parse(code);
  } else if (language === 'javascript' || language === 'js') {
    new vm.Script(code, { filename: `${block.filename}:${block.line}` });
  } else if (language === 'python') {
    const encoded = Buffer.from(code, 'utf8').toString('base64');
    const result = spawnSync('python', [
      '-c',
      'import sys, base64; compile(base64.b64decode(sys.argv[1]).decode("utf-8"), "<example>", "exec")',
      encoded,
    ], { encoding: 'utf8', timeout: 10000 });
    if (result.status !== 0) throw new Error(result.error?.message || result.stderr?.trim() || `exit ${result.status}`);
  } else {
    const result = spawnSync(bash, ['-n', '-c', code], { encoding: 'utf8', timeout: 10000 });
    if (result.status !== 0) throw new Error(result.error?.message || result.stderr?.trim() || `exit ${result.status}`);
  }
}

const standaloneDocs = [
  'README.md', 'README.en.md', 'README.zh-Hant.md',
  '资料/A股全量行情-Node.js压缩示例.md',
  '资料/A股全量行情-HTTP-Node.js压缩示例.md',
];
const all = [...roots.flatMap((root) => walk(root)), ...standaloneDocs].flatMap(blocks);
if (process.argv.includes('--live-ws')) {
  if (!process.env.TICKDB_API_KEY) throw new Error('TICKDB_API_KEY is required');
  const selected = all.filter((block) => block.filename.startsWith('zh-Hans') && block.language === 'javascript' && /websocket[\\/]ticker_.*_stock\.mdx$/.test(block.filename));
  let passed = 0;
  for (const block of selected) {
    const instrument = '\nconsole.log = () => {}; ws.on("open", () => console.error("AUDIT_OPEN")); ws.on("message", (raw) => { const value = JSON.parse(raw.toString()); const items = Array.isArray(value) ? value : [value]; if (items.some((item) => item.cmd === "ticker")) { console.error("AUDIT_TICKER"); process.exit(0); } if (items.some((item) => item.cmd === "error")) console.error("AUDIT_ERROR", JSON.stringify(items.filter((item) => item.cmd === "error"))); }); setTimeout(() => process.exit(2), 20000);';
    const result = spawnSync(process.execPath, ['-e', block.code + instrument], {
      cwd: process.cwd(), env: process.env, encoding: 'utf8', timeout: 25000,
      maxBuffer: 1024 * 1024,
    });
    const ok = result.status === 0 && result.stderr?.includes('AUDIT_OPEN') && result.stderr?.includes('AUDIT_TICKER');
    const label = `${block.filename}:${block.line}`;
    if (ok) {
      passed++;
      console.log(`PASS ${label}`);
    } else {
      console.error(`FAIL ${label}: exit=${result.status}, message=${result.error?.message || result.stderr?.trim() || 'no message received'}`);
    }
  }
  console.log(`Live WebSocket examples: ${passed}/${selected.length} passed`);
  if (passed !== selected.length) process.exitCode = 1;
  process.exit();
}
if (process.argv.includes('--live-ws-standalone')) {
  if (!process.env.TICKDB_API_KEY) throw new Error('TICKDB_API_KEY is required');
  const block = all.find((item) => item.filename === '资料/A股全量行情-Node.js压缩示例.md' && item.language === 'javascript' && item.code.includes('new WebSocket'));
  const instrument = '\nconsole.log = () => {}; ws.on("open", () => console.error("AUDIT_OPEN")); ws.on("message", (raw) => { const value = JSON.parse(raw.toString()); const items = Array.isArray(value) ? value : [value]; if (items.some((item) => item.cmd === "ticker")) { console.error("AUDIT_TICKER"); process.exit(0); } }); setTimeout(() => process.exit(2), 20000);';
  const result = spawnSync(process.execPath, ['-e', block.code + instrument], {
    cwd: process.cwd(), env: process.env, encoding: 'utf8', timeout: 25000,
    maxBuffer: 1024 * 1024,
  });
  const ok = result.status === 0 && result.stderr?.includes('AUDIT_OPEN') && result.stderr?.includes('AUDIT_TICKER');
  console.log(`${ok ? 'PASS' : 'FAIL'} ${block.filename}:${block.line}: ${ok ? 'ticker received' : result.error?.message || result.stderr?.trim() || 'no ticker received'}`);
  if (!ok) process.exitCode = 1;
  process.exit();
}
if (process.argv.includes('--live-ws-quickstart')) {
  if (!process.env.TICKDB_API_KEY) throw new Error('TICKDB_API_KEY is required');
  const block = all.find((item) => /zh-Hans[\\/]websocket[\\/]websocket_quickstart\.md$/.test(item.filename) && item.language === 'javascript');
  const instrument = 'const AuditWS = require("ws"); const auditEmit = AuditWS.prototype.emit; AuditWS.prototype.emit = function(type, ...args) { const result = auditEmit.call(this, type, ...args); if (type === "open") console.error("AUDIT_OPEN"); if (type === "message") { const value = JSON.parse(args[0].toString()); const items = Array.isArray(value) ? value : [value]; if (items.some((item) => item.cmd === "ticker")) { console.error("AUDIT_TICKER"); process.exit(0); } } return result; };\n';
  const result = spawnSync(process.execPath, ['-e', instrument + block.code + '\nsetTimeout(() => process.exit(2), 20000);'], {
    cwd: process.cwd(), env: process.env, encoding: 'utf8', timeout: 25000,
    maxBuffer: 1024 * 1024,
  });
  const ok = result.status === 0 && result.stderr?.includes('AUDIT_OPEN') && result.stderr?.includes('AUDIT_TICKER');
  console.log(`${ok ? 'PASS' : 'FAIL'} ${block.filename}:${block.line}: ${ok ? 'ticker received' : result.error?.message || result.stderr?.trim() || 'no ticker received'}`);
  if (!ok) process.exitCode = 1;
  process.exit();
}
if (process.argv.includes('--live-python')) {
  if (!process.env.TICKDB_API_KEY) throw new Error('TICKDB_API_KEY is required');
  const selected = all.filter((block) => block.filename.startsWith('zh-Hans') && block.language === 'python');
  let passed = 0;
  for (const block of selected) {
    const code = block.code + "\nimport os\nprint(fetch_ticker('700.HK', os.environ['TICKDB_API_KEY']))";
    const encoded = Buffer.from(code, 'utf8').toString('base64');
    const result = spawnSync('python', ['-c', 'import base64,sys;exec(base64.b64decode(sys.argv[1]).decode("utf-8"))', encoded], {
      cwd: process.cwd(), env: { ...process.env, NO_PROXY: 'api.tickdb.ai' }, encoding: 'utf8', timeout: 90000,
      maxBuffer: 1024 * 1024,
    });
    const ok = result.status === 0 && result.stdout?.trim();
    const label = `${block.filename}:${block.line}`;
    if (ok) {
      passed++;
      console.log(`PASS ${label}`);
    } else {
      console.error(`FAIL ${label}: exit=${result.status}, message=${result.error?.message || result.stderr?.trim() || 'empty output'}`);
    }
  }
  console.log(`Live Python examples: ${passed}/${selected.length} passed`);
  if (passed !== selected.length) process.exitCode = 1;
  process.exit();
}
if (process.argv.includes('--live-js')) {
  if (!process.env.TICKDB_API_KEY) throw new Error('TICKDB_API_KEY is required');
  const selected = all.filter((block) => block.language === 'javascript' && (
    (block.filename.startsWith('zh-Hans') && !block.filename.includes('websocket')) ||
    (block.filename.startsWith('资料') && !block.code.includes('new WebSocket'))
  ));
  let passed = 0;
  for (const block of selected) {
    const invocation = block.filename.endsWith('errors.md') ? "\nfetchTicker('700.HK').then(console.log).catch((error) => { console.error(error); process.exitCode = 1; });" : '';
    const code = block.code.replaceAll("'YOUR_API_KEY'", 'process.env.TICKDB_API_KEY') + invocation;
    const result = spawnSync(process.execPath, ['--use-env-proxy', '-e', code], {
      cwd: process.cwd(), env: process.env, encoding: 'utf8', timeout: 90000,
      maxBuffer: 1024 * 1024,
    });
    const ok = result.status === 0 && !result.stderr?.trim() && result.stdout?.trim();
    const label = `${block.filename}:${block.line}`;
    if (ok) {
      passed++;
      console.log(`PASS ${label}`);
    } else {
      console.error(`FAIL ${label}: exit=${result.status}, message=${result.error?.message || result.stderr?.trim() || 'empty output'}`);
    }
  }
  console.log(`Live JavaScript examples: ${passed}/${selected.length} passed`);
  if (passed !== selected.length) process.exitCode = 1;
  process.exit();
}
if (process.argv.includes('--live-curl')) {
  if (!process.env.TICKDB_API_KEY) throw new Error('TICKDB_API_KEY is required');
  const unique = new Map();
  for (const block of all) {
    if (block.language !== 'bash' || !/^curl\s/m.test(block.code)) continue;
    if (!unique.has(block.code)) unique.set(block.code, block);
  }
  let passed = 0;
  let failed = 0;
  for (const block of unique.values()) {
    const command = block.code.replaceAll('YOUR_API_KEY', '${TICKDB_API_KEY}');
    const result = spawnSync(bash, ['-lc', command], {
      cwd: process.cwd(), env: process.env, encoding: 'utf8', timeout: 30000,
      maxBuffer: 64 * 1024 * 1024,
    });
    let response;
    try { response = JSON.parse(result.stdout); } catch { /* Report below. */ }
    const ok = result.status === 0 && response?.code === 0;
    const label = `${block.filename}:${block.line}`;
    if (ok) {
      passed++;
      console.log(`PASS ${label}`);
    } else {
      failed++;
      console.error(`FAIL ${label}: exit=${result.status}, code=${response?.code ?? 'non-JSON'}, message=${response?.message || result.error?.message || result.stderr?.trim() || 'unknown'}`);
    }
  }
  console.log(`Live curl examples: ${passed} passed, ${failed} failed, ${unique.size} unique examples`);
  if (failed) process.exitCode = 1;
  process.exit();
}
const counts = {};
const failures = [];
for (const block of all) {
  counts[block.language] = (counts[block.language] || 0) + 1;
  try {
    check(block);
  } catch (error) {
    failures.push(`${block.filename}:${block.line} (${block.language}): ${error.message}`);
  }
}
console.log(`Checked ${all.length} code blocks: ${JSON.stringify(counts)}`);
for (const failure of failures) console.error(failure);
if (failures.length) process.exitCode = 1;
