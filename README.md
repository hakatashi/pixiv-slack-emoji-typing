# pixiv-slack-emoji-typing

pixivのSlackの絵文字を組み合わせて1番面白い奴が優勝ジェネレーター

内輪ネタ。

## Build

```sh
curl https://<secret>/emoji.csv -o emoji.csv
# or cp emoji.example.csv emoji.csv
yarn install
yarn build
```

## Deploy

```
curl https://<secret>/emoji.csv -o emoji.csv
git remote add deploy https://<secret>.git
git fetch
git checkout deploy/master
git checkout -b deploy
git merge master
yarn install
yarn build:production
git commit -am "Update build"
git push deploy deploy:master -u
```
