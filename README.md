## Docker 起動方法
1. ` docker build -t image名(node16.17) . ` を実行し，image の作成
2. ` docker run -it --rm -v "$PWD":/home/node/app -u 1000 -p 3000:3000 node16.17 sh ` でコンテナを作成し，コンテナ内に入る
3. 初回実行時は ` npm install ` による依存関係のインストール
4. ` npm run start ` によりサーバを起動

***

## typesync 導入
typesync は typescript に必要なパッケージをインストールする際に利用する．
` @types/~ `は typescript 使用時のみインストールが必要があり，typesync はこれらをインストールするためのパッケージである．
```sh
# 何らかのパッケージをインストール
$ npm i ~
# @types/~ が必要であればインストール
$ npm run postinstall
```

***

## Tailwind CSS 導入
Tailwind CSS を利用するため，パッケージをインストールする．
```sh
$ npm install -D tailwindcss postcss autoprefixer
$ npx tailwindcss init -p
```
` tailwind.config.js ` のファイルが作成されたため，以下を追加．
```js 
/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
` index.css `にも以下を追加
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```