const num2Word2 = (function () {
  var t = [
      "không",
      "một",
      "hai",
      "ba",
      "bốn",
      "năm",
      "sáu",
      "bảy",
      "tám",
      "chín",
    ],
    r = function (r, n) {
      var o = "",
        a = Math.floor(r / 10),
        e = r % 10;
      return (
        a > 1
          ? ((o = " " + t[a] + " mươi"), 1 == e && (o += " mốt"))
          : 1 == a
          ? ((o = " mười"), 1 == e && (o += " một"))
          : n && e > 0 && (o = " lẻ"),
        5 == e && a >= 1
          ? (o += " lăm")
          : 4 == e && a >= 1
          ? (o += " tư")
          : (e > 1 || (1 == e && 0 == a)) && (o += " " + t[e]),
        o
      );
    },
    n = function (n, o) {
      var a = "",
        e = Math.floor(n / 100),
        n = n % 100;
      return (
        o || e > 0
          ? ((a = " " + t[e] + " trăm"), (a += r(n, !0)))
          : (a = r(n, !1)),
        a
      );
    },
    o = function (t, r) {
      var o = "",
        a = Math.floor(t / 1e6),
        t = t % 1e6;
      a > 0 && ((o = n(a, r) + " triệu,"), (r = !0));
      var e = Math.floor(t / 1e3),
        t = t % 1e3;
      return (
        e > 0 && ((o += n(e, r) + " ngàn,"), (r = !0)),
        t > 0 && (o += n(t, r)),
        o
      );
    };
  return {
    convert: function (r) {
      if (0 == r) return t[0];
      var n = "",
        a = "";
      do
        (ty = r % 1e9),
          (r = Math.floor(r / 1e9)),
          (n = r > 0 ? o(ty, !0) + a + n : o(ty, !1) + a + n),
          (a = " tỷ,");
      while (r > 0);
      return n.trim();
    },
  };
})();

function currencyToText(currency, cents) {
  switch (currency) {
    case "vnd":
      return "đồng";
    case "usd":
      if (cents) {
        const centsText = num2Word2.convert(parseInt(cents));
        return `Đô la Mỹ và ${centsText} cents`;
      } else {
        return "Đô la Mỹ";
      }
    case "eur":
      return "Euro";
    case "jpy":
      return "Yên Nhật";
    default:
      return "";
  }
}

document.getElementById("convertForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const numberInput = parseFloat(document.getElementById("number").value);
  const currencyInput = document.getElementById("currency").value;

  let wholeNumber = Math.floor(numberInput);
  let cents = "";

  if (currencyInput === "usd" && numberInput % 1 !== 0) {
    const decimalPart = numberInput % 1;
    cents = (decimalPart * 100).toFixed(0);
  }

  if (numberInput) {
    const numberText = num2Word2.convert(parseInt(wholeNumber));
    const currencyText = currencyToText(currencyInput, cents);

    const result = `${numberText} ${currencyText}`;
    const formatResult = result.charAt(0).toUpperCase() + result.slice(1);
    document.getElementById("resultText").textContent = formatResult;
  }
});

document.getElementById("copyButton").addEventListener("click", function () {
  const resultText = document.getElementById("resultText").textContent;
  navigator.clipboard.writeText(resultText).then(function () {
    document.getElementById("copyButton").textContent = "Copied!";
    setTimeout(function () {
      document.getElementById("copyButton").textContent = "Copy";
    }, 5000);
  });
});
