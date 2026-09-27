import assert from 'node:assert/strict';
import fs from 'node:fs';

const files = {
  'zh-Hans': 'asyncapi.json',
  'zh-Hant': 'asyncapi.zh-Hant.json',
  en: 'asyncapi.en.json',
};
const base = JSON.parse(fs.readFileSync('asyncapi.base.json', 'utf8'));
const channels = Object.keys(base.channels);

function withoutDisplayText(value) {
  if (Array.isArray(value)) return value.map(withoutDisplayText);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value)
      .filter(([key]) => !['title', 'summary', 'description'].includes(key))
      .map(([key, child]) => [key, withoutDisplayText(child)]));
  }
  return value;
}

function checkLanguage(value, language, location = '') {
  if (Array.isArray(value)) return value.forEach((child, index) => checkLanguage(child, language, `${location}/${index}`));
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) {
    if (['title', 'summary', 'description'].includes(key) && typeof child === 'string') {
      assert.ok(language === 'en' ? !/\p{Script=Han}/u.test(child) : /\p{Script=Han}/u.test(child),
        `${language}${location}/${key} is not localized`);
    }
    checkLanguage(child, language, `${location}/${key}`);
  }
}

for (const [language, filename] of Object.entries(files)) {
  const spec = JSON.parse(fs.readFileSync(filename, 'utf8'));
  assert.deepEqual(withoutDisplayText(spec), withoutDisplayText(base), `${filename} changes the protocol contract`);
  checkLanguage(spec, language);
  assert.deepEqual(Object.keys(spec.channels), channels);
  for (const channel of channels) {
    const page = `${language}/websocket/${channel}.mdx`;
    const content = fs.readFileSync(page, 'utf8');
    assert.ok(content.includes(`asyncapi: "/${filename} ${channel}"`), `${page} references the wrong specification`);
  }
  console.log(`${language}: ${channels.length} channels match the base contract`);
}
