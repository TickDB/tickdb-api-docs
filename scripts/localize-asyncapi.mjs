import fs from 'node:fs';

// asyncapi.base.json is the canonical protocol contract. Only human-readable
// title, summary and description strings differ between generated files.
const base = JSON.parse(fs.readFileSync('asyncapi.base.json', 'utf8'));
const translations = {
  'TickDB WebSocket API': ['TickDB WebSocket 接口', 'TickDB WebSocket 介面'],
  'Unified real-time market data WebSocket API for Forex, indices, US stocks, HK stocks, A-shares, China futures, and Crypto.': ['统一实时行情 WebSocket 接口，支持外汇、指数、美股、港股、A 股、中国期货和加密货币。', '統一即時行情 WebSocket 介面，支援外匯、指數、美股、港股、A 股、中國期貨和加密貨幣。'],
  'Production WebSocket server': ['生产环境 WebSocket 服务', '正式環境 WebSocket 服務'],
  'WebSocket Error Response': ['WebSocket 错误响应', 'WebSocket 錯誤回應'],
  'Subscription or command error returned after the WebSocket connection is established': ['WebSocket 连接建立后返回的订阅或命令错误。', 'WebSocket 連線建立後返回的訂閱或命令錯誤。'],
  'Command that caused the error': ['触发错误的命令。', '觸發錯誤的命令。'],
  'Error code; clients should normalize it to a string before comparison': ['错误码；比较前应统一转为字符串。', '錯誤碼；比較前應統一轉為字串。'],
  'Human-readable error message': ['错误说明。', '錯誤說明。'],
  'Optional error context': ['可选的错误上下文。', '可選的錯誤上下文。'],
  'Subscribe/Unsubscribe to Real-Time Quotes': ['订阅或取消订阅实时行情', '訂閱或取消訂閱即時行情'],
  'Subscribe or unsubscribe to real-time ticker updates for one or multiple symbols': ['订阅或取消订阅一个或多个标的的实时行情。', '訂閱或取消訂閱一個或多個標的的即時行情。'],
  'Command type (subscribe or unsubscribe)': ['命令类型：订阅或取消订阅。', '命令類型：訂閱或取消訂閱。'],
  'Channel name': ['频道名称。', '頻道名稱。'],
  'List of trading symbols to subscribe/unsubscribe': ['要订阅或取消订阅的交易代码列表。', '要訂閱或取消訂閱的交易代碼列表。'],
  'Symbol type, optional. Not required when the symbol is unambiguous; if the server returns an AMBIGUOUS_SYMBOL error, pass the value as indicated': ['标的类型，可选；代码无歧义时可不传。若返回 AMBIGUOUS_SYMBOL 错误，请根据提示指定类型。', '標的類型，可選；代碼無歧義時可不傳。若返回 AMBIGUOUS_SYMBOL 錯誤，請依提示指定類型。'],
  'Real-Time Quotes Data': ['实时行情数据', '即時行情數據'],
  'Real-time ticker data pushed from server': ['实时推送的行情数据。', '即時推送的行情數據。'],
  'Message type': ['消息类型。', '消息類型。'],
  'Trading symbol': ['交易代码。', '交易代碼。'],
  'Product name, when available': ['产品名称；有数据时返回。', '產品名稱；有數據時返回。'],
  'Symbol type': ['标的类型。', '標的類型。'],
  'Product category, when available': ['产品细分类别；有数据时返回。', '產品細分類別；有數據時返回。'],
  'Latest price': ['最新价。', '最新價。'],
  'Opening price, when available': ['开盘价；有数据时返回。', '開盤價；有數據時返回。'],
  'Previous close or reference price, when available': ['昨收价或参考价；有数据时返回。', '昨收價或參考價；有數據時返回。'],
  'Best bid, when available': ['最优买价；有数据时返回。', '最優買價；有數據時返回。'],
  'Best ask, when available': ['最优卖价；有数据时返回。', '最優賣價；有數據時返回。'],
  'Bid-ask spread for forex or metals, when available': ['外汇或贵金属的买卖价差；有数据时返回。', '外匯或貴金屬的買賣價差；有數據時返回。'],
  'Trading volume; rolling 24 hours for crypto, usually current day or session for stocks and futures': ['成交量；加密货币通常为滚动 24 小时，股票和期货通常为当日或当前交易时段。', '成交量；加密貨幣通常為滾動 24 小時，股票和期貨通常為當日或目前交易時段。'],
  'Turnover over the same window as volume_24h, when available': ['与 volume_24h 相同统计窗口内的成交额；有数据时返回。', '與 volume_24h 相同統計區間內的成交額；有數據時返回。'],
  'High price over the same window as volume_24h': ['与 volume_24h 相同统计窗口内的最高价。', '與 volume_24h 相同統計區間內的最高價。'],
  'Low price over the same window as volume_24h': ['与 volume_24h 相同统计窗口内的最低价。', '與 volume_24h 相同統計區間內的最低價。'],
  'Price change over the same statistics window, when available': ['相同统计窗口内的价格变化；有数据时返回。', '相同統計區間內的價格變化；有數據時返回。'],
  'Price change percentage, when available': ['价格变化百分比；有数据时返回。', '價格變化百分比；有數據時返回。'],
  'US stock extended trading session, when applicable': ['美股扩展交易时段；适用时返回。', '美股延長交易時段；適用時返回。'],
  'Turnover in the current extended trading session, when available': ['当前扩展交易时段的成交额；有数据时返回。', '目前延長交易時段的成交額；有數據時返回。'],
  'Pre-market quote, when available': ['盘前行情；有数据时返回。', '盤前行情；有數據時返回。'],
  'Post-market quote, when available': ['盘后行情；有数据时返回。', '盤後行情；有數據時返回。'],
  'Overnight quote, when available': ['夜盘行情；有数据时返回。', '夜盤行情；有數據時返回。'],
  'Unix timestamp in milliseconds': ['Unix 时间戳，单位为毫秒。', 'Unix 時間戳，單位為毫秒。'],
  'Subscribe/Unsubscribe to Orderbook': ['订阅或取消订阅盘口深度', '訂閱或取消訂閱盤口深度'],
  'Subscribe or unsubscribe to real-time order book depth updates': ['订阅或取消订阅实时盘口深度。', '訂閱或取消訂閱即時盤口深度。'],
  'Orderbook Data': ['盘口深度数据', '盤口深度數據'],
  'Real-time order book depth data pushed from server': ['实时推送的盘口深度数据。', '即時推送的盤口深度數據。'],
  'Bid orders [price, quantity]': ['买盘档位，每项为 [价格, 数量]。', '買盤檔位，每項為 [價格, 數量]。'],
  'Ask orders [price, quantity]': ['卖盘档位，每项为 [价格, 数量]。', '賣盤檔位，每項為 [價格, 數量]。'],
  'Subscribe/Unsubscribe to Tick-by-Tick Trades': ['订阅或取消订阅逐笔成交', '訂閱或取消訂閱逐筆成交'],
  'Subscribe or unsubscribe to real-time trade execution updates': ['订阅或取消订阅实时成交记录。', '訂閱或取消訂閱即時成交記錄。'],
  'Tick-by-Tick Trade Data': ['逐笔成交数据', '逐筆成交數據'],
  'Real-time trade execution data pushed from server': ['实时推送的成交记录数据。', '即時推送的成交記錄數據。'],
  'Trade records for HK stocks, US stocks, and cryptocurrencies': ['港股、美股和加密货币的成交记录。', '港股、美股和加密貨幣的成交記錄。'],
  'Trade ID': ['成交 ID。', '成交 ID。'],
  'Trade execution price': ['成交价格。', '成交價格。'],
  'Trade quantity': ['成交数量。', '成交數量。'],
  'Trade side': ['成交方向。', '成交方向。'],
  'Trade ID; returned for Hong Kong futures': ['成交 ID；香港期货返回。', '成交 ID；香港期貨返回。'],
  'Change in open interest; returned for China futures when available': ['持仓量变化；中国期货有数据时返回。', '未平倉量變化；中國期貨有數據時返回。'],
  'Position effect; returned for China futures when available': ['开平仓类型；中国期货有数据时返回。', '開平倉類型；中國期貨有數據時返回。'],
  'Ping Request': ['Ping 请求', 'Ping 請求'],
  'Send ping to check connection': ['发送 ping 检查连接状态。', '傳送 ping 檢查連線狀態。'],
  'Ping command (fixed value)': ['Ping 命令，固定值。', 'Ping 命令，固定值。'],
  'Pong Response': ['Pong 响应', 'Pong 回應'],
  'Server response to ping': ['服务端对 ping 的响应。', '服務端對 ping 的回應。'],
  'Pong response': ['Pong 响应。', 'Pong 回應。'],
  'Response code': ['响应码。', '回應碼。'],
  'Response message': ['响应消息。', '回應訊息。'],
  'Server timestamp in milliseconds': ['服务端时间戳，单位为毫秒。', '服務端時間戳，單位為毫秒。'],
  'Full-market A-share ticker subscription; negotiate permessage-deflate during the WebSocket handshake': ['A 股全量行情订阅；建立 WebSocket 连接时须协商 permessage-deflate 压缩。', 'A 股全量行情訂閱；建立 WebSocket 連線時須協商 permessage-deflate 壓縮。'],
  'Full-market Hong Kong stock ticker subscription; negotiate permessage-deflate during the WebSocket handshake': ['港股全量行情订阅；建立 WebSocket 连接时须协商 permessage-deflate 压缩。', '港股全量行情訂閱；建立 WebSocket 連線時須協商 permessage-deflate 壓縮。'],
  'Full-market US stock ticker subscription; negotiate permessage-deflate during the WebSocket handshake': ['美股全量行情订阅；建立 WebSocket 连接时须协商 permessage-deflate 压缩。', '美股全量行情訂閱；建立 WebSocket 連線時須協商 permessage-deflate 壓縮。'],
  'Subscribe/Unsubscribe to A-share Full-Market Ticker': ['订阅或取消订阅 A 股全量行情', '訂閱或取消訂閱 A 股全量行情'],
  'Subscribe/Unsubscribe to Hong Kong stock Full-Market Ticker': ['订阅或取消订阅港股全量行情', '訂閱或取消訂閱港股全量行情'],
  'Subscribe/Unsubscribe to US stock Full-Market Ticker': ['订阅或取消订阅美股全量行情', '訂閱或取消訂閱美股全量行情'],
  'Subscribe or unsubscribe to ticker updates for all A-share symbols; permessage-deflate is required': ['订阅或取消订阅全部 A 股标的的行情更新；连接必须启用 permessage-deflate。', '訂閱或取消訂閱全部 A 股標的的行情更新；連線必須啟用 permessage-deflate。'],
  'Subscribe or unsubscribe to ticker updates for all Hong Kong stock symbols; permessage-deflate is required': ['订阅或取消订阅全部港股标的的行情更新；连接必须启用 permessage-deflate。', '訂閱或取消訂閱全部港股標的的行情更新；連線必須啟用 permessage-deflate。'],
  'Subscribe or unsubscribe to ticker updates for all US stock symbols; permessage-deflate is required': ['订阅或取消订阅全部美股标的的行情更新；连接必须启用 permessage-deflate。', '訂閱或取消訂閱全部美股標的的行情更新；連線必須啟用 permessage-deflate。'],
  'Full-market universe to subscribe or unsubscribe': ['要订阅或取消订阅的全市场标识。', '要訂閱或取消訂閱的全市場標識。'],
  'Ticker channel for full-market updates': ['全量行情固定使用 ticker 频道。', '全量行情固定使用 ticker 頻道。'],
  'Initial snapshot and subsequent ticker updates are sent as arrays of up to 500 messages': ['初始快照和后续行情更新均以数组分批发送，每批最多 500 条消息。', '初始快照和後續行情更新均以陣列分批傳送，每批最多 500 條訊息。'],
  'A-share Full-Market Ticker Batch': ['A 股全量行情批次', 'A 股全量行情批次'],
  'Hong Kong stock Full-Market Ticker Batch': ['港股全量行情批次', '港股全量行情批次'],
  'US stock Full-Market Ticker Batch': ['美股全量行情批次', '美股全量行情批次'],
};

function localize(value, languageIndex) {
  if (Array.isArray(value)) return value.map(child => localize(child, languageIndex));
  if (!value || typeof value !== 'object') return value;
  return Object.fromEntries(Object.entries(value).map(([key, child]) => {
    if (['title', 'summary', 'description'].includes(key) && typeof child === 'string') {
      if (!translations[child]) throw new Error(`Missing AsyncAPI translation: ${child}`);
      return [key, translations[child][languageIndex]];
    }
    return [key, localize(child, languageIndex)];
  }));
}

for (const [language, index, filename] of [
  ['zh-Hans', 0, 'asyncapi.json'],
  ['zh-Hant', 1, 'asyncapi.zh-Hant.json'],
]) {
  fs.writeFileSync(filename, `${JSON.stringify(localize(base, index), null, 2)}\n`);
  console.log(`${filename}: ${language}`);
}
fs.writeFileSync('asyncapi.en.json', `${JSON.stringify(base, null, 2)}\n`);
console.log('asyncapi.en.json: en');
