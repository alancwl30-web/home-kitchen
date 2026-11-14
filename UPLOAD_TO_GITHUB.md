# 上載GitHub：按步驟操作

## 1. 建立空repository

1. 登入GitHub，開啟 https://github.com/new 。
2. Repository name填入：`home-kitchen`。
3. Description可填入：`屋企煮：500款家常食譜、食材配對、營養估算及帶飯規劃`。
4. 選擇 **Private**。
5. README、.gitignore及License先不加入；本包已含README及.gitignore，第三方圖片也不適合直接一併套用開源授權。
6. 按 **Create repository**。

## 2. 解壓與上載

1. 下載ZIP，在電腦解壓，打開`home-kitchen`資料夾。
2. 在GitHub新repository頁按 **uploading an existing file**；已有檔案時用 **Add file → Upload files**。
3. 將資料夾內全部檔案與子資料夾拖入上載區。不要只上載ZIP，也不要把外層home-kitchen資料夾當成根目錄下的一層。
4. Commit message可填：`Initial import: Home Kitchen 500 recipes`。
5. 按 **Commit changes**，直接提交至`main`。
6. 完成後根目錄應見README.md、package.json、catalogue/、web/、worker/、scripts/及config/。

GitHub網頁每次最多100個檔案、每檔25MiB。如提示檔案數過多，可先上載README、package.json、catalogue/、scripts/、worker/及config/，再分批上載web/。Mac若看不到.gitignore，可按Command+Shift+句號顯示隱藏檔，或之後用GitHub「Add file → Create new file」新增同名檔案。保留資料夾路徑即可。

## 3. 確認與後續

- 本次先保存原始碼，不需要開啟GitHub Pages，也不需要設定「Deploy from a branch」。
- GitHubrepository與原網站部署並非自動連動。
- 個人使用紀錄需在原網站匯出；請不要把個人備份JSON提交到公開repository。
- 如果之後想由GitHub自動部署，需要另外接駁支援Worker及R2的主機與登入系統。

官方操作說明：
- 建立repository：https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository
- 上載檔案：https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository
