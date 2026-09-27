---
title: 財務字段字典
description: 財務報表接口返回字段代碼、指標名稱及數值口徑說明。
---

本字典用於匹配以下接口響應中 `rows[].field_name` 的字段代碼：

- [近期財務報表](./api_financials_latest)：查詢近期利潤表、資產負債表或現金流量表指標。
- [年度財務報表](./api_financials_annual)：查詢年度利潤表、資產負債表或現金流量表指標。
- [財務數據 TTM](./api_financials_ttm)：查詢滾動近12個月的利潤表或現金流量表指標，僅返回可由最近四個有效單季數據匯總的字段。

## 字段匹配方式

| 響應字段 | 說明 |
|---|---|
| `field_name` | 財務字段代碼，用於在下表中匹配指標。 |
| `indicator_title` | 指標標題。 |
| `field_display` | 指標展示名稱，可能包含單位。 |
| `value` | 指標數值，以字符串返回。 |
| `currency` | 貨幣金額或每股金額對應的幣種。 |
| `is_percent` | 是否為百分比字段。 |
| `yoy` | 同比變化；可能為 `null`。 |
| `ratio` | 比率；可能為 `null`。 |

- 貨幣金額和每股金額的幣種以每條記錄的 `currency` 為準。
- 百分比字段的 `is_percent` 為 `true`；其他比率或倍數不一定使用百分比表示。
- 字段是否出現以及是否有值取決于公司、市場和報告期的數據覆蓋；缺失值不會以 `0` 代替。
- “TTM 適用”表示該字段可出現在財務數據 TTM 響應中，實際是否返回取決于是否存在可匯總的數據。

## 利潤表（IS）

| 字段代碼 | 指標名稱 | 數值口徑 | TTM 適用 |
|---|---|---|:---:|
| `EPS` | 每股收益 | 每股金額 | 是 |
| `GrossMgn` | 毛利率 | 百分比 | 否 |
| `NetProfit` | 凈利潤 | 貨幣金額 | 是 |
| `NetProfitMargin` | 凈利率 | 百分比 | 否 |
| `NetProfitMarginDf` | 凈利率 | 百分比 | 否 |
| `OperatingIncome` | 營業利潤 | 貨幣金額 | 是 |
| `OperatingRevenue` | 營業收入 | 貨幣金額 | 是 |
| `ProfitQuality` | 利潤含金量 | 百分比 | 否 |
| `ROE` | ROE | 百分比 | 否 |
| `ROEDf` | ROE | 百分比 | 否 |

## 資產負債表（BS）

資產負債表是特定日期的時點數據，不適用於 TTM 匯總。

| 字段代碼 | 指標名稱 | 數值口徑 |
|---|---|---|
| `AssetTurn` | 資產周轉率 | 倍數 |
| `AssetTurnDf` | 資產周轉率 | 倍數 |
| `BPS` | 每股凈資產 | 每股金額 |
| `CashSTInvest` | 現金及短期投資 | 貨幣金額 |
| `Inventory` | 存貨與應收 | 貨幣金額 |
| `LTInvest` | 長期投資 | 貨幣金額 |
| `Leverage` | 權益乘數 | 倍數 |
| `NPPE` | 長期投資 | 貨幣金額 |
| `NetDebt` | 凈債務 | 貨幣金額 |
| `TotalAssets` | 資產與負債 | 貨幣金額 |
| `TotalLiability` | 資產與負債 | 貨幣金額 |
| `TotalReceiv` | 存貨與應收 | 貨幣金額 |

## 現金流量表（CF）

| 字段代碼 | 指標名稱 | 數值口徑 | TTM 適用 |
|---|---|---|:---:|
| `CapEx` | 資本支出 | 貨幣金額 | 是 |
| `NetFinanceCashFlow` | 融資現金流 | 貨幣金額 | 是 |
| `NetFreeCashFlow` | 自由現金流 | 貨幣金額 | 是 |
| `NetInvestCashFlow` | 投資現金流 | 貨幣金額 | 是 |
| `NetOperateCashFlow` | 經營現金流 | 貨幣金額 | 是 |
| `OCFCoverage` | 現金流充裕率 | 百分比 | 否 |
| `TotalDebtIssued` | 舉債與償債 | 貨幣金額 | 否 |
| `TotalDebtRepaid` | 舉債與償債 | 貨幣金額 | 是 |
