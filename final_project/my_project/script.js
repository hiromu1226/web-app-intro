document.addEventListener('DOMContentLoaded', () => {
    // 価格履歴管理用
    const priceHistoryList = document.getElementById('price-history');
    const totalPriceSpan = document.getElementById('total-price');
    let priceHistory = [];

    const dataList = document.getElementById('data-list');
    const addDataForm = document.getElementById('add-data-form');
    const value1Input = document.getElementById('value1');
    const value2Input = document.getElementById('value2');

    // 消費税計算機の要素取得
    const taxForm = document.getElementById('tax-form');
    const priceInput = document.getElementById('price');
    const taxRateInput = document.getElementById('tax-rate');
    const taxResult = document.getElementById('tax-result');

    // 消費税計算フォームの送信イベント
    if (taxForm) {
        taxForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const price = parseFloat(priceInput.value);
            const taxRate = parseFloat(taxRateInput.value);
            if (isNaN(price) || isNaN(taxRate)) {
                taxResult.textContent = '正しい数値を入力してください。';
                return;
            }
            const taxAmount = Math.floor(price * (taxRate / 100));
            const total = price + taxAmount;
            taxResult.innerHTML = `税込価格: <strong>${total.toLocaleString()}円</strong><br>消費税額: ${taxAmount.toLocaleString()}円<br>税抜価格: ${price.toLocaleString()}円`;

            // 履歴に追加
            priceHistory.push(price);
            updatePriceHistory();
        });
    }

    // 履歴リストと合計金額の表示更新
    function updatePriceHistory() {
        // 履歴リスト表示
        priceHistoryList.innerHTML = '';
        priceHistory.forEach((p, i) => {
            const li = document.createElement('li');
            li.textContent = `${p.toLocaleString()} 円`;
            priceHistoryList.appendChild(li);
        });
        // 合計金額表示
        const sum = priceHistory.reduce((acc, cur) => acc + cur, 0);
        totalPriceSpan.textContent = sum.toLocaleString();
    }

    // ...existing code...
});