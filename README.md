### Docker 起動方法
1. ` docker build -t image名(node16.17) . ` を実行し，image の作成
2. ` docker run -it --rm -v "$PWD":/home/node/app -u 1000 -p 3000:3000 node16.17 sh ` でコンテナを作成し，コンテナ内に入る
3. 初回実行時は ` npm install ` による依存関係のインストール
4. ` npm start ` によりサーバを起動