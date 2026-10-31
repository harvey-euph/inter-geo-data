# 美國州際公路系統 (Interstate Highway System)
- id: us-interstate-highways
- targets: US, US-INTERSTATE, US-HIGHWAY
- layer: us-interstates
- icon: 🛣️
- accent: #38bdf8
- tags: Infrastructure, Geoguessr
- priority: 15

- **【東西走向偶數號 (East-West Even)】** 偶數號碼為橫貫東西走向，全美號碼自南向北遞增（I-10 沿最南方美墨邊境與墨西哥灣，I-90 沿最北方五大湖與加拿大邊界）。
  - **I-10 ~ I-20 (號碼偏小)**：橫貫美國南部陽光地帶（加州、德州、佛羅里達等）。
  - **I-40 (號碼居中偏南)**：橫貫美南核心地帶（北卡、田納西、奧克拉荷馬、新墨西哥、亞利桑那）。
  - **I-70 (號碼居中偏北)**：橫貫美國心臟地帶（馬里蘭、俄亥俄、堪薩斯、科羅拉多、猶他）。
  - **I-80 ~ I-90 (號碼偏大)**：橫貫美國中北部及五大湖區（波士頓、紐約、芝加哥、華盛頓州西雅圖）。
- **【南北走向奇數號 (North-South Odd)】** 奇數號碼為縱貫南北走向，全美號碼自西向東遞增（I-5 緊貼太平洋西岸，I-95 緊貼大西洋東岸）。
  - **I-5 ~ I-15 (號碼偏小)**：縱貫美國西部太平洋沿線（加州、奧勒岡、華盛頓州、內華達）。
  - **I-25 ~ I-35 (號碼居中)**：縱貫大平原與中西部（德州、堪薩斯、內布拉斯加）。
  - **I-55 ~ I-75 (號碼偏中東)**：縱貫密西西比河流域至五大湖（芝加哥、印第安納、肯塔基、田納西、阿拉巴馬）。
  - **I-85 ~ I-95 (號碼偏大)**：縱貫美國大西洋東海岸（波士頓、紐約、費城、DC、佛羅里達）。
- **【三位數支線編號規則與盾牌】**
  - **首位為偶數 (如 I-285, I-405)**：為「**環城公路 (Beltway / Loop)**」，兩端皆銜接母幹線，環繞大都會區。
  - **首位為奇數 (如 I-280, I-395)**：為「**單頭支線 (Spur)**」，僅有一端銜接母幹線，深入市中心、港口或機場。
  - **出口里程与盾牌**：紅白藍三色盾牌；Exit 編號多代表該州起點累加之英里里程。


# 美國編號國道系統 (U.S. Numbered Highway System)
- id: us-numbered-routes
- targets: US, US-Route, US-Highway
- layer: us-numbered-highways
- icon: 🛡️
- accent: #fbbf24
- tags: Infrastructure, Geoguessr
- priority: 16

- **【國道與州際走向完全顛倒法則】** 1926 年創立的白底黑字盾牌美國國道系統，為避免與後來的州際公路混淆，兩者號碼遞增方向完全相反！
  - **偶數東西走向**：號碼由**北向南**遞增（US 2 沿加拿大邊界；US 90/98 位於最南方墨西哥灣）。
  - **奇數南北走向**：號碼由**東向西**遞增（US 1 緊貼大西洋東岸；US 101 緊貼太平洋西岸）。
- **【三位數支線規則】**：三位數國道為兩位數母幹線的支線，後兩位繼承母路編號（例如 US 160 從 US 60 分出）。
- **【歷史名路與經典景致】**
  - **US 66（母親之路 Route 66）**：芝加哥直通加州聖塔莫尼卡，穿越八州。
  - **US 101（太平洋海岸公路）**：縱貫華盛頓州奧林匹克半島至加州洛杉磯。
  - **US 61（藍調公路 Blues Highway）**：縱貫明尼蘇達至紐奧良密西西比河三角洲。


# 歐洲國際 E 級公路網 (International E-Road Network)
- id: europe-e-roads
- targets: E-ROAD, EUROPE-HIGHWAY, DE-HIGHWAY, FR-HIGHWAY, IT-HIGHWAY, PL-HIGHWAY
- priority: 120
- icon: 🇪🇺
- accent: #10b981
- tags: Infrastructure, Geoguessr

- **【雙位數網格走廊法則】** 歐洲 E 級公路是由聯合國歐洲經濟委員會 (UNECE) 統一規劃的跨國公路網絡，具有高度規則的號碼網格：
  - **末碼為 0（東西橫貫主要走廊）**：自北向南遞增。例如 E10 橫跨北歐挪威與瑞典，E40 橫跨法國加萊至哈薩克與中國邊界（全長超過 8,000 公里，為全歐最長公路），E90 橫貫南歐西班牙、義大利、希臘與土耳其。
  - **末碼為 5（南北縱貫主要走廊）**：自西向東遞增。例如 E05 縱貫英國格拉斯哥經法國至西班牙南部，E45 縱貫挪威阿爾塔經瑞典、丹麥、德國、奧地利至義大利西西里島。
- **【路標與跨國路網特色】**
  - **路標格式**：一律為**綠底白字白邊**的圓角長方形盾牌，通常與各國國內公路編號並列標示。


# 德國聯邦高速公路 (Bundesautobahn · A 級高速)
- id: germany-autobahn
- targets: DE, DE-HIGHWAY, DE-INTERSTATE, AUTOBAHN
- layer: de-interstates
- icon: 🇩🇪
- accent: #38bdf8
- tags: Infrastructure, Geoguessr
- priority: 15

- **【奇數南北、偶數東西法則】** 德國 Autobahn 採用深藍底白字指示牌與藍底白字六角形盾牌，擁有全球最井然有序的編號體系：
  - **單數位 A 1 ~ A 9（全國九大骨幹幹線）**：
    - **奇數南北縱貫（由西向東遞增）**：A 1（魯爾區至漢堡/呂北克）、A 3（荷蘭邊境至法蘭克福與奧地利）、A 5（黑森林至瑞士巴塞爾）、A 7（丹麥邊界貫穿中部至奧地利邊界，德國最長高速）、A 9（柏林直達慕尼黑）。
    - **偶數東西橫貫（由北向南遞增）**：A 2（魯爾區直達柏林）、A 4（亞琛至法蘭克福與波蘭邊界）、A 6（薩爾布呂肯經紐倫堡至捷克）、A 8（卡斯魯爾至慕尼黑與薩爾斯堡）。
  - **雙數位 A 10 ~ A 99（區域跨邦動脈）**：十位數代表地理區域（A 1x 為柏林大環線與東德，A 2x 為北德，A 3x 為下薩克森，A 4x~5x 為魯爾與萊茵區，A 6x 為黑森，A 8x 為巴登-符騰堡，A 9x 為巴伐利亞）。
  - **三數位 A 100 ~ A 999（大都會區支線/環線）**：短程市區快速道路（如 A 100 柏林內環）。除施工或都會區外無強制速限（建議速限 130 km/h）。


# 德國聯邦公路系統 (Bundesstraße · B 級國道)
- id: germany-bundesstrasse
- targets: DE, DE-HIGHWAY
- layer: de-highways
- icon: 🛣️
- accent: #fbbf24
- tags: Infrastructure, Geoguessr
- priority: 16

- **【黃底黑字聯邦幹線網】** 德國聯邦公路（Bundesstraße，簡稱 **B**）採用醒目的**黃底黑字長方形盾牌**與黃底方向指示牌，構成串聯全德城鎮的一級國道網：
  - **B 1 ~ B 99 骨幹國道**：如歷史悠久的 **B 1** 自荷蘭邊境亞琛橫貫魯爾區、柏林直抵波蘭邊界；**B 2** 縱貫柏林經萊比錫、紐倫堡、奧格斯堡至阿爾卑斯山麓；**B 3** 縱貫漢諾威、法蘭克福至瑞士巴塞爾。
  - **區域三位數編號**：**B 100~199** 分佈於東部與北部；**B 200~299** 分佈於北德與西德；**B 300~399** 分佈於南德巴伐利亞與巴登-符騰堡；**B 400~500+** 為中西部補充幹道。


# 日本高速自動車國道與都市高速 (Japan Expressways)
- id: japan-expressways
- targets: JP, JP-HIGHWAY, JP-INTERSTATE, EXPRESSWAY
- layer: jp-interstates
- icon: 🇯🇵
- accent: #38bdf8
- tags: Infrastructure, Geoguessr
- priority: 15

