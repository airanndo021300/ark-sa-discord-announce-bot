# ark-sa-discord-announce-bot

## 機能概略
- Discordのスラッシュコマンドで入力したアナウンスメッセージをRCONで送信するBotになります
- self host環境が必要になります
  - self hostなので、DiscordBotアカウントが必要になります

## 前提条件
- 動作確認環境は以下の通り
  - [ARK: Survival Ascended](https://store.steampowered.com/app/2399830/ARK_Survival_Ascended/?l=japanese)
    - [asa-server-api](https://ark-server-api.com/threads/asa-server-api.33/)を導入済みである
    - [Unicode RCON](https://ark-server-api.com/resources/unicode-rcon.152/)を導入済みである
  - 実行環境にNode.jsのインストール済みであること
    - 現行のLTS（version.22）で動作確認済み
- DiscordBotアカウントを作成済みであること
  - チャンネルへの導入URL作成時には、「bot」と「applications.commands」のscopdeで作成してください
- 起動を永続化するために、Linux系でService作成を推奨します

## 事前準備
### config.jsonの設定
- DiscordBotとして実行するため、DiscordBotアカウントの内容を設定
  - `LISTENER.CLIENT_ID`にDiscordBotアカウントの`Discord ApplicationID`を設定
  - `LISTENER.TOKEN`にDiscordBotアカウントの`Discord bot token`を設定
  - `GUILD_ID`に導入予定DiscordチャンネルのチャンネルIDを設定
### target.jsonの設定
- RCONの送信先としてjSON形式で送信先名称、IPAddress、port、RCONのパスワードを設定してください
  - 送信先名称はサンプルの`Server1`、`Server2`が該当します。設定内容がそのままDiscordでの指定になります。
  - 送信先IPAddressはサンプルの通り、`"aaa.bbb.ccc.ddd"`で設定してください。
    - 数値だけの指定ではないので、jsonの規約に従って文字列として「ダブルコーテーション(")」か「シングルコーテーション(')」で囲ってください
  - 送信先portはサンプルの通り、`27021`などを設定してください
    - 数値のみの指定なので、「ダブルコーテーション(")」や「シングルコーテーション(')」は無しで設定してください
  - RCONのパスワードはサンプルの通り、文字列として設定してください。
    - ARK: Survival Ascendedのサーバー設定で設定したRCONのパスワードが該当になります
    - 数値だけの指定ではないので、jsonの規約に従って文字列として「ダブルコーテーション(")」か「シングルコーテーション(')」で囲ってください

## 起動手順
### Node.jsの起動準備
- `npm install`でNode実行に必要なモジュールを取得してください
### DiscordBotにSlachCommandsを登録
- `npm run deploy`で必要なコマンドがDiscordBotのスラッシュコマンドとして変更が適応されます
  - もしくは`package.json`が存在するディレクトリで、`node ./deploy-commands.js`でも同じ内容になります
  - `config.json`や`target.json`を変更した際には、`npm run deploy`を実行してDiscord側に適応してください
### DiscordBotを起動
- `npm run start`でDiscordBotが起動します
  - もしくは`package.json`が存在するディレクトリで、`node ./index.js`でも同じ内容になります
  - `npm run deploy`で適応した内容で起動となります

## 免責事項
- ツール制作者は、このツールを利用したことで発生した問題において、製作者に故意または重過失がある場合を除き、一切の責任を負わないものとします