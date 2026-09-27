import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

const source = YAML.parse(fs.readFileSync('openapi.base.yaml', 'utf8'));
const languages = ['zh-Hans', 'zh-Hant', 'en'];
const meta = {
  'zh-Hans': {
    title: 'TickDB API',
    description: 'TickDB 统一实时行情数据 API，提供 REST 和 WebSocket 接入。',
    server: '生产环境',
    success: '请求成功。',
    response: '响应。',
    error: '错误响应。常见 HTTP 状态包括 400（参数错误）、401（鉴权失败）、403（权限或配额限制）、404（无匹配数据）、429（请求频率限制）和 503（服务暂不可用）。',
  },
  'zh-Hant': {
    title: 'TickDB API',
    description: 'TickDB 統一即時行情數據 API，提供 REST 和 WebSocket 接入。',
    server: '正式環境',
    success: '請求成功。',
    response: '回應。',
    error: '錯誤回應。常見 HTTP 狀態包括 400（參數錯誤）、401（驗證失敗）、403（權限或配額限制）、404（無符合條件的數據）、429（請求頻率限制）及 503（服務暫不可用）。',
  },
  en: {
    title: 'TickDB API',
    description: 'TickDB unified real-time market data API via REST and WebSocket.',
    server: 'Production server',
    success: 'Successful response.',
    response: ' response.',
    error: 'Error response. Common HTTP statuses include 400 (invalid parameters), 401 (authentication failed), 403 (permission or quota restriction), 404 (no matching data), 429 (rate limit), and 503 (service temporarily unavailable).',
  },
};

const overrides = {
  'zh-Hans': {
    '`normal`、`special`、`non_cash`、`unknown`': '分红类型：`normal`、`special`、`non_cash`、`unknown`。',
    'Single symbol response': '单个产品响应',
  },
  'zh-Hant': {
    '`normal`、`special`、`non_cash`、`unknown`': '分紅類型：`normal`、`special`、`non_cash`、`unknown`。',
    'Single symbol response': '單個產品回應',
    '起始日期，格式 `YYYY-MM-DD`': '開始日期，格式 `YYYY-MM-DD`',
    '全量行情响应必须启用压缩，支持 gzip、br 和 zstd，至少选择一种；默认使用兼容性较好的 gzip。': '全量行情回應必須啟用壓縮，支援 gzip、br 和 zstd，至少選擇一種；預設使用相容性較好的 gzip。',
    '缺少 API Key': '缺少 API Key',
    '缺少必填参数': '缺少必填參數',
    'API Key 无权访问该接口': 'API Key 無權存取此介面',
    'API Key 未开放该市场': 'API Key 未開放該市場',
    '数据暂不可用': '數據暫不可用',
    '无匹配数据': '無符合條件的數據',
    '查询条件无有效业务数据': '查詢條件沒有有效業務數據',
    '兼容错误标识；仅部分错误响应返回。': '相容錯誤標識；僅部分錯誤回應返回。',
    '公司资料数据。': '公司資料數據。',
    '高管/董事数据。': '高管／董事數據。',
    '财务报表数据。实测数值字段会以字符串返回以避免 JSON 浮点精度问题。': '財務報表數據。數值欄位以字串返回，以免產生 JSON 浮點精度問題。',
    '最近一期营收构成数据。': '最近一期營收構成數據。',
    'RFC 3339 日期时间字符串，包含时区信息。': 'RFC 3339 日期時間字串，包含時區資訊。',
    '指标值。': '指標值。',
    '排名展示值。': '排名顯示值。',
    '股票信息': '股票資訊',
  },
  en: {
    '单个产品响应': 'Single-symbol response',
    '全量行情响应必须启用压缩，支持 gzip、br 和 zstd，至少选择一种；默认使用兼容性较好的 gzip。': 'Full-market responses require compression. Support at least one of gzip, br, or zstd; gzip is the default.',
    '缺少 API Key': 'Missing API key',
    '缺少必填参数': 'Missing required parameter',
    'API Key 无权访问该接口': 'API key cannot access this endpoint',
    'API Key 未开放该市场': 'API key cannot access this market',
    '数据暂不可用': 'Data temporarily unavailable',
    '无匹配数据': 'No matching data',
    '查询条件无有效业务数据': 'No business data matches the query',
    '兼容错误标识；仅部分错误响应返回。': 'Compatibility error identifier; present only in some error responses.',
    '公司资料数据。': 'Company profile data.',
    '高管/董事数据。': 'Executive and director data.',
    '财务报表数据。实测数值字段会以字符串返回以避免 JSON 浮点精度问题。': 'Financial statement data. Numeric values are returned as strings to avoid JSON floating-point precision loss.',
    '最近一期营收构成数据。': 'Most recent revenue breakdown data.',
    'RFC 3339 日期时间字符串，包含时区信息。': 'RFC 3339 date-time string with time zone information.',
    '指标值。': 'Metric value.',
  },
};