- **【路線編號系統 (E/C 系統)】** 日本高速公路一律採用**深綠底白字**路牌，並於 2017 年全面導入英數字編號：
  - **E 代表 Expressway（跨區域高速公路）**：多數與平行的主要一般國道號碼相對應。例如 **E1**（東名高速/名神高速，對應國道1號）、**E4**（東北自動車道，對應國道4號）、**E8**（北陸自動車道，對應國道8號）、**E3**（九州自動車道）。
  - **C 代表 Circular（都市環狀線）**：專門標示各大都會區的外環與內環高速。例如東京的 **C1**（首都高都心環狀線）、**C2**（中央環狀線）、**C3**（東京外環道）、**C4**（圈央道）。
- **【設施與收費特徵】**：交流道標註 **IC**、系統交流道為 **JCT**、休息服務區為 **PA / SA**，收費站上方有顯眼的紫色 **ETC** 標牌。


# 日本一般國道系統 (Japan National Highways · 一般国道)
- id: japan-national-highways
- targets: JP, JP-HIGHWAY
- layer: jp-highways
- icon: 🛡️
- accent: #fbbf24
- tags: Infrastructure, Geoguessr
- priority: 16

- **【藍底倒三角形「飯糰標誌 (おにぎり)」】** 日本一般國道與都道府縣道採用**深藍底白字**指示牌，國道編號盾牌為藍底白字紅邊倒三角形：
  - **一至二位數主要骨幹（1 ~ 58 號）**：傳承自江戶五街道與明治一級國道——**國道 1 號**（東京—大阪，舊東海道）、**2 號**（大阪—北九州，舊山陽道）、**4 號**（東京—青森，舊奧州街道）、**5 號**（北海道函館—札幌）、**58 號**（鹿兒島跨海經奄美至沖繩那霸）。
  - **三位數國道南北遞增法則（101 ~ 507 號）**：三位數國道大致遵循「**由北（青森 101/102 號）向南（九州與沖繩 507 號）遞增**」的規律，是街景中快速判斷南北緯度的極佳依據。


# 台灣國道高速公路系統 (Taiwan National Freeways)
- id: taiwan-freeways
- targets: TW, TW-HIGHWAY, TW-INTERSTATE
- layer: tw-interstates
- icon: 🇹🇼
- accent: #38bdf8
- tags: Infrastructure, Geoguessr
- priority: 15

- **【國道梅花標誌與奇偶走向法則】** 台灣國道採用白底綠框「**梅花形**」標誌與綠底白字路牌：
  - **奇數號南北縱貫**：
    - **國道 1 號（中山高速公路）**：基隆直通高雄，貫穿西部平原各大都會區。
    - **國道 3 號（福爾摩沙高速公路）**：基隆大武崙至屏東大鵬灣，沿西部麓山帶丘陵行經。
    - **國道 5 號（蔣渭水高速公路）**：南港經雪山隧道直通宜蘭蘇澳。
  - **偶數號東西聯絡**：**國道 2 號**（桃園機場聯絡道）、**國道 4 號**（台中環線）、**國道 6 號**（霧峰至埔里）、**國道 8 號**（台南支線）、**國道 10 號**（左營至旗山）。


# 台灣省道與快速公路系統 (Taiwan Provincial Highways)
- id: taiwan-provincial-highways
- targets: TW, TW-HIGHWAY
- layer: tw-highways
- icon: 🛡️
- accent: #fbbf24
- tags: Infrastructure, Geoguessr
- priority: 16

- **【省道盾牌體系（藍盾一般省道 vs 紅盾快速公路）】**
  - **藍底白字盾牌（一般省道，奇數南北、偶數東西）**：**台 1 線**（西部縱貫公路）、**台 3 線**（內山公路）、**台 9 線**（北宜、蘇花、花東縱谷與南迴公路）、**台 11 線**（花東海岸公路）、**台 17 線**（西部濱海公路）。
  - **紅底白字盾牌（省道快速公路）**：**台 61 線**（西部濱海快速公路），以及 **台 62 / 64 / 66 / 68 / 72 / 74 / 76 / 78 / 82 / 84 / 86 / 88** 等東西向快速公路，全線立體交叉無平交號誌。


# 英國 M 級高速公路系統 (United Kingdom Motorways)
- id: uk-roads
- targets: GB, GB-HIGHWAY, GB-INTERSTATE
- layer: gb-interstates
- icon: 🇬🇧
- accent: #38bdf8
- tags: Infrastructure, Geoguessr
- priority: 15

