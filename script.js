class OpeningAnimation {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupParticles();
        this.startLoading();
    }

    setupEventListeners() {
        // 按钮悬停效果
        const buttons = document.querySelectorAll('.btn');
        const hoverSound = document.getElementById('hoverSound');
        const clickSound = document.getElementById('clickSound');

        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                hoverSound.currentTime = 0;
                hoverSound.play();
                btn.style.transform = 'translateY(-2px)';
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0)';
            });

            btn.addEventListener('click', () => {
                clickSound.currentTime = 0;
                clickSound.play();
            });
        });

        // 开始按钮点击事件
        document.getElementById('startBtn').addEventListener('click', () => {
            this.redirectToDemo();
        });

        // GitHub按钮点击事件
        document.getElementById('githubBtn').addEventListener('click', () => {
            window.open('https://github.com/your-username/fps-controller', '_blank');
        });
    }

    setupParticles() {
        const canvas = document.getElementById('particleCanvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 100;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 3 - 1.5;
                this.speedY = Math.random() * 3 - 1.5;
                this.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
                if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const animateParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            requestAnimationFrame(animateParticles);
        };

        animateParticles();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    startLoading() {
        let progress = 0;
        const progressElement = document.getElementById('progress');
        const loadingScreen = document.getElementById('loadingScreen');
        const mainContent = document.getElementById('mainContent');

        const loadingInterval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress >= 100) {
                progress = 100;
                clearInterval(loadingInterval);
                
                setTimeout(() => {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                        this.showMainContent();
                    }, 1000);
                }, 500);
            }
            progressElement.textContent = `${Math.round(progress)}%`;
        }, 100);
    }

    showMainContent() {
        const mainContent = document.getElementById('mainContent');
        const subtitle = document.getElementById('subTitle');
        const featureCards = document.querySelectorAll('.feature-card');

        mainContent.style.opacity = '1';
        mainContent.style.transform = 'translateY(0)';

        // 标题动画
        setTimeout(() => {
            subtitle.style.opacity = '1';
            subtitle.style.transform = 'translateY(0)';
            subtitle.style.transition = 'all 1s ease 0.5s';
        }, 500);

        // 特性卡片动画
        featureCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.style.transition = 'all 0.8s ease';
            }, 1000 + index * 200);
        });
    }

    redirectToDemo() {
        // 添加转场效果
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            window.location.href = '../fps-demo/index.html'; // 指向你的演示页面
        }, 500);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new OpeningAnimation();
});