// Generic field names can have different meanings in different response schemas.
// Keep these schema-specific translations separate from the page-table fallback.
const schemaOverrides = {
  'zh-Hant': {
    'ErrorEnvelope.code': 'TickDB API 業務錯誤碼；可能是整數或字串，客戶端應先轉為字串再比較。',
    'ErrorEnvelope.message': '錯誤說明。',
    'ErrorEnvelope.data': '可選的錯誤上下文；可能是 null、物件或陣列。',
    'NewsErrorEnvelope.code': 'TickDB API 業務錯誤碼；可能是整數或字串。',
    'NewsErrorEnvelope.message': '錯誤說明。',
    'NewsErrorEnvelope.data': '可選的錯誤上下文。',
    'ValuationMetricSnapshot.value': '目前指標值。',
    'IndustryChainNode.name': '行業名稱。',
    'FinancialRowsData.rows': '所選報表類型的指標記錄；同一報告期通常包含多條記錄。',
    'FinancialRow.period_type': '財務週期類型：q1 至 q4 分別為第一至第四季度，saf 為半年度，af 為年度，ttm 為滾動近 12 個月。',
    'TopShareholderMember.percent_shares_held': '持股比例數值，不含百分號；無法轉換時為 null。',
    'TopShareholderMember.percent_shares_changed': '持股比例變化數值，不含百分號；無法轉換時為 null。',
    'ShareholderTradingSummary.period': '交易統計期間。',
    'PageInfo.next_cursor': '下一頁游標；非空時原樣作為下一次請求的 cursor 參數，末頁為 null。',
    'FullMarketTicker.category': 'A 股產品細分類別；僅 A 股全量行情返回。',
    'FullCalendarEvent.data': '事件附加資料；沒有附加資料時省略。',
    'FullMarketTicker.symbol': '交易產品代碼。',
  },
  en: {
    'ErrorEnvelope.code': 'TickDB API business error code; may be an integer or string. Convert it to a string before comparing.',
    'ErrorEnvelope.message': 'Error description.',
    'ErrorEnvelope.data': 'Optional error context; may be null, an object, or an array.',
    'NewsErrorEnvelope.code': 'TickDB API business error code; may be an integer or string.',
    'NewsErrorEnvelope.message': 'Error description.',
    'NewsErrorEnvelope.data': 'Optional error context.',
    'ValuationMetricSnapshot.value': 'Current metric value.',
    'IndustryChainNode.name': 'Industry name.',
    'FinancialRowsData.rows': 'Metric records for the selected statement type; a reporting period usually contains multiple records.',
    'FinancialRow.period_type': 'Reporting period type: `q1` to `q4` are the four quarters, `saf` is semiannual, `af` is annual, and `ttm` is trailing 12 months.',
    'TopShareholderMember.percent_shares_held': 'Ownership percentage as a number without the percent sign; `null` if it cannot be converted.',
    'TopShareholderMember.percent_shares_changed': 'Ownership percentage change as a number without the percent sign; `null` if it cannot be converted.',
    'ShareholderTradingSummary.period': 'Trading-statistics period.',
    'PageInfo.next_cursor': 'Cursor for the next page; pass a non-empty value unchanged as the next request’s `cursor` parameter. `null` on the final page.',
    'FullMarketTicker.category': 'A-share product subcategory; returned only in the A-share full-market feed.',
    'FullCalendarEvent.data': 'Additional event data; omitted when unavailable.',
    'FullMarketTicker.symbol': 'Trading product symbol.',
  },
};