- **【藍底白字 Motorway 放射編號】** 英國高速公路以 **M** 開頭，採用**藍底白字**路標，依倫敦與愛丁堡放射分區編碼：
  - **英格蘭與威爾斯主幹**：**M1**（倫敦至里茲）、**M25**（倫敦大外環高速）、**M4**（倫敦橫貫至南威爾斯）、**M5**（伯明罕至西南英格蘭）、**M6**（英國最長高速，自中部縱貫西北至蘇格蘭邊境）、**M62**（利物浦—曼徹斯特—里茲橫貫線）。
  - **蘇格蘭主幹**：**M8**（連接愛丁堡與格拉斯哥）、**M74 / A74(M)**（格拉斯哥南下銜接 M6）、**M9 / M90**。


# 英國 A 級主要幹道系統 (United Kingdom Primary A-Roads)
- id: uk-a-roads
- targets: GB, GB-HIGHWAY, GB-FEDERAL
- layer: gb-highways
- icon: 🛣️
- accent: #fbbf24
- tags: Infrastructure, Geoguessr
- priority: 16

- **【綠底黃字 Primary Route 順時針扇區】** 英國主要幹道以 **A** 開頭，採用**深綠底白字路牌搭配金黃色路線號碼**：
  - **倫敦順時針 1~6 區**：**A1**（倫敦直達愛丁堡的大北路 Great North Road）、**A2**（往多佛）、**A3**（往樸茨茅斯）、**A4**（往布里斯托）、**A5**（往北威爾斯 Holyhead）、**A6**（往西北卡萊爾）。
  - **愛丁堡順時針 7~9 區**：**A7**（往卡萊爾）、**A8**（往格拉斯哥）、**A9**（縱貫蘇格蘭高地至印威內斯與最北端瑟索）。


# 法國 A 級高速公路系統 (France Autoroutes)
- id: france-roads
- targets: FR, FR-HIGHWAY, FR-INTERSTATE
- layer: fr-interstates
- icon: 🇫🇷
- accent: #38bdf8
- tags: Infrastructure, Geoguessr
- priority: 15

- **【藍底路牌與紅底 A 標籤 (Cartouche)】** 法國高速公路以 **A** 開頭，採用藍底白字路牌，頂部附紅底白字小矩形編號：
  - **巴黎放射核心幹線**：**A1**（巴黎—里爾）、**A4**（巴黎—史特拉斯堡）、**A6 / A7（陽光高速公路 Autoroute du Soleil）**（巴黎—里昂—馬賽）、**A10**（巴黎—波爾多）、**A11**（巴黎—南特）、**A13**（巴黎—諾曼第）。
  - **雙位數區域分佈**：**A2x**（北部）、**A3x**（東北阿爾薩斯/洛林）、**A4x**（里昂與阿爾卑斯）、**A5x**（普羅旺斯）、**A6x**（西南波爾多—土魯斯）、**A7x**（中央高原）、**A8x**（布列塔尼與羅亞爾河谷）。


# 法國 N 級國道與省道幹線系統 (Routes Nationales & Départementales)
- id: france-national-roads
- targets: FR, FR-HIGHWAY, FR-FEDERAL
- layer: fr-highways
- icon: 🛣️
- accent: #fbbf24
- tags: Infrastructure, Geoguessr
- priority: 16

- **【紅底 N 國道與黃底 D 省道標籤】**
  - **N 開頭（Route Nationale 國道）**：頂部為**紅底白字** Cartouche 標籤（如歷史名路 **N7**、**N10**、**N12**）。
  - **D 開頭（Route Départementale 省道）**：頂部為**黃底黑字** Cartouche 標籤；2006 年後大量原國道下放給各省並改編為 `D6xx / D8xx / D9xx / DNx`。


# 巴西雙向高速幹道網 (Rodovias Duplicadas do Brasil)
- id: brazil-interstates
- targets: BR
- layer: br-interstates
- icon: 🇧🇷
- accent: #38bdf8
- tags: Infrastructure, Geoguessr
- priority: 15

