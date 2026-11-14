# Email＋密碼登入啟用步驟

程式已接駁現有Firebase專案coffee-journal-342ba，使用公開網頁設定。沒有Google登入掣或公開註冊按鈕。

1. Firebase控制台選擇coffee-journal-342ba → Authentication → Sign-in method → Email/Password，啟用第一個Email/Password選項並儲存；毋須啟用Email link。咖啡網站仍需保留Google provider。
2. Authentication → Users → Add user，填入你自己嘅Email及密碼建立帳戶；密碼只在Firebase控制台輸入，毋須發送給任何人。若Email已屬於同專案既有Google帳戶，先使用另一個你持有的Email建立獨立密碼帳戶，避免誤改咖啡登入；如需要共用同一Email，應另行加入帳戶連結／密碼設定流程。
3. Firestore Database → Rules：先比對控制台目前規則，加入repository的homeKitchen規則區塊；保留其他既有規則。firestore.rules完整範例亦保留repo內咖啡brews規則，但未在控制台核實是否另有其他規則，勿直接覆蓋未知內容。Publish後程式才有權同步。
4. 網站部署後以Email＋密碼登入。初次登入會讀取帳戶雲端資料；本機舊紀錄需要按「將本機紀錄加入此帳戶」才會寫入，操作會取代帳戶現有版本，請先匯出備份。
5. 若原私人網站已有資料，先在原網站「我的廚房 → 匯出備份」，到新網站登入後用「我的廚房 → 還原備份」匯入。新Firebase版本不會自動讀取舊Sites後端。

## 網站網址

root index.html會導向web/，適合靜態主機。若GitHub方案支援目前Private repository使用Pages，可在Settings → Pages選main／(root)。已存在的GitHub Pages方案限制沒有被本次程式改動解除；本次沒有更改repository公開範圍或啟用Pages。

本機測試使用npm run build及npm run dev。登出後回到瀏覽器本機紀錄，帳戶快取及未同步變更按UID分開保存。

## 同步方式及限制

每個帳戶儲存在users/{uid}/homeKitchen/state。每次寫入使用Firestore transaction與revision檢查。另一部裝置同時修改時，會顯示版本選擇，避免靜默覆蓋；此版本沒有逐項自動合併。正在使用期間斷線的未同步修改會保留在此瀏覽器，恢復連線或按重試後再同步；重新開啟時需成功讀取雲端，才開放帳戶資料編輯。

UI沒有註冊按鈕，但啟用Email/Password本身不保證Firebase專案禁止所有其他人自行註冊。權限規則確保不同UID不能讀寫你的資料。如要限制只有一個指定帳戶能使用，建立帳戶後可再按該UID收窄homeKitchen規則。

尚未使用真實Email／密碼在正式專案驗證；需先完成以上控制台設定。不要把密碼、管理員私鑰或service account憑證加入GitHub。
