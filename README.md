# 屋企煮 · Home Kitchen

500款食譜＋32款備選。最新版本提供Email＋密碼登入、登出，以及Firebase個人雲端同步。

啟用登入前，請按 [FIREBASE_SETUP.md](FIREBASE_SETUP.md) 在Firebase啟用Email/Password、建立自己的帳戶及發佈Firestore規則。程式沒有Google登入或公開註冊按鈕。

## 開啟網站

root index.html會導向web/，可部署至靜態主機。Private repository能否使用GitHub Pages，視你的GitHub方案而定。本次程式更新沒有變更公開範圍、沒有啟用Pages，亦沒有修改原Sites網站。

## 本機建置與測試

需要Node.js22或以上，沒有npm套件依賴。

```bash
npm run check
npm run dev
```

開啟http://127.0.0.1:3000。測試包括食譜、份量、購物清單、替補、Email登入介面與模擬SDK同步；沒有使用真實密碼操作正式帳戶。

## 個人紀錄

未登入時只存目前瀏覽器；登入後收藏、飲食偏好、已學識、食材、購物清單及器材按帳戶同步。已登入帳戶的快取及未同步紀錄分UID存放。本機舊資料需要明確匯入，沒有自動覆蓋雲端。

相同帳戶在兩部裝置同時修改時，以版本檢查偵測衝突，讓你選擇保留哪一份；沒有逐項自動合併。雲端只存個人狀態，食譜及圖片仍由網站提供。

## 程式結構

- catalogue/：食譜、每100g營養估值及目錄metadata。
- web/：食譜介面、Firebase Email登入及同步。
- web/cloud-state.mjs：同步狀態與版本衝突邏輯。
- web/firebase-config.mjs：從現有咖啡網站取得的公開Firebase網頁設定。
- firestore.rules：煮食App規則與repo中既有咖啡規則的參考組合；發布前需與控制台現有規則比對。
- worker/：保留原平台後端原始碼；新版前端沒有再呼叫/api/preferences。
- scripts/：建置、預覽及驗證。

## 更新

編輯catalogue/recipes.json及catalogue/foods.json後執行npm run check；提交產生的web/data.js及相關原始碼。上載GitHub不會自動更新原Sites網址。

食譜改編未經實煮，營養是估算；圖片版權與來源見 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。