- **【東南部與南部現代化高速公路網】** 集中於聖保羅、里約熱內盧、米納斯吉拉斯與南部三州之雙向多車道分隔高速公路：
  - **核心走廊**：串聯聖保羅與里約的 **BR-116 (Via Dutra)**、聖保羅至庫里奇巴與南部的 **BR-116 (Régis Bittencourt)**、聖保羅至貝洛奧里藏特的 **BR-381 (Fernão Dias)**，以及聖保羅州頂級州立高速 **SP-348 (Bandeirantes)**、**SP-330 (Anhanguera)** 與 **SP-280 (Castelo Branco)**。


# 巴西 BR 聯邦與州級公路系統 (Rodovias Federais & Estaduais)
- id: brazil-highways
- targets: BR
- layer: br-highways
- icon: 🛡️
- accent: #fbbf24
- tags: Infrastructure, Geoguessr
- priority: 16

- **【聯邦公路 (BR-xxx) 百位數幾何法則】**
  - **000–099（放射幹線）**：以首都**巴西利亞 (DF)** 為中心向八方放射（BR-040 往里約、BR-050 往聖保羅、BR-010 往貝倫）。
  - **100–199（南北縱貫幹線）**：由東向西遞增（**BR-101** 貫穿大西洋東岸南北、**BR-116** 縱貫內陸各大城、**BR-163** 縱貫中西部農業帶）。
  - **200–299（東西橫貫幹線）**：由北向南遞增（**BR-230 亞馬遜橫貫公路**、**BR-262**、**BR-277**）。
  - **300–399（對角線幹線）與州級公路縮寫**：州級公路直接使用「**兩碼州縮寫-數字**」（如 `SP-280` 聖保羅、`PR-323` 巴拉那、`RS-122` 南大河），路側里程碑皆印有州縮寫。


# 墨西哥收費高速公路系統 (Autopistas de Cuota · 尾綴 D)
- id: mexico-interstates
- targets: MX
- layer: mx-interstates
- icon: 🇲🇽
- accent: #38bdf8
- tags: Infrastructure, Geoguessr
- priority: 15

- **【收費高速 (Cuota，尾綴 D)】** 與免費聯邦公路平行的雙向分隔收費高速公路，會在原編號後加上字母 **D**（Directo）：
  - **主要幹線**：縱貫太平洋岸的 **MEX 15D**、貫穿中部工業走廊（墨西哥城—克雷塔羅—蒙特雷—新拉雷多邊境）的 **MEX 57D** & **MEX 85D**、通往韋拉克魯斯港的 **MEX 150D**、通往阿卡普爾科的 **MEX 95D（太陽高速）**。


# 墨西哥聯邦與州級公路系統 (Carreteras Federales Libre)
- id: mexico-highways
- targets: MX
- layer: mx-highways
- icon: 🛡️
- accent: #fbbf24
- tags: Infrastructure, Geoguessr
- priority: 16

- **【聯邦公路 (Carretera Federal) 編號與盾牌】**
  - **西北至東南遞增**：奇數南北向、偶數東西向——**MEX 1** 縱貫下加利福尼亞半島、**MEX 2** 沿美墨北境橫貫、**MEX 45** 縱貫中部高原、**MEX 180 / 186 / 307** 位於東南端尤卡坦半島與坎昆。
  - **聯邦 vs 州級盾牌**：聯邦盾牌頂部印有 `MÉXICO`、兩側呈內凹圓弧；州級盾牌兩側為直線斜邊並印有州縮寫（如 `SON`、`JAL`、`NL`；注意 `MEX` 為墨西哥州）。


# 加拿大高速公路網 (400-Series, Autoroutes & Freeways)
- id: canada-interstates
- targets: CA
- layer: ca-interstates
- icon: 🇨🇦
- accent: #38bdf8
- tags: Infrastructure, Geoguessr
- priority: 15

- **【安大略 400 系列與魁北克 Autoroutes】**
  - **安大略省 (Ontario)**：著名的 **400 系列高速公路**（如 **Highway 401** 貫穿溫莎—多倫多—蒙特婁邊界，另有 400、403、404、407、417 與 QEW），路牌頂部有皇冠標誌。
  - **魁北克省 (Québec)**：全法語標示，高速公路稱為 **Autoroute**（藍紅雙色百合花盾牌，編號為 **A-5 ~ A-99** 如 A-20、A-40、A-15，及三位數環線 A-440）。


# 加拿大橫貫公路與省級幹道系統 (Trans-Canada & Provincial Highways)
- id: canada-highways
- targets: CA
- layer: ca-highways
- icon: 🛡️
- accent: #fbbf24
- tags: Infrastructure, Geoguessr
- priority: 16

