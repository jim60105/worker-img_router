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
1. 在github repo中設定以下secrets
   1. CF_ACCOUNT_ID: 由你的Cloudflare Account Home→Workers的右側找到，[或是從wangler cli取得](https://developers.cloudflare.com/workers/learning/getting-started#6-preview-your-project)
   1. CF_API_TOKEN: 由你的Cloudflare Profile→API Token→Create Token產生，[參照說明](https://developers.cloudflare.com/api/tokens/create/)
   1. NEXTCLOUDUSERNAME: Nextcloud的用戶名稱
   1. SOURCEHOST: 短網域，例如 `img.domain.com`
   1. TARGETHOST: Nextcloud網域，例如 `nextcloud.domain.com`
   1. HOTLINK_IMG: Hot-link Protection將會重導向至此圖片網址，從盜鏈瀏覧時會看到這張圖片。預設值是[這一張圖](https://ipfs.io/ipfs/QmVWLdNmY2UzDgoKXjmVeyYxyFUHNdDFbC3eDkfLCXEdFu?filename=hotlink-protection_default.jpg)
   1. HOTLINK_ALLOWEDHOST: 允許圖片顯示的流量來源hostname，可填入多個RegExp，以;分隔。例如`.*\.domain\.com;.*\.secdomain.com`。預設為不啟動Hot-link Protection(填空值)
1. git push to master branch使Action啟動，建立worker
1. 至Cloudflare Worker設定route，將 `img.domain.com/*` 對應至此`img_route` worker

## 防盜鏈功能

可以設定重導向由外站來的圖片查詢，意即別人將你的圖片直接嵌入其它網站使用時，都會連到同一張警示圖片。\
其主要目的是保護圖片站台流量，降低盜鏈。\
請設定上述的`HOTLINK_IMG`、`HOTLINK_ALLOWEDHOST`兩個環境變數。\
將`HOTLINK_ALLOWEDHOST`留空值則不做任何阻擋。

對於不阻擋的圖片，請在路徑(pathname)中加入`preview`關鍵字。\
請用在og:image，使預覧圖片能正常被外站抓取，例:

```text
https://img.domain.com/blog/preview.png
https://img.domain.com/blog/preview/myimage.png
```

## 隨機圖片功能

如果收到任何檔名為random、附檔名為圖片的request，worker會取得同目錄下的random.json，並從中隨機選擇一張相同格式的圖片返回\
這功能設計來使用在論壇簽名檔圖片，每次重整就會不同

例: 訪問 `img.domain.com/random.png`，則會查詢 `img.domain.com/random.json`，從其中的png之下隨機選一張圖片返回\
json檔格式範例[在此](template/random.json)，請使用相對路徑

> random.json的安全性:\
> img網域只開放了圖片相關的附檔名，json檔並不能被直接訪問

## 參考資料

### Set Up Github Actions: Deploy to Cloudflare Worker

<https://www.serviops.ca/a-full-ci-cd-pipeline-for-cloudflare-workers-with-github-actions/>
