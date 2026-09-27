import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

const specs = {
  'zh-Hans': 'openapi.yaml',
  'zh-Hant': 'openapi.zh-Hant.yaml',
  en: 'openapi.en.yaml',
};
const parsed = Object.fromEntries(Object.entries(specs).map(([lang, file]) => [
  lang, YAML.parse(fs.readFileSync(file, 'utf8')),
]));
const base = YAML.parse(fs.readFileSync('openapi.base.yaml', 'utf8'));

function withoutDisplayText(value) {
  if (Array.isArray(value)) return value.map(withoutDisplayText);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value)
      .filter(([key]) => !['title', 'summary', 'description'].includes(key))
      .map(([key, child]) => [key, withoutDisplayText(child)]));
  }
  return value;
}

function filesUnder(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const filename = path.join(dir, entry.name);
    return entry.isDirectory() ? filesUnder(filename) : /\.mdx?$/.test(filename) ? [filename] : [];
  });
}

function checkDisplayLanguage(value, lang, location = '') {
  if (Array.isArray(value)) return value.forEach((child, index) => checkDisplayLanguage(child, lang, `${location}/${index}`));
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) {
    if (typeof child === 'string' && ['summary', 'description'].includes(key)) {
      const containsChinese = /[\u4e00-\u9fff]/.test(child);
      if (lang === 'en') assert.ok(!containsChinese, `Chinese text in ${lang}${location}/${key}`);
      else assert.ok(containsChinese || !/[A-Za-z]/.test(child), `English-only text in ${lang}${location}/${key}`);
    }
    checkDisplayLanguage(child, lang, `${location}/${key}`);
  }
}

const canonical = withoutDisplayText(parsed['zh-Hans']);
assert.deepEqual(canonical, withoutDisplayText(base), 'Localized specs differ from the source API contract');
for (const [schemaName, schema] of Object.entries(base.components.schemas || {})) {
  for (const [fieldName, field] of Object.entries(schema.properties || {})) {
    if (/\p{Script=Han}/u.test(field.description || '')) {
      assert.equal(parsed['zh-Hans'].components.schemas[schemaName].properties[fieldName].description,
        field.description, `${schemaName}.${fieldName} changed meaning in the simplified-Chinese spec`);
    }
  }
}
for (const [lang, spec] of Object.entries(parsed)) {
  assert.deepEqual(withoutDisplayText(spec), canonical, `${lang} API contract differs`);
  assert.equal(spec.info.version, '1.0.3', `${lang} version differs`);
  checkDisplayLanguage(spec, lang);
  let pageCount = 0;
  for (const filename of filesUnder(path.join(lang, 'rest'))) {
    const text = fs.readFileSync(filename, 'utf8');
    const match = text.match(/^openapi: ["']?([^\s"']+\.ya?ml) (GET|POST|PUT|PATCH|DELETE) (\/v1\/[^\r\n"']+)/m);
    if (!match) continue;
    assert.equal(match[1], specs[lang], `${filename} references the wrong language`);
    assert.ok(spec.paths[match[3]]?.[match[2].toLowerCase()], `${filename} references a missing operation`);
    pageCount++;
  }
  assert.equal(pageCount, Object.keys(spec.paths).length, `${lang} page count differs from path count`);
  console.log(`${lang}: ${pageCount} API pages and ${Object.keys(spec.paths).length} matching operations`);
}
