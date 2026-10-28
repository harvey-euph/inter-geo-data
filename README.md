# Inter-Geo Data: 空間圖資、圖層特徵與 GeoGuessr 實戰情報庫

`inter-geo-data` 是 Inter-Geo Web GIS 系統的集中式資料內容儲存庫。本儲存庫負責託管所有二進位空間向量邊界（FlatGeobuf）、CSV 動態圖層數據庫、Markdown 實戰情報卡以及特徵媒體資源，並透過自動化腳本生成輕量化 JSON 索引清單供前端按需即時讀取。

---

## 目錄 (Table of Contents)

- [1. 儲存庫職責與目錄導覽 (Repository Directory Layout)](#1-儲存庫職責與目錄導覽-repository-directory-layout)
- [2. 空間向量幾何規範 (FlatGeobuf GIS Geometry Standards)](#2-空間向量幾何規範-flatgeobuf-gis-geometry-standards)
- [3. CSV 圖層撰寫規範與 Directive 體系 (CSV Layer Directives)](#3-csv-圖層撰寫規範與-directive-體系-csv-layer-directives)
- [4. Markdown 實戰情報卡撰寫指南 (Info Card Authoring Guide)](#4-markdown-實戰情報卡撰寫指南-info-card-authoring-guide)
  - [卡片基本結構與元數據](#卡片基本結構與元數據)
  - [元數據欄位字典](#元數據欄位字典)
  - [正文內容與標籤排版](#正文內容與標籤排版)
  - [Google Maps 與 Street View 街景嵌入語法](#google-maps-與-street-view-街景嵌入語法)
- [5. 媒體資源管理規範 (Media Assets Guidelines)](#5-媒體資源管理規範-media-assets-guidelines)
- [6. 自動化索引編譯與發布流程 (Index Generation & CI/CD)](#6-自動化索引編譯與發布流程-index-generation--cicd)

---

## 1. 儲存庫職責與目錄導覽 (Repository Directory Layout)

```text
inter-geo-data/
├── data/                    # 二進位空間向量多邊形與線段 (FlatGeobuf)
│   ├── COUNTRY.fgb          # L1 全球國家輪廓 (177+ 國)
│   ├── {iso2}.fgb           # L2 一級行政區多邊形 (例如 JP.fgb, US.fgb)
│   ├── {parent}/{child}.fgb # L3+ 細部二級/三級行政區微型分區包 (例如 US/CA.fgb, JP/13.fgb)
│   └── {iso2}-roads.fgb     # 各國主要公路網線段 (例如 US-roads.fgb)
├── layers/                  # CSV 動態圖層數據庫 (按 3 大類別分目錄)
│   ├── fill-region-with-color/ # 區塊著色圖層 (如行駛方向、車牌特徵、標線著色)
│   ├── global-label/        # 全域標籤圖層 (如國旗、電話國碼、頂級網域、幣符)
│   └── area-feature/        # 區域特徵圖層 (如公路網編號、電力座標網格、歐洲行人標誌)
├── info/                    # GeoGuessr 實戰情報卡 (Markdown)
│   ├── americas.md          # 美洲各國實戰情資
│   ├── asia.md              # 亞洲各國實戰情資
│   ├── europe.md            # 歐洲各國實戰情資
│   ├── pedestrian-crossing.md # 各國行人穿越道告示牌特徵
│   └── ...                  # 道路標線、車牌編碼、電線桿等專屬情資
├── images/                  # 媒體圖檔資源 (SVG、WebP、PNG)
│   └── crossing/            # 各國行人過路標誌向量圖 (de.svg, kz.svg 等)
├── scripts/                 # 自動化建置腳本
│   └── build-indexes.mjs    # Node.js 索引編譯工具
└── dist-index/              # 本機編譯產生的輕量索引 (由 CI 發布至 index 分支)
```

---

## 2. 空間向量幾何規範 (FlatGeobuf GIS Geometry Standards)

所有空間邊界均採用 [FlatGeobuf](https://flatgeobuf.org/) (`.fgb`) 二進位格式存放，具備內建空間索引（Packed R-Tree）與極速反序列化特性。

### 命名規範與 LOD 階層

| 階層 / 類型 | 檔案路徑格式 | 說明與範例 |
| --- | --- | --- |
| **L1 根幾何** | `data/COUNTRY.fgb` | 世界底圖與各國外框。要素包含 `id` (ISO-2)、`name`、`bbox`。 |
| **L2 一級行政區** | `data/{iso2}.fgb` | 各國省、州、道、都府縣邊界（如 `data/JP.fgb`、`data/TW.fgb`）。 |
| **L3+ 細部階層** | `data/{parent}/{child}.fgb` | 遞迴分區包（如美國加州郡級 `data/US/CA.fgb`、日本東京都區町村 `data/JP/13.fgb`）。 |
| **道路網幾何** | `data/{iso2}-roads.fgb` | 線段幾何（如 `data/US-roads.fgb`、`data/TW-roads.fgb`）。 |

### 幾何品質要求
- **座標系統**：一律使用 WGS 84（EPSG:4326）經緯度。
- **繞向規範 (Winding Order)**：多邊形外環（Exterior Ring）必須為順時針，內環洞（Interior Ring）為逆時針。
- **跨日線處理**：跨越經度 180° 之幾何需依國際換日線正確切割，避免大西洋反白或跨洋破面。

---

## 3. CSV 圖層撰寫規範與 Directive 體系 (CSV Layer Directives)

圖層統一以 CSV 格式編寫於 `layers/` 旗下目錄。每個 CSV 檔案以頭部雙斜線 `//` 聲明圖層設定：

```csv
// @id: driving-side
// @nameZh: 行駛方向
// @nameEn: Driving Side
// @shortBadge: 🚦 方向
// @group: fill-region
// @type: FillWithColor
// @default-color: #1e2430
// @order: 8
// @descriptionZh: 全球各國道路通行方向（靠左行駛 #f59e0b 與靠右行駛 #3b82f6，無街景或未收錄 #1e2430）制度分布
// @legend: #f59e0b: 靠左行駛 (Left-hand Drive)
// @legend: #3b82f6: 靠右行駛 (Right-hand Drive)
// @legend: #1e2430: 無街景或未收錄
region-id,value,label
JP,#f59e0b,靠左
GB,#f59e0b,靠左
TW,#3b82f6,靠右
US,#3b82f6,靠右
```

### Directive 標頭字典

| 標頭指令 | 必要性 | 說明 | 範例 |
| --- | :---: | --- | --- |
| `@id` | **必要** | 圖層唯一識別代碼（kebab-case） | `// @id: pedestrian-crossing` |
| `@nameZh` | **必要** | 中文圖層名稱 | `// @nameZh: 行人穿越道告示` |
| `@nameEn` | 選填 | 英文圖層名稱 | `// @nameEn: Pedestrian Crossing Sign` |
| `@shortBadge` | 選填 | 簡短圖示徽章（顯示於選擇器與圖例標籤） | `// @shortBadge: 🚸 行人` |
| `@group` | **必要** | 圖層所屬分類群組（見下方說明） | `fill-region` / `global-label` / `area-feature` |
| `@type` | **必要** | 渲染管線類型 | `FillWithColor` / `GlobalLabel` / `AreaFeature` |
| `@default-color` | 選填 | 未收錄區域之預設底色（Hex） | `// @default-color: #1e2430` |
| `@order` | 選填 | 於分類面板中的排序權重（數字越小越靠前） | `// @order: 1` |
| `@descriptionZh` | 選填 | 於圖例與 Tooltip 中呈現之詳述 | `// @descriptionZh: 全球道路標線特色...` |
| `@legend` | 選填 | 圖例對應項目（可重複多行宣告） | `// @legend: #f59e0b: 靠左行駛` |

### 3 大圖層分類群組

1. **`fill-region` (區塊著色)**：
   - 放置目錄：`layers/fill-region-with-color/`
   - 選取邏輯：單選（Radio），同時只能啟用一個著色底圖。
   - 資料列欄位：`region-id,value,label`（`value` 為 Hex 色碼或雙色標線格式）。
2. **`global-label` (全域標籤)**：
   - 放置目錄：`layers/global-label/`
   - 選取邏輯：複選（Checkbox），可任意疊加。
   - 資料列欄位：`region-id,value,label`（`value` 為顯示文字、圖標或 Emoji）。
3. **`area-feature` (區域特徵)**：
   - 放置目錄：`layers/area-feature/`
   - 選取邏輯：複選（Checkbox），針對特定國家或地理格網提供微觀細節。
   - 資料列欄位：支援自訂屬性（如圖片路徑、形狀代碼、方向、條紋數等）。

### 雙色道路標線色彩格式
在 `fill-region` 中若要繪製雙色標線，採用 `#外側邊線色:#中央分向線色` 格式：
```csv
US,#f1f5f9:#f59e0b,白邊黃中
FR,#f1f5f9:#f1f5f9,全白線
```

### 區域代碼規範 (`region-id`)
系統內建正規化器，支援下列格式自動對齊：
- **ISO-2 國家代碼**：`JP`、`US`、`KZ`、`TW`
- **一級行政區階層**：`JP::26`（亦支援 `JP-26`、`26`）
- **補零對齊**：`JP-01` 與 `JP-1` 等價
- **地理格網**：`TW::TP-H`（台灣電力座標分區）

---

## 4. Markdown 實戰情報卡撰寫指南 (Info Card Authoring Guide)

所有 GeoGuessr 戰術情報均撰寫於 `info/*.md` 中。單一 Markdown 檔案可包含多個情報卡區塊，以一級標題 `# 標題` 分隔。

### 卡片基本結構與元數據

```markdown
# 日本 (Japan)
- id: country-jp
- targets: JP
- priority: 1
- icon: 🇯🇵
- accent: #38bdf8
- tags: 東亞, 靠左行駛, 官方街景
- type: country
- display: true
- image: /images/signs/jp.svg
- imageSize: 72
- imagePosition: left

- **關鍵線索**: 靠左行駛 (Left Drive) + Low Cam 低視角鏡頭。
- **車牌特徵**: 普通車白底綠字，輕型車（Kei Car）黃底黑字。
- **電線桿**: 桿底常見黃黑相間防撞警示斜紋套管。
  - 北海道與東北地區常見箭頭向下之積雪標誌桿（雪標）。
  - 市區電桿常見高密度複合變壓器與多層橫擔。
```

### 元數據欄位字典

| 欄位名稱 | 型別 | 說明 | 範例 |
| --- | :---: | --- | --- |
| `id` | 字串 | **必要**，卡片全域唯一標識 | `crossing-sign-kz` |
| `targets` | 字串清單 | **必要**，綁定的對象（ISO-2、行政區或格網） | `targets: KZ` 或 `targets: [US, CA]` |
| `priority` | 數值 | 排序權重（`0` ~ `139` 升冪排序，數字越小越優先，預設 140） | `priority: 1` |
| `icon` | 字串 | 顯示於卡片頭部的 Emoji 或圖標 | `icon: 🚸` |
| `accent` | Hex 色碼 | 卡片邊框與高亮主色調 | `accent: #38bdf8` |
| `tags` | 字串清單 | 用於情報設定面板之標籤過濾 | `tags: infrastructure, signs, 交通標誌` |
| `type` | 字串 | 目標類型（`country` / `subdivision` / `road` / `general`） | `type: country` |
| `display` | 布林值 | 卡片預設是否展開（預設 `false` 摺疊） | `display: true` |
| `image` | 字串 | 選填，卡片主展示圖或地圖嵌入路徑 | `image: /images/crossing/kz.svg` |
| `imageSize` | 字串/數值 | 圖片尺寸預設（`sm`, `md`, `lg`, `xl`, `banner`, 或像素數值） | `imageSize: 72` |
| `imagePosition`| 字串 | 圖片位置（`left`, `right`, `top`） | `imagePosition: left` |

### 正文內容與標籤排版

- **粗體重點**：`**關鍵線索**`
- **醒目標籤**：使用全形括號 `【...】` 會自動套用主題強調色（例如 `**【中亞標準】**`）
- **內嵌圖標**：`![說明|尺寸](路徑)`（例如 `![標牌|72](/images/crossing/kz.svg)`）
- **縮排清單**：支援二級次清單（縮排 2 格空白或 Tab）

---

### Google Maps 與 Street View 街景嵌入語法

在情報卡條目內容中，支援直接置入 Google Maps Embed API 互動地圖與 Street View 街景全景！

#### 1. 街景語法（座標模式）
```markdown
- **實地街景**：![streetview](51.1283, 71.4305)
```
搭配標題、視角角度與俯仰角：
```markdown
- **實地街景**：![streetview|阿斯塔納行人標誌|heading=195|pitch=5](51.1283, 71.4305)
```

#### 2. 直接貼上 Google Maps / Street View 瀏覽器完整 URL
在 Google Maps 或街景網址列複製的 URL 可直接貼入，解析器會自動抽取 `@lat,lng`、`3a` 街景標記、`h` 方位角與 `t` 仰角：
```markdown
- **實景範例**：![streetview|阿斯塔納街景](https://www.google.com/maps/@51.1283,71.4305,3a,75y,195h,85t/data=...)
```

#### 3. 視角地圖與地標搜尋模式
```markdown
- **市中心位置**：![map|zoom=16|阿斯塔納中心](51.1283, 71.4305)
- **地標標記**：![place](Baiterek Tower, Astana)
```

#### 4. 高度自適應與比例維持 (Adaptive Height & Aspect Ratio)

寬度預設會自適應情報卡的欄寬（`100%`），**預設會以 16:9（`16 / 9`）固定黃金比例依照當下的 Info Card 寬度動態自適應高度**！

當使用者在前端拖曳調整情報抽屜（Country Detail Panel）寬度或切換全寬模式時，街景高度會即時等比例同步縮放，確保畫面永遠維持一致視角：

```markdown
<!-- 預設即為 16:9 固定比例自適應高度 -->
- **街景範例**：![streetview](51.1283, 71.4305)

<!-- 自訂其他比例（如 4:3、16:10、1:1） -->
- **街景範例**：![streetview|4:3](51.1283, 71.4305)
- **街景範例**：![streetview|ratio=16:10|阿斯塔納街景](51.1283, 71.4305)

<!-- 強制指定固定像素高度（此時會覆蓋等比例自適應） -->
- **固定高度範例**：![streetview|h=280](51.1283, 71.4305)
- **固定高度範例**：![streetview|320px](51.1283, 71.4305)
```

#### 5. 支援選項參數總覽（以 `|` 分隔）
| 參數名稱 | 說明 | 範例與預設值 |
| --- | --- | --- |
| **模式** | `streetview`（或 `sv`）、`map`（或 `view`）、`place`、`search` | 預設自動偵測 |
| **畫面比例** | `16:9`、`4:3`、`16:10`、`ratio=16:9`、`aspect=4:3` | **預設 16:9 固定比例自適應高度** |
| **固定高度** | `h=<數值>`、`height=<數值>`、`<數值>px`（覆蓋比例模式） | `h=280`（支援範圍 160~600） |
| **自訂標題** | 未包含 `=` 且非保留字之純文字 | 例如 `阿斯塔納行人標誌` |
| **heading** | 街景相機鏡頭水平方位角（0°~360°） | `heading=195` |
| **pitch** | 街景相機仰俯角度（-90°~90°，0 為水平） | `pitch=5` |
| **fov** | 街景水平視野視角（10°~100°） | `fov=75` |
| **zoom** | 地圖縮放倍率（1~21） | `zoom=16` |
| **fov** | 街景水平視野視角（10°~100°） | `fov=75` |
| **zoom** | 地圖縮放倍率（1~21） | `zoom=16` |

---

## 5. 媒體資源管理規範 (Media Assets Guidelines)

- **存放路徑**：一律存放在 `images/{類別}/` 目錄下（例如 `images/crossing/`）。
- **格式推薦**：標誌、圖示與向量線條推薦使用 **SVG** 格式；實拍照片請先壓縮為 **WebP** 或適當尺寸之 **PNG**。
- **引用路徑**：在 CSV 或 Markdown 中引用時，一律使用自儲存庫根目錄起算的絕對路徑，例如 `/images/crossing/kz.svg`。

---

## 6. 自動化索引編譯與發布流程 (Index Generation & CI/CD)

當 `inter-geo-data` 中的數據有任何異動時，前端仰賴輕量化 JSON 索引清單來實現 $O(1)$ 的即時定位與載入。

### 本機建置與測試

```bash
# 於 inter-geo-data 根目錄執行索引編譯腳本
npm run build:index

# 或直接透過 node 執行
node scripts/build-indexes.mjs
```

### 生成的索引產物 (`dist-index/`)

編譯腳本會遍歷所有檔案並輸出下列輕量索引：
1. **`info-index.json`**：所有情報卡的輕量 Stub 清單（標題、目標對象、標籤、權重，不含正文）。
2. **`info-targets.json`**：以目標 ISO-2/區域為 Key 的快速倒排索引表。
3. **`layers-index.json`**：所有 CSV 圖層的元數據定義與圖例清單。
4. **`data-index.json`**：所有空間向量幾何（FlatGeobuf）的檔案路徑與 BBox 外框。
5. **`images-index.json`**：圖片資源清單。
6. **`countries-index.json`**：國家基礎資料與代碼映射表。
7. **`index.json`**：包含上述所有索引版本與時間戳之 Root Manifest。

### GitHub Actions 自動發布

當變更推送到遠端 `main` 分支時：
1. GitHub Action 工作流程（`.github/workflows/generate-index.yml`）自動觸發。
2. 於遠端執行 `scripts/build-indexes.mjs`。
3. 自動將生成的索引發布至孤立的 **`index` 分支**。
4. 前端應用程式即可在無須重新部署的情況下，即時載入最新情資與圖資！
