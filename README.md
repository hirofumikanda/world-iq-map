# 世界IQマップ

このプロジェクトは、[Most Intelligent Countries in the World in 2025](https://www.worldwide-iq-test.com/iq-tests)で提供されている各国IQ一覧を使用し、MapLibre GL JS + React を用いて Web 上にIQの分布を表示したビューアです。

## 機能

- [Natural Earth（Admin 0 – Countries）](https://www.naturalearthdata.com/downloads/10m-cultural-vectors/)を背景に使用
- [Most Intelligent Countries in the World in 2025](https://www.worldwide-iq-test.com/iq-tests)を参考に、IQに応じて各国を色分けして表示
- 各国をクリックするとポップアップでIQ属性値表示
- スライダーで色分け表示対象の最小IQ閾値を設定

## デモ
[GitHub Pagesで公開中](https://hirofumikanda.github.io/world-iq-map/)

## 🔧 セットアップ手順

### 1. 依存ライブラリのインストール

```bash
npm install
```

### 2. 開発サーバーの起動

```bash
npm run dev
```

---

## 🧪 デモで使用している主なライブラリ

| ライブラリ                                                     | 概要                    |
| --------------------------------------------------------- | --------------------- |
| [maplibre-gl](https://maplibre.org/)                      | 軽量オープンソース地図描画ライブラリ    |
| [pmtiles](https://github.com/protomaps/PMTiles) | PMTiles 形式の読み込み用プロトコル |
| [React](https://react.dev/)                               | UIフレームワーク             |
| [Vite](https://vitejs.dev/)                               | 超高速フロントエンド開発環境        |
| [TypeScript](https://www.typescriptlang.org/)             | 型安全なJavaScript        |

## ライセンス
MIT
