# GitHub及發布

完整原始碼位於alancwl30-web/home-kitchen，main分支。

1. 首次上載時，解壓後將資料夾內全部檔案及子資料夾放在repository根目錄，root應有index.html、package.json、web/及catalogue/。
2. 日後修改食譜後執行npm run check，提交變更及重新產生的web/data.js。
3. 啟用Email登入及雲端同步，請跟隨FIREBASE_SETUP.md。Firebase控制台設定不會因上載程式而自動改動。
4. 若GitHub方案支援此Private repository使用Pages，可選main／(root)。否則保留Private，另選靜態主機或自行決定方案；此專案更新不會自動改成Public。

root index.html導向web/。食譜及相片由靜態網站提供，個人狀態由Firebase處理。GitHub更新不會自動更新原Sites網址；原網站紀錄須自行匯出並匯入新版本。