- **【綠底白楓葉橫貫公路與各省編號】**
  - **西部四省（BC、AB、SK、MB）**：橫貫公路主線統一編為 **Highway 1**，北線（Yellowhead）統一編為 **Highway 16**；BC 省另有 **Highway 3 / 5 / 97**（藍紅白盾牌），亞伯達省南北主動脈為 **Highway 2**。
  - **安大略、魁北克與海洋三省**：安大略北部以 **Highway 11 & 17** 為主幹；魁北克省級幹道為綠底盾牌 **100~399 號**；新斯科細亞省主幹道為 **100 系列（101~107）**。


# 澳洲 M 級高速與 1 號環澳走廊 (Australia Motorways & Highway 1)
- id: australia-interstates
- targets: AU
- layer: au-interstates
- icon: 🇦🇺
- accent: #38bdf8
- tags: Infrastructure, Geoguessr
- priority: 15

- **【1 號環澳公路與跨州 M 級高速】**
  - **1 號環澳公路 (Highway 1)**：全長約 14,500 公里，串聯澳洲大陸所有州首府（如東岸 **M1 Pacific Motorway**、東南 **A1 Princes Highway**、南澳 **A1 Eyre Highway**）。
  - **跨州高速走廊**：雪梨直通墨爾本的 **M31 Hume Highway**、墨爾本至阿德雷德的 **M8 / A8 Western Highway**。


# 澳洲內陸與各州主要幹線系統 (Australia Primary & Outback Highways)
- id: australia-highways
- targets: AU
- layer: au-highways
- icon: 🛡️
- accent: #fbbf24
- tags: Infrastructure, Geoguessr
- priority: 16

- **【綠底金黃字 A/B 級幹道與 Outback 公路】**
  - **紅土中心縱貫線**：**A87 Stuart Highway** 自南澳奧古斯塔港經愛麗絲泉直抵北領地首府達爾文。
  - **內陸幹道與西澳特例**：新南威爾斯內陸縱貫線為 **A39 Newell Highway**；西澳（WA）則保留白底黑字盾牌與綠底金字五角國家盾牌（如 **National Route 95 Great Northern Highway**）。


# 義大利 A 級高速公路系統 (Autostrade d'Italia)
- id: italy-interstates
- targets: IT
- layer: it-interstates
- icon: 🇮🇹
- accent: #38bdf8
- tags: Infrastructure, Geoguessr
- priority: 15

- **【綠底路標與八角形 A 盾牌】** 與德法相反，義大利高速公路（Autostrada）採用**綠底白字**路標：
  - **半島四大骨幹**：**A1（太陽高速 Autostrada del Sole）**（米蘭—波隆那—佛羅倫斯—羅馬—拿坡里）、**A4（Serenissima）**（橫貫北義波河平原）、**A14**（亞得里亞海東岸高速）、**A2**（南義地中海高速）。


# 義大利 SS 國家幹線公路系統 (Strade Statali d'Italia)
- id: italy-highways
- targets: IT
- layer: it-highways
- icon: 🛡️
- accent: #fbbf24
- tags: Infrastructure, Geoguessr
- priority: 16

- **【藍底路標與古羅馬領事大道】** 義大利一般國道（Strada Statale，簡稱 **SS**）採用**藍底白字**路標，多數沿用古羅馬大道名稱：
  - **經典國道**：**SS1 Via Aurelia**（羅馬沿西岸北上至法國邊界）、**SS7 Via Appia**（阿皮亞大道）、**SS9 Via Emilia**、**SS16 Adriatica**（縱貫東岸）、**SS131**（薩丁尼亞島主幹道）。


# 西班牙高速與快速公路網 (Autopistas y Autovías de España)
- id: spain-interstates
- targets: ES
- layer: es-interstates
- icon: 🇪🇸
- accent: #38bdf8
- tags: Infrastructure, Geoguessr
- priority: 15

- **【馬德里太陽門 (Km 0) 六大放射走廊】** 藍底白字路標，包含公立免費快速公路（**A-xx Autovía**）與特許高速（**AP-xx Autopista**）：
  - **A-1 ~ A-6 順時針放射**：**A-1**（往北巴斯克）、**A-2**（往東北薩拉戈薩/巴塞隆納）、**A-3**（往東瓦倫西亞）、**A-4**（往南安達盧西亞塞維亞）、**A-5**（往西南葡萄牙邊界）、**A-6**（往西北加利西亞），以及沿地中海岸縱貫的 **AP-7 / A-7**。


