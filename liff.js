/**
 * LIFFアプリを初期化
 * @param {string} liffId LIFF ID
 */
function initializeLiff(liffId) {
  liff.init({
    liffId: liffId,
  });
}

/**
 * QRコードリーダーを表示する
 */
async function scanCode() {
  const result = await liff.scanCodeV2();
  try {
    const stringifiedResult = result.value;
    await sendMessages(stringifiedResult);
    liff.closeWindow();
  } catch (err) {
    alert("scanCode failed " + err);
  }
}

/**
 * LINEトーク画面上でメッセージ送信
 * @param {string} text 送信メッセージ
 */
async function sendMessages(text) {
  try {
    await liff.sendMessages([
      {
        type: "text",
        text: text,
      },
    ]);
    liff.closeWindow();
  } catch (err) {
    alert("Failed to send message " + err);
  }
}

$(function () {
  // liffId: LIFF URL "https://liff.line.me/xxx"のxxxに該当する箇所
  // LINE DevelopersのLIFF画面より確認可能
  const liffId = "1656505610-JBZmjw3A";
  initializeLiff(liffId);

  $(".open-camera-btn").click(function () {
    scanCode();
  });

  $(".submit-btn").click(function () {
    var date = $('input[type="date"]').val();
    var name = $('input[type="text"]').val();

    var msg = `希望日：${date}\n氏名：${name}`;
    sendMessages(msg);

    return false;
  });
});
