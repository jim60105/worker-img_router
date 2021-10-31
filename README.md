# Cloudflare worker Img Router

> 這是從屬於 [jim60105/docker-Nextcloud](https://github.com/jim60105/docker-Nextcloud) 的Cloudflare Worker CD方案

## 說明

此Worker目的是縮短網址，將\
`img.domain.com/${pathname}` \
route至\
`nextcloud.domain.com/index.php/apps/sharingpath/${NEXTCLOUDUSERNAME}/Public/${pathname}`\
詳見[\[Docker\] Nextcloud自有雲建置 img圖片縮址](https://blog.maki0419.com/2020/07/docker-nextcloud.html#img%E5%9C%96%E7%89%87%E7%B8%AE%E5%9D%80)

在push至repo後，使用Github Action部屬至Cloudflare，並將所有參數以Github Secrets管理

## 設定

1. 參閱[Worker手冊](https://developers.cloudflare.com/workers/learning/getting-started)，直至可以建立一般的線上worker\
(Wrangler cli為非必要，但這可以讓你先在本機build過，且tail指令可以接上deployed worker收log)
2. 在github repo中設定以下secrets
   1. CF_ACCOUNT_ID: 由你的Cloudflare Account Home→Workers的右側找到，[或是從wangler cli取得](https://developers.cloudflare.com/workers/learning/getting-started#6-preview-your-project)
   2. CF_API_TOKEN: 由你的Cloudflare Profile→API Token→Create Token產生，[參照說明](https://developers.cloudflare.com/workers/cli-wrangler/authentication#generate-tokens)
   3. CF_ZONE_ID: 可以在你的網域總覧右側找到，[參照說明](https://developers.cloudflare.com/workers/learning/getting-started#optional-configure-for-deploying-to-a-registered-domain)
   4. NEXTCLOUDUSERNAME: Nextcloud的用戶名稱
   5. SOURCEHOST: 短網域，例如 `img.domain.com`
   6. TARGETHOST: Nextcloud網域，例如 `nextcloud.domain.com`
3. git push to master branch使Action啟動，建立worker
4. 至Cloudflare Worker設定route，將 `img.maki0419.com/*` 對應至此`img_route` worker

## 隨機圖片功能

如果收到任何檔名為random、附檔名為圖片的request，worker會取得同目錄下的random.json，並從中隨機選擇一張相同格式的圖片返回\
這功能設計來使用在論壇簽名檔圖片，每次重整就會不同

例: 訪問 `img.domain.com/random.png`，則會查詢 `img.domain.com/random.json`，從其中的png之下隨機選一張圖片返回\
json檔格式範例[在此](template/random.json)，請使用相對路徑

> `img.domain.com/random.json` img網域只開放了圖片相關的附檔名，json檔並不能被直接訪問\
> worker實際上是查詢了對應在TARGETHOST的該檔案

## 參考資料

### Set Up Github Actions: Deploy to Cloudflare Worker

<https://www.serviops.ca/a-full-ci-cd-pipeline-for-cloudflare-workers-with-github-actions/>