# 西班牙 N 級國家幹線公路網 (Carreteras Nacionales de España)
- id: spain-highways
- targets: ES
- layer: es-highways
- icon: 🛡️
- accent: #fbbf24
- tags: Infrastructure, Geoguessr
- priority: 16

- **【紅底白字 N-xxx 扇區編號法則】** 傳統國家幹線公路以紅底白字 `N-xxx` 標示，三位數首碼（`1`~`6`）嚴格落在馬德里六大放射扇區內：
  - **扇區定位**：`N-1xx` 在北方、`N-2xx` 在東北、`N-3xx` 在東南地中海（如 **N-340**）、`N-4xx` 在南方安達盧西亞、`N-5xx` 在西南、`N-6xx` 在西北。


# 波蘭 A/S 級高速與快速公路網 (Autostrady i Drogi Ekspresowe)
- id: poland-interstates
- targets: PL
- layer: pl-interstates
- icon: 🇵🇱
- accent: #38bdf8
- tags: Infrastructure, Geoguessr
- priority: 15

- **【A 級高速與 S 級快速道路】** 採用紅底白字白邊 `A` / `S` 編號牌：
  - **三大高速 (A1 / A2 / A4)**：**A1（琥珀高速）** 縱貫南北（格但斯克—羅茲—捷克邊界）；**A2（自由高速）** 橫貫中部（德國邊界—波茲南—華沙）；**A4** 橫貫南部（德國邊界—弗羅茨瓦夫—克拉科夫—烏克蘭邊界），搭配 **S7 / S8 / S5 / S19** 快速路網。


# 波蘭 DK 國家幹線公路系統 (Drogi Krajowe w Polsce)
- id: poland-highways
- targets: PL
- layer: pl-highways
- icon: 🛡️
- accent: #fbbf24
- tags: Infrastructure, Geoguessr
- priority: 16

- **【紅底白字純數字國道 (DK 1 ~ 99)】** 波蘭國家幹線公路以紅底白字純數字小矩形標示（無字母前綴）：
  - **編號分佈**：**DK 1 ~ DK 9** 為全國主要縱橫走廊，**DK 10 ~ DK 94** 則覆蓋各省城鎮（如與 A4 平行的南波蘭幹線 **DK 94**、北部濱海與湖區的 **DK 16 / DK 22**）。


# 俄羅斯 M 級聯邦高速與歐洲走廊幹線 (Магистрали М России)
- id: russia-interstates
- targets: RU
- layer: ru-interstates
- icon: 🇷🇺
- accent: #38bdf8
- tags: Infrastructure, Geoguessr
- priority: 15

- **【莫斯科放射 M 級聯邦主幹線】** 以首都莫斯科為中心向外放射的最高等級聯邦公路：
  - **主要幹線**：**M-1（白俄羅斯公路，E30）**、**M-4（頓河公路 Дон，往羅斯托夫與索契）**、**M-5（烏拉爾公路 Урал）**、**M-7（伏爾加公路 Волга，往喀山）**、**M-8（霍爾莫戈雷，往阿爾漢格爾斯克）**、**M-10 / M-11（連接莫斯科與聖彼得堡）**。


# 俄羅斯 R/A 級跨區與西伯利亞聯邦公路 (Трассы Р / А России)
- id: russia-highways
- targets: RU
- layer: ru-highways
- icon: 🛡️
- accent: #fbbf24
- tags: Infrastructure, Geoguessr
- priority: 16

- **【Р (R) 跨區幹線與西伯利亞長征公路】**
  - **西伯利亞橫貫走廊**：由西向東依序為 **R-254（額爾齊斯：車里雅賓斯克—新西伯利亞）**、**R-255（西伯利亞：新西伯利亞—伊爾庫茨克）**、**R-258（貝加爾：伊爾庫茨克—赤塔）**、**R-297（阿穆爾：赤塔—哈巴羅夫斯克）** 與 **A-370（烏蘇里：哈巴羅夫斯克—海參崴）**。
  - **А (A) 聯絡與邊境幹線**：通往重要港口與邊境口岸的支線（如加里寧格勒的 A-229、索契海岸的 A-147）。
