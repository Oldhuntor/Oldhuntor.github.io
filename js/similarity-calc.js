// static/js/similarity-calc.js
class SimilarityCalculator {
    constructor() {
        this.init();
    }

    init() {
        this.updateCalculation();
    }

    updateCalculation() {
        const queryInputs = document.querySelectorAll('.query-vector input');
        const keyInputs = document.querySelectorAll('.key-vector input');

        if (!queryInputs.length || !keyInputs.length) return;

        const query = Array.from(queryInputs).map(input => parseFloat(input.value));
        const key = Array.from(keyInputs).map(input => parseFloat(input.value));

        let dotProduct = 0;
        let calculation = '';

        for (let i = 0; i < query.length; i++) {
            dotProduct += query[i] * key[i];
            if (i > 0) calculation += ' + ';
            calculation += `${query[i]}×${key[i]}`;
        }

        const scale = Math.sqrt(query.length);
        const result = dotProduct / scale;

        // 更新显示
        const dotProductCalc = document.getElementById('dot-product-calc');
        const scalingCalc = document.getElementById('scaling-calc');
        const finalResult = document.getElementById('final-result');

        if (dotProductCalc) dotProductCalc.textContent = `${calculation} = ${dotProduct.toFixed(2)}`;
        if (scalingCalc) scalingCalc.textContent = `√${query.length} = ${scale.toFixed(2)}`;
        if (finalResult) finalResult.textContent = `${dotProduct.toFixed(2)} / ${scale.toFixed(2)} = ${result.toFixed(2)}`;
    }

    loadPreset(type) {
        const queryInputs = document.querySelectorAll('.query-vector input');
        const keyInputs = document.querySelectorAll('.key-vector input');

        let queryValues, keyValues;

        switch(type) {
            case 'similar':
                queryValues = [0.8, 0.6, 0.4, 0.2];
                keyValues = [0.7, 0.5, 0.3, 0.1];
                break;
            case 'different':
                queryValues = [0.9, 0.1, 0.8, 0.2];
                keyValues = [0.2, 0.8, 0.1, 0.9];
                break;
            case 'orthogonal':
                queryValues = [1.0, 0.0, 1.0, 0.0];
                keyValues = [0.0, 1.0, 0.0, 1.0];
                break;
        }

        queryInputs.forEach((input, i) => input.value = queryValues[i]);
        keyInputs.forEach((input, i) => input.value = keyValues[i]);

        this.updateCalculation();
    }
}

// 全局函数
function updateCalculation() {
    if (window.similarityCalc) {
        window.similarityCalc.updateCalculation();
    }
}

function loadPreset(type) {
    if (window.similarityCalc) {
        window.similarityCalc.loadPreset(type);
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.similarity-calc-container')) {
        window.similarityCalc = new SimilarityCalculator();

        // 绑定输入事件
        document.querySelectorAll('.vector input').forEach(input => {
            input.addEventListener('input', updateCalculation);
        });
    }
});
