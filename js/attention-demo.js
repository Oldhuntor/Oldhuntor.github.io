// static/js/attention-demo.js
class AttentionDemo {
    constructor() {
        this.words = ['我', '爱', '学习', '人工', '智能'];
        this.init();
    }

    init() {
        this.bindEvents();
        this.resetAttention();
    }

    bindEvents() {
        document.querySelectorAll('.word').forEach((word, index) => {
            word.addEventListener('click', () => this.selectWord(index));
        });
    }

    selectWord(index) {
        // 移除其他选中状态
        document.querySelectorAll('.word').forEach(w => w.classList.remove('selected'));
        // 添加选中状态
        document.querySelectorAll('.word')[index].classList.add('selected');
        // 显示权重
        this.showAttentionWeights(index);
    }

    showAttentionWeights(selectedIndex) {
        const weightBars = document.getElementById('weight-bars');
        if (!weightBars) return;

        weightBars.innerHTML = '';
        const weights = this.generateAttentionWeights(selectedIndex);

        this.words.forEach((word, index) => {
            const weightBar = document.createElement('div');
            weightBar.className = 'weight-bar';

            const weight = weights[index];
            const percentage = (weight * 100).toFixed(1);

            weightBar.innerHTML = `
                <div class="weight-label">${word}</div>
                <div class="weight-visual">
                    <div class="weight-fill" style="width: ${percentage}%"></div>
                </div>
                <div class="weight-value">${percentage}%</div>
            `;

            weightBars.appendChild(weightBar);
        });
    }

    generateAttentionWeights(selectedIndex) {
        const weights = [];
        let sum = 0;

        for (let i = 0; i < this.words.length; i++) {
            let weight;
            if (i === selectedIndex) {
                weight = Math.random() * 0.5 + 0.3; // 0.3-0.8
            } else {
                weight = Math.random() * 0.3 + 0.1; // 0.1-0.4
            }
            weights.push(weight);
            sum += weight;
        }

        return weights.map(w => w / sum);
    }

    randomAttention() {
        const randomIndex = Math.floor(Math.random() * this.words.length);
        this.selectWord(randomIndex);
    }

    resetAttention() {
        document.querySelectorAll('.word').forEach(word => {
            word.classList.remove('selected');
        });
        const weightBars = document.getElementById('weight-bars');
        if (weightBars) {
            weightBars.innerHTML = '<p style="text-align: center; color: #666;">点击上方单词查看注意力权重分布</p>';
        }
    }
}

// 全局函数供按钮调用
function randomAttention() {
    if (window.attentionDemo) {
        window.attentionDemo.randomAttention();
    }
}

function resetAttention() {
    if (window.attentionDemo) {
        window.attentionDemo.resetAttention();
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.attention-demo-container')) {
        window.attentionDemo = new AttentionDemo();
    }
});
