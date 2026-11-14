# 屋企煮 · Home Kitchen

港式家常煮食助手，按早餐、午餐、晚餐、甜品提供建議，配合現有材料、器材、煮食時間及飲食偏好篩選。

此專案由2026年11月14日已上線版本匯出，原始版本 commit：`3e16241537014d8d95cba7012665027ef0c5b71c`。

## 已包含

- 500款主食譜＋32款備選食譜，共532筆完整配方。
- 材料克數、兩人份基準、煮法、參考來源、每份卡路里及三大營養素估算。
- 港式、西式、日式、韓式及其他家常菜；健康／一般／放鬆餐分類。
- 現有食材配對、帶飯／冷凍用途、份量換算、可選白飯估算、可選購物清單。
- 每行兩張食譜卡、右上角儲存、冇興趣與已學識回饋。
- 冇興趣食譜由有限備選一換一補位；用完後按實際數量顯示。

## 放上GitHub

Repository名稱建議：`home-kitchen`；Visibility建議：**Private**。

詳細圖文按鈕名稱及上載次序見 [UPLOAD_TO_GITHUB.md](UPLOAD_TO_GITHUB.md)。解壓後將本資料夾內的檔案與子資料夾上載至repository根目錄，根目錄應直接見到本README、package.json、web/及catalogue/。

## 本機執行

需要Node.js 22或以上；此專案沒有額外npm套件依賴。

```bash
npm run build
npm run check
npm run dev
```

開啟 `http://127.0.0.1:3000`。預覽伺服器可用 `npm run dev -- --port 4173` 指定埠號。

- `build`：由catalogue產生前端data.js，並打包Worker輸出至dist/server/index.js。
- `check`：檢查532筆資料、500款主庫、補位、份量、購物清單、回饋及偏好API。
- `dev`：啟動本機預覽。偏好API以記憶體模擬R2，重啟預覽會清空模擬雲端偏好。
- 想煮清單、食材、購物清單及器材使用瀏覽器localStorage。

## 原網站紀錄與部署

本包包含程式與食譜資料，沒有你的雲端偏好、想煮清單、食材、購物清單或登入憑證。要備份個人紀錄，先在原網站「我的廚房 → 匯出備份」下載JSON，自行保存在安全位置。

上載GitHub只保存程式碼；原本網站網址繼續由現有平台運行。上載或改GitHub檔案不會自動更新原網站。

這是包含Worker後端的專案，不能單靠GitHub Pages完整承載雲端同步。若要搬遷部署，需要另行配置Worker執行環境、R2 BUCKET、登入保護和資料搬遷。原平台提供的ChatGPT登入閘口並未包含在此原始碼內；直接公開Worker會讓所有訪客共用同一份偏好，因此正式搬遷前需先完成登入及每位使用者的資料隔離。

為避免誤連原網站，匯出包已移除原Site身分及Git設定。`config/hosting.example.json`僅作設定範例；如在支援的平台部署，填入該平台實際建立的project_id後，另存為`.openai/hosting.json`。本機建置毋須此設定。

## 專案結構

| 路徑 | 用途 |
| --- | --- |
| catalogue/recipes.json | 500款主食譜及32款reserve食譜 |
| catalogue/foods.json | 通用食材每100g營養估值，依序為kcal、蛋白質、碳水、脂肪 |
| catalogue/metadata.json | 食譜庫目標、備選數目及更新日期 |
| web/index.html、app.js、style.css | 畫面、互動及樣式 |
| web/data.js | 建置時由catalogue重新產生的資料 |
| web/photos.js、web/assets/ | 圖片對照、來源及既有圖片資源 |
| worker/index.js | 靜態資源與偏好API |
| scripts/ | 建置、預覽與驗證 |
| config/hosting.example.json | 不含原Site身分的設定範例 |

## 編輯食譜

修改`catalogue/recipes.json`，新增食材時亦要更新`catalogue/foods.json`。保留現有ID以維持紀錄關聯；每筆基準為2人份，重量按克計。`reserve: false`為主庫，`reserve: true`為備選。修改後執行`npm run check`，再提交GitHub。

卡路里及營養是估算，不是化驗值。本站改編版本未經實煮，圖片是同類菜式參考。外部圖片與原文版權歸各自權利人，詳見 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。
