// static/js/softmax-demo.js
class SoftmaxDemo {
    constructor() {
        this.currentValues = [2, 1, 3];
        this.init();
    }

    init() {
        this.initializeStaticExamples();
        this.updateLiveDemo();
    }

    softmax(arr) {
        const maxVal = Math.max(...arr);
        const expVals = arr.map(x => Math.exp(x - maxVal));
        const sum = expVals.reduce((a, b) => a + b, 0);
        return expVals.map(x => x / sum);
    }

    updateSoftmax(index, value) {
        this.currentValues[index] = parseFloat(value);
        document.getElementById(`val${index + 1}`).textContent = value;
        this.updateLiveDemo();
    }

    updateLiveDemo() {
        const probs = this.softmax(this.currentValues);
        const liveOutput = document.getElementById('live-output');

        if (liveOutput) {
            const maxProb = Math.max(...probs);
            const isSaturated = maxProb > 0.9;

            liveOutput.innerHTML = `
                <div class="live-results">
                    <h5>实时结果:</h5>
                    ${probs.map((prob, i) => 
                        `<div class="prob-item">
                            <span>选项${i+1}:</span>
                            <div class="prob-bar-mini" style="width: ${prob * 100}%; background: ${isSaturated ? '#f44336' : '#4caf50'}"></div>
                            <span>${(prob * 100).toFixed(2)}%</span>
                        </div>`
                    ).join('')}
                    <div class="saturation-status" style="color: ${isSaturated ? '#f44336' : '#4caf50'}">
                        饱和程度: ${isSaturated ? '高饱和⚠️' : '正常✅'}
                    </div>
                </div>
            `;
        }
    }

    initializeStaticExamples() {
        // 正常情况
        const normalOutput = document.getElementById('normal-output');
        if (normalOutput) {
            const normalProbs = this.softmax([2, 1, 3]);
            this.renderProbabilityBars(normalOutput, normalProbs, false);
        }

        // 饱和情况
        const saturatedOutput = document.getElementById('saturated-output');
        if (saturatedOutput) {
            const saturatedProbs = this.softmax([20, 10, 30]);
            this.renderProbabilityBars(saturatedOutput, saturatedProbs, true);
        }
    }

    renderProbabilityBars(container, probs, isSaturated) {
        container.innerHTML = probs.map((prob, i) =>
            `<div class="prob-bar">
                <span class="prob-label">选项${i+1}</span>
                <div class="prob-visual">
                    <div class="prob-fill" style="width: ${prob * 100}%; background: ${isSaturated ? '#f44336' : '#4caf50'};"></div>
                </div>
                <span class="prob-value">${(prob * 100).toFixed(isSaturated ? 3 : 1)}%</span>
            </div>`
        ).join('');
    }
}

// 全局函数
function updateSoftmax(index, value) {
    if (window.softmaxDemo) {
        window.softmaxDemo.updateSoftmax(index, value);
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.softmax-demo.html')) {
        window.softmaxDemo = new SoftmaxDemo();
    }
});
