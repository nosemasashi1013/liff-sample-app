// $(function () {
//   // liffId: LIFF URL "https://liff.line.me/xxx"のxxxに該当する箇所
//   // LINE DevelopersのLIFF画面より確認可能
//   var liffId = "1656501658-pq7GAjnA";
//   initializeLiff(liffId);

//   $(".open-camera-btn").click(function () {
//     scanCodeV2();
//   });

//   $(".submit-btn").click(function () {
//     var date = $('input[type="date"]').val();
//     var name = $('input[type="text"]').val();

//     var msg = `希望日：${date}\n氏名：${name}`;
//     sendMessage(msg);

//     return false;
//   });
// });

// // function initializeLiff(liffId) {
// //   liff
// //     .init({
// //       liffId: liffId,
// //     })
// //     .then(() => {
// //       // Webブラウザからアクセスされた場合は、LINEにログインする
// //       if (!liff.isInClient() && !liff.isLoggedIn()) {
// //         window.alert("LINEアカウントにログインしてください。");
// //         liff.login({ redirectUri: location.href });
// //       }
// //     })
// //     .catch((err) => {
// //       console.log("LIFF Initialization failed ", err);
// //     });
// // }

// async function initializeLiff(liffId) {
//   await liff.init({ liffId: liffId });
//   if (!liff.isLoggedIn()) {
//     liff.login();
//   }
// }

// async function scanCodeV2() {
//   try {
//     const result = await liff.scanCodeV2();
//     // document.querySelector("#result").innerHTML = result.value;
//     alert(result);
//   } catch (error) {
//     console.log("scanCodeV2", error);
//   }
// }

// // QRコードリーダーを表示する
// function scanCode() {
//   console.log("scanCode");

//   liff
//     .scanCodeV2()
//     .then((result) => {
//       console.log(result);
//       const stringifiedResult = result.value;
//       console.log(stringifiedResult);
//       liff
//         .sendMessages([
//           {
//             type: "text",
//             text: stringifiedResult,
//           },
//         ])
//         .then(() => {
//           liff.closeWindow();
//         })
//         .catch((error) => {
//           window.alert("Error sending message: " + error);
//         });
//     })
//     .catch((err) => {
//       alert(err);
//       alert("scanCode failed!");
//     });
// }

// // LINEトーク画面上でメッセージ送信
// function sendMessages(text) {
//   liff
//     .sendMessages([
//       {
//         type: "text",
//         text: text,
//       },
//     ])
//     .then(function () {
//       liff.closeWindow();
//     })
//     .catch(function (error) {
//       alert("Failed to send message " + error);
//     });
// }

// $(document).ready(function () {
//   // liffId: LIFF URL "https://liff.line.me/xxx"のxxxに該当する箇所
//   // LINE DevelopersのLIFF画面より確認可能
//   var liffId = "1656501658-pq7GAjnA";
//   initializeLiff(liffId);
// });

// function initializeLiff(liffId) {
//   liff
//     .init({
//       liffId: liffId,
//     })
//     .then(() => {
//       // Webブラウザからアクセスされた場合は、LINEにログインする
//       if (!liff.isInClient() && !liff.isLoggedIn()) {
//         window.alert("LINEアカウントにログインしてください。");
//         liff.login({ redirectUri: location.href });
//       }
//     })
//     .catch((err) => {
//       console.log("LIFF Initialization failed ", err);
//     });
// }

// function scanCode() {
//   liff
//     .scanCodeV2()
//     .then((result) => {
//       const stringifiedResult = result.value;
//       alert(stringifiedResult);
//       liff
//         .sendMessages([
//           {
//             type: "text",
//             text: stringifiedResult,
//           },
//         ])
//         .then(() => {
//           liff.closeWindow();
//         })
//         .catch((error) => {
//           window.alert("Error sending message: " + error);
//         });
//     })
//     .catch((err) => {
//       alert("scanCode failed!");
//     });
// }

// function sendMessage(text) {
//   if (liff.isInClient()) {
//     sendMessages(text);
//   } else {
//     shareTargetPicker(text);
//   }
// }

// // LINEトーク画面上でメッセージ送信
// function sendMessages(text) {
//   liff
//     .sendMessages([
//       {
//         type: "text",
//         text: text,
//       },
//     ])
//     .then(function () {
//       liff.closeWindow();
//     })
//     .catch(function (error) {
//       alert("Failed to send message " + error);
//     });
// }

// $(function () {
//   $(".open-camera-btn").click(function () {
//     scanCode();
//   });

//   // 送信
//   $("form").submit(function () {
//     var date = $('input[type="date"]').val();
//     var name = $('input[type="text"]').val();

//     var msg = `希望日：${date}\n人数：${number}\n氏名：${name}`;
//     sendMessage(msg);

//     return false;
//   });
// });

window.onload = function () {
  const defaultLiffId = "1656501658-pq7GAjnA";
  initializeLiff(defaultLiffId);
};

function initializeLiff(myLiffId) {
  liff
    .init({
      liffId: myLiffId,
    })
    .then(() => {
      liff
        .scanCode()
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
    })
    .catch((err) => {
      window.alert("Something went wrong with LIFF initialization.");
    });
}
