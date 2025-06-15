import Rcon from 'rcon';
import target from '../config/target.json' with { type: "json" };

/**
 * TCP送信を行う用のRcon用オプションを定義
 */
const options = {
  tcp: true
};

/**
 * 送信先のIP,PORT,RCONのパスワードをconfig/target.jsonの内容から作成
 */
export let target_server_config = new Map();
console.log(JSON.stringify(target.ServerConfig))
Object.keys(target.ServerConfig).forEach(function (key) {
    target_server_config.set(key, target.ServerConfig[key]);
});

/**
 * broadcastコマンド実行用メソッド
 * 
 * @param {*} target 送信先判定（target_server_configのkeyを指定）
 * @param {*} message 送信メッセージ
 */
export function broadcast(target, message) {
    // 送信するRCONコマンドを作成
    let commnad = 'broadcast ' + message;

    if(target == 'all') {
        target_server_config.forEach((value, key) => {
            _send(key, commnad);
        });
    } else {
        _send(target, commnad);
    }
}

/**
 * serverchatコマンド実行用メソッド
 * 
 * @param {*} target 送信先判定（target_server_configのkeyを指定）
 * @param {*} message 送信メッセージ
 */
export function serverchat(target, message) {
    // 送信するRCONコマンドを作成
    let commnad = 'serverchat ' + message;

    if(target == 'all') {
        target_server_config.forEach((value, key) => {
            _send(key, commnad);
        });
    } else {
        _send(target, commnad);
    }
}

/**
 * Rconコマンド実行メソッド
 * targetでtarget_server_configから送信先情報を取得し、リクエストされたRCONコマンドを送信する
 * 
 * @param {*} target 送信先判定（target_server_configのkeyを指定）
 * @param {*} commands 送信コマンド
 */
function _send(target, commands) {
    console.log(JSON.stringify(target_server_config));
    // targetでtarget_server_configから送信先情報を取得
    const target_config = target_server_config.get(target);
    console.log('target_config.host: ' + target_config.host );
    console.log('target_config.port: ' + target_config.port );
    // 送信先情報をもとに、RCONリクエスト用の定義を作成
    let rcon = new Rcon(target_config.host, target_config.port, target_config.password, options);

    // RCON接続時のふるまいを定義
    // 単一コマンド実行のみを想定なので、認証成功時にリクエストされたRCONコマンドを実行
    rcon.on('auth', function() {
        // You must wait until this event is fired before sending any commands,
        // otherwise those commands will fail.
        console.log("Authenticated");
        console.log("send command: " + commands);
        rcon.send(commands);
    }).on('response', function(str) {
        console.log("Response: " + str);
    }).on('error', function(err) {
        console.log("Error: " + err);
    }).on('end', function() {
        console.log("Connection closed");
        process.exit();
    });

    // RCONの接続に実行
    rcon.connect();
}