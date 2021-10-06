$(document).ready(function () {
  // liffId: LIFF URL "https://liff.line.me/xxx"のxxxに該当する箇所
  // LINE DevelopersのLIFF画面より確認可能
  var liffId = "1656501658-pq7GAjnA";
  initializeLiff(liffId);
});

function initializeLiff(liffId) {
  liff
    .init({
      liffId: liffId,
    })
    .then(() => {
      // Webブラウザからアクセスされた場合は、LINEにログインする
      if (!liff.isInClient() && !liff.isLoggedIn()) {
        window.alert("LINEアカウントにログインしてください。");
        liff.login({ redirectUri: location.href });
      }
    })
    .catch((err) => {
      console.log("LIFF Initialization failed ", err);
    });
}

function scanCode() {
  liff
    .scanCodeV2()
    .then((result) => {
      const stringifiedResult = result.value;
      alert(stringifiedResult);
      liff
        .sendMessages([
          {
            type: "text",
            text: stringifiedResult,
          },
        ])
        .then(() => {
          liff.closeWindow();
        })
        .catch((error) => {
          window.alert("Error sending message: " + error);
        });
    })
    .catch((err) => {
      alert("scanCode failed!");
    });
}

function sendMessage(text) {
  if (liff.isInClient()) {
    sendMessages(text);
  } else {
    shareTargetPicker(text);
  }
}

// LINEトーク画面上でメッセージ送信
function sendMessages(text) {
  liff
    .sendMessages([
      {
        type: "text",
        text: text,
      },
    ])
    .then(function () {
      liff.closeWindow();
    })
    .catch(function (error) {
      alert("Failed to send message " + error);
    });
}
