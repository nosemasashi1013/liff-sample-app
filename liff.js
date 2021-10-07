const liffId = "1656505610-JBZmjw3A";

$(document).ready(function () {
  // liffId: LIFF URL "https://liff.line.me/xxx"のxxxに該当する箇所
  // LINE DevelopersのLIFF画面より確認可能
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
        liff.login();
      }
    })
    .catch((err) => {
      console.log("LIFF Initialization failed ", err);
    });
}

// QRコードリーダーを表示する
async function scanCode() {
  await liff
    .scanCodeV2()
    .then((result) => {
      const stringifiedResult = result.value;
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
      window.alert("scanCode failed!");
    });
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

$(function () {
  $(".open-camera-btn").click(function () {
    await scanCode();
  });

  $(".submit-btn").click(function () {
    var date = $('input[type="date"]').val();
    var name = $('input[type="text"]').val();

    var msg = `希望日：${date}\n氏名：${name}`;
    sendMessages(msg);

    return false;
  });
});

// window.onload = function () {
//   const defaultLiffId = "1656505610-JBZmjw3A";
//   initializeLiff(defaultLiffId);
// };

// function initializeLiff(myLiffId) {
//   liff
//     .init({
//       liffId: myLiffId,
//     })
//     .then(() => {
//       liff
//         .scanCodeV2()
//         .then((result) => {
//           const stringifiedResult = result.value;
//           liff
//             .sendMessages([
//               {
//                 type: "text",
//                 text: stringifiedResult,
//               },
//             ])
//             .then(() => {
//               liff.closeWindow();
//             })
//             .catch((error) => {
//               window.alert("Error sending message: " + error);
//             });
//         })
//         .catch((err) => {
//           window.alert("scanCode failed!");
//         });
//     })
//     .catch((err) => {
//       window.alert("Something went wrong with LIFF initialization.");
//     });
// }