function applyOverrides(value, replacements) {
  if (Array.isArray(value)) return value.forEach(child => applyOverrides(child, replacements));
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) {
    if (typeof child === 'string' && ['description', 'summary'].includes(key) && replacements[child]) {
      value[key] = replacements[child];
    } else applyOverrides(child, replacements);
  }
}

function normalizeTraditional(value) {
  if (Array.isArray(value)) return value.forEach(normalizeTraditional);
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) {
    if (typeof child === 'string' && ['description', 'summary'].includes(key)) {
      value[key] = child.replaceAll('接口', '介面').replaceAll('字段', '欄位').replaceAll('支持', '支援');
    } else normalizeTraditional(child);
  }
}

function filesUnder(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const filename = path.join(dir, entry.name);
    return entry.isDirectory() ? filesUnder(filename) : /\.mdx?$/.test(filename) ? [filename] : [];
  });
}

function tableRows(section) {
  const result = new Map();
  for (const line of section.split(/\r?\n/)) {
    if (!line.startsWith('|')) continue;
    const cells = line.split('|').slice(1, -1).map(x => x.trim());
    if (cells.length < 2) continue;
    const field = cells[0]
      .replace(/&nbsp;/g, '').replace(/<[^>]+>/g, '')
      .replace(/[└─`*]/g, '').trim();
    const value = cells.at(-1);
    if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(field) || !value || /^[:\-\s]+$/.test(value)) continue;
    if (!result.has(field)) result.set(field, []);
    result.get(field).push(value);
  }
  return result;
}

function pageSections(body) {
  const sections = new Map();
  let heading;
  let lines = [];
  function flush() { if (heading) sections.set(heading.toLowerCase(), lines.join('\n')); }
  for (const line of body.split(/\r?\n/)) {
    if (line.startsWith('## ')) { flush(); heading = line.slice(3).trim(); lines = []; }
    else lines.push(line);
  }
  flush();
  return sections;
}

function readPages(lang) {
  const pages = new Map();
  for (const filename of filesUnder(path.join(lang, 'rest'))) {
    const text = fs.readFileSync(filename, 'utf8');
    const front = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
    if (!front) continue;
    const attributes = Object.fromEntries(front[1].split(/\r?\n/).map(line => {
      const i = line.indexOf(':');
      return i < 0 ? [line, ''] : [line.slice(0, i), line.slice(i + 1).trim()];
    }));
    const operation = attributes.openapi?.replace(/^['"]|['"]$/g, '')
      .replace(/^\S+\.ya?ml\s+/, '');
    if (!operation) continue;
    const sections = pageSections(text.slice(front[0].length));
    const request = [...sections].find(([k]) => /^(请求参数|請求參數|request parameters)$/i.test(k));
    const response = [...sections].find(([k]) => /^(返回字段说明|返回字段說明|返回欄位說明|response fields)$/i.test(k));
    pages.set(operation, {
      title: attributes.title?.replace(/^['"]|['"]$/g, ''),
      description: attributes.description?.replace(/^['"]|['"]$/g, ''),
      request: request ? tableRows(request[1]) : new Map(),
      response: response ? tableRows(response[1]) : new Map(),
    });
  }
  return pages;
}

function best(values) {
  if (!values.length) return undefined;
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) || 0) + 1);
  return [...counts].sort((a, b) => b[1] - a[1])[0][0];
}

function addOwner(owners, name, page) {
  if (!page) return;
  if (!owners.has(name)) owners.set(name, []);
  owners.get(name).push(page);
}

function collectSchemaOwners(schema, page, owners, seen = new Set()) {
  if (!schema || typeof schema !== 'object') return;
  if (schema.$ref?.startsWith('#/components/schemas/')) {
    const name = schema.$ref.split('/').at(-1);
    addOwner(owners, name, page);
    if (seen.has(name)) return;
    seen.add(name);
    collectSchemaOwners(source.components.schemas[name], page, owners, seen);
    return;
  }
  for (const [key, value] of Object.entries(schema)) {
    if (key === 'properties') Object.values(value).forEach(child => collectSchemaOwners(child, page, owners, seen));
    else if (['items', 'allOf', 'oneOf', 'anyOf', 'additionalProperties'].includes(key)) {
      if (Array.isArray(value)) value.forEach(child => collectSchemaOwners(child, page, owners, seen));
      else collectSchemaOwners(value, page, owners, seen);
    }
  }
}

function localizeProperties(node, pages, globalFields, lang) {
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node)) { node.forEach(child => localizeProperties(child, pages, globalFields, lang)); return; }
  if (node.properties) {
    for (const [name, property] of Object.entries(node.properties)) {
      const candidates = pages.flatMap(page => page.response.get(name) || []);
      const replacement = best(candidates) || best(globalFields.get(name) || []);
      if (property.description && replacement && (lang !== 'zh-Hans' || !/\p{Script=Han}/u.test(property.description))) {
        property.description = replacement;
      }
      localizeProperties(property, pages, globalFields, lang);
    }
  }
  for (const [key, value] of Object.entries(node)) {
    if (key !== 'properties' && ['items', 'allOf', 'oneOf', 'anyOf', 'additionalProperties'].includes(key)) {
      localizeProperties(value, pages, globalFields, lang);
    }
  }
}

for (const lang of languages) {
  const spec = structuredClone(source);
  const pages = readPages(lang);
  const owners = new Map();
  const parameterOwners = new Map();
  const responseOwners = new Map();
  const globalFields = new Map();
  for (const page of pages.values()) {
    for (const [name, values] of page.response) {
      if (!globalFields.has(name)) globalFields.set(name, []);
      globalFields.get(name).push(...values);
    }
  }
  spec.info.title = meta[lang].title;
  spec.info.description = meta[lang].description;
  for (const server of spec.servers || []) server.description = meta[lang].server;
  for (const [route, methods] of Object.entries(spec.paths)) {
    for (const [method, operation] of Object.entries(methods)) {
      if (!['get', 'post', 'put', 'patch', 'delete'].includes(method)) continue;
      const page = pages.get(`${method.toUpperCase()} ${route}`);
      if (!page) continue;
      operation.summary = page.title;
      operation.description = page.description;
      for (const parameter of operation.parameters || []) {
        if (parameter.$ref?.startsWith('#/components/parameters/')) {
          addOwner(parameterOwners, parameter.$ref.split('/').at(-1), page);
        } else if (parameter.name) {
          const replacement = best(page.request.get(parameter.name) || []);
          if (replacement) parameter.description = replacement;
        }
      }
      for (const response of Object.values(operation.responses || {})) {
        if (!response.$ref) response.description = meta[lang].success;
        const resolved = response.$ref?.startsWith('#/components/responses/')
          ? source.components.responses[response.$ref.split('/').at(-1)] : response;
        if (response.$ref?.startsWith('#/components/responses/')) {
          addOwner(responseOwners, response.$ref.split('/').at(-1), page);
        }
        const schema = resolved?.content?.['application/json']?.schema;
        collectSchemaOwners(schema, page, owners);
        if (response.content?.['application/json']?.schema) {
          localizeProperties(response.content['application/json'].schema, [page], globalFields, lang);
        }
      }
    }
  }
  for (const [name, parameter] of Object.entries(spec.components.parameters || {})) {
    const candidates = (parameterOwners.get(name) || []).flatMap(page => page.request.get(parameter.name) || []);
    const replacement = best(candidates);
    if (replacement) parameter.description = replacement;
  }
  for (const [name, schema] of Object.entries(spec.components.schemas || {})) {
    localizeProperties(schema, owners.get(name) || [], globalFields, lang);
    for (const [property, value] of Object.entries(schema.properties || {})) {
      const override = schemaOverrides[lang]?.[`${name}.${property}`];
      if (override) value.description = override;
    }
  }
  for (const [name, response] of Object.entries(spec.components.responses || {})) {
    const owner = responseOwners.get(name)?.[0];
    response.description = name.includes('Error') ? meta[lang].error
      : owner ? `${owner.title}${meta[lang].response}` : meta[lang].success;
  }
  applyOverrides(spec, overrides[lang]);
  if (lang === 'zh-Hant') normalizeTraditional(spec);
  const target = lang === 'zh-Hans' ? 'openapi.yaml' : `openapi.${lang}.yaml`;
  fs.writeFileSync(target, YAML.stringify(spec, { lineWidth: 0 }));
  console.log(`${target}: ${pages.size} translated operation pages`);
}
