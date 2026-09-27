---
title: 财务字段字典
description: 财务报表接口返回字段代码、指标名称及数值口径说明。
---

本字典用于匹配以下接口响应中 `rows[].field_name` 的字段代码：

- [近期财务报表](./api_financials_latest)：查询近期利润表、资产负债表或现金流量表指标。
- [年度财务报表](./api_financials_annual)：查询年度利润表、资产负债表或现金流量表指标。
- [财务数据 TTM](./api_financials_ttm)：查询滚动近12个月的利润表或现金流量表指标，仅返回可由最近四个有效单季数据汇总的字段。

## 字段匹配方式

| 响应字段 | 说明 |
|---|---|
| `field_name` | 财务字段代码，用于在下表中匹配指标。 |
| `indicator_title` | 指标标题。 |
| `field_display` | 指标展示名称，可能包含单位。 |
| `value` | 指标数值，以字符串返回。 |
| `currency` | 货币金额或每股金额对应的币种。 |
| `is_percent` | 是否为百分比字段。 |
| `yoy` | 同比变化；可能为 `null`。 |
| `ratio` | 比率；可能为 `null`。 |

- 货币金额和每股金额的币种以每条记录的 `currency` 为准。
- 百分比字段的 `is_percent` 为 `true`；其他比率或倍数不一定使用百分比表示。
- 字段是否出现以及是否有值取决于公司、市场和报告期的数据覆盖；缺失值不会以 `0` 代替。
- “TTM 适用”表示该字段可出现在财务数据 TTM 响应中，实际是否返回取决于是否存在可汇总的数据。

## 利润表（IS）

| 字段代码 | 指标名称 | 数值口径 | TTM 适用 |
|---|---|---|:---:|
| `EPS` | 每股收益 | 每股金额 | 是 |
| `GrossMgn` | 毛利率 | 百分比 | 否 |
| `NetProfit` | 净利润 | 货币金额 | 是 |
| `NetProfitMargin` | 净利率 | 百分比 | 否 |
| `NetProfitMarginDf` | 净利率 | 百分比 | 否 |
| `OperatingIncome` | 营业利润 | 货币金额 | 是 |
| `OperatingRevenue` | 营业收入 | 货币金额 | 是 |
| `ProfitQuality` | 利润含金量 | 百分比 | 否 |
| `ROE` | ROE | 百分比 | 否 |
| `ROEDf` | ROE | 百分比 | 否 |

## 资产负债表（BS）

资产负债表是特定日期的时点数据，不适用于 TTM 汇总。

| 字段代码 | 指标名称 | 数值口径 |
|---|---|---|
| `AssetTurn` | 资产周转率 | 倍数 |
| `AssetTurnDf` | 资产周转率 | 倍数 |
| `BPS` | 每股净资产 | 每股金额 |
| `CashSTInvest` | 现金及短期投资 | 货币金额 |
| `Inventory` | 存货与应收 | 货币金额 |
| `LTInvest` | 长期投资 | 货币金额 |
| `Leverage` | 权益乘数 | 倍数 |
| `NPPE` | 长期投资 | 货币金额 |
| `NetDebt` | 净债务 | 货币金额 |
| `TotalAssets` | 资产与负债 | 货币金额 |
| `TotalLiability` | 资产与负债 | 货币金额 |
| `TotalReceiv` | 存货与应收 | 货币金额 |

## 现金流量表（CF）

| 字段代码 | 指标名称 | 数值口径 | TTM 适用 |
|---|---|---|:---:|
| `CapEx` | 资本支出 | 货币金额 | 是 |
| `NetFinanceCashFlow` | 融资现金流 | 货币金额 | 是 |
| `NetFreeCashFlow` | 自由现金流 | 货币金额 | 是 |
| `NetInvestCashFlow` | 投资现金流 | 货币金额 | 是 |
| `NetOperateCashFlow` | 经营现金流 | 货币金额 | 是 |
| `OCFCoverage` | 现金流充裕率 | 百分比 | 否 |
| `TotalDebtIssued` | 举债与偿债 | 货币金额 | 否 |
| `TotalDebtRepaid` | 举债与偿债 | 货币金额 | 是 |
