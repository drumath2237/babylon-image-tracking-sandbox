# babylon-image-tracking-sandbox

## About

6 枚同時の画像トラッキングができるか確認プロジェクト

## Environments

- babylonjs v6.1.0
- Node.js 16
- Vite 4.3.3

## Install & usage

まずは https に対応させてください。
openssl を使って証明書を作成するコマンドは以下です。

```
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```

続いて以下のコマンドでパッケージのインストールと開発者サーバーの立ち上げを行います。

```
npm install

npm run dev
```

提示された URL にスマホでアクセスしてください。
なお、現在は Android Chrome でのみ動作し、`chrome://flags`にて WebXR Incubation を有効化する必要があります。

## Author

[にー兄さん@ninisan_drumath](https://twitter.com/ninisan_drumath)

