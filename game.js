// game.js

Action: file_editor create /app/game.js --file-text "// Configuração do Canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Configurar tamanho do canvas
canvas.width = Math.min(window.innerWidth - 40, 600);
canvas.height = Math.min(window.innerHeight - 40, 800);

// Variáveis da Bola
const ball = {
x: canvas.width / 2,
y: canvas.height - 50,
radius: 12,
speed: 8,
isMoving: false,
initialY: canvas.height - 50
};

// Variáveis do Alvo
const target = {
x: canvas.width / 2 - 50,
y: 40,
width: 100,
height: 25,
speed: 3,
direction: 1 // 1 para direita, -1 para esquerda
};

// Variáveis do Jogo
let score = 0;
let gameOver = false;

// Função para resetar a bola
function resetBall() {
ball.x = canvas.width / 2;
ball.y = ball.initialY;
ball.isMoving = false;
}

// Função de detecção de colisão
function checkCollision() {
// Verifica se a bola está na mesma altura do alvo
if (ball.y - ball.radius <= target.y + target.height &&
ball.y + ball.radius >= target.y) {
// Verifica se a bola está na mesma posição horizontal do alvo
if (ball.x >= target.x && ball.x <= target.x + target.width) {
return true;
}
}
return false;
}

// Função de atualização da lógica do jogo
function update() {
if (gameOver) return;

// Atualizar movimento da bola  
if (ball.isMoving) {  
    ball.y -= ball.speed;  
      
    // Verificar colisão com o alvo  
    if (checkCollision()) {  
        score++;  
        resetBall();  
          
        // Aumentar velocidade do alvo a cada 5 pontos  
        if (score % 5 === 0) {  
            target.speed += 0.5;  
        }  
    }  
      
    // Verificar se a bola saiu da tela (perdeu)  
    if (ball.y + ball.radius < 0) {  
        gameOver = true;  
    }  
}  
  
// Atualizar movimento do alvo (vai e volta)  
target.x += target.speed * target.direction;  
  
// Inverter direção quando atingir as bordas  
if (target.x <= 0) {  
    target.x = 0;  
    target.direction = 1;  
} else if (target.x + target.width >= canvas.width) {  
    target.x = canvas.width - target.width;  
    target.direction = -1;  
}

}

// Função de renderização
function draw() {
// Limpar canvas
ctx.fillStyle = '#1a1a2e';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Desenhar alvo  
ctx.fillStyle = '#ff6b6b';  
ctx.fillRect(target.x, target.y, target.width, target.height);  
  
// Borda do alvo  
ctx.strokeStyle = '#ffffff';  
ctx.lineWidth = 2;  
ctx.strokeRect(target.x, target.y, target.width, target.height);  
  
// Desenhar bola  
ctx.beginPath();  
ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);  
ctx.fillStyle = '#4ecdc4';  
ctx.fill();  
ctx.strokeStyle = '#ffffff';  
ctx.lineWidth = 2;  
ctx.stroke();  
ctx.closePath();  
  
// Desenhar pontuação  
ctx.fillStyle = '#ffffff';  
ctx.font = 'bold 24px Arial';  
ctx.textAlign = 'left';  
ctx.fillText('Pontos: ' + score, 15, 35);  
  
// Desenhar instruções quando a bola está parada  
if (!ball.isMoving && !gameOver) {  
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';  
    ctx.font = '18px Arial';  
    ctx.textAlign = 'center';  
    ctx.fillText('Toque/Clique para lançar', canvas.width / 2, canvas.height - 100);  
}  
  
// Desenhar tela de Game Over  
if (gameOver) {  
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';  
    ctx.fillRect(0, 0, canvas.width, canvas.height);  
      
    ctx.fillStyle = '#ff6b6b';  
    ctx.font = 'bold 48px Arial';  
    ctx.textAlign = 'center';  
    ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 40);  
      
    ctx.fillStyle = '#ffffff';  
    ctx.font = '24px Arial';  
    ctx.fillText('Pontuação Final: ' + score, canvas.width / 2, canvas.height / 2 + 10);  
    ctx.fillText('Toque/Clique para reiniciar', canvas.width / 2, canvas.height / 2 + 50);  
}

}

// Loop principal do jogo
function gameLoop() {
update();
draw();
requestAnimationFrame(gameLoop);
}

// Event listener para lançar a bola (desktop - clique)
canvas.addEventListener('click', function() {
if (gameOver) {
// Reiniciar o jogo
gameOver = false;
score = 0;
target.speed = 3;
resetBall();
} else if (!ball.isMoving) {
// Lançar a bola
ball.isMoving = true;
}
});

// Event listener para lançar a bola (mobile - toque)
canvas.addEventListener('touchstart', function(e) {
e.preventDefault(); // Prevenir comportamento padrão do toque

if (gameOver) {  
    // Reiniciar o jogo  
    gameOver = false;  
    score = 0;  
    target.speed = 3;  
    resetBall();  
} else if (!ball.isMoving) {  
    // Lançar a bola  
    ball.isMoving = true;  
}

});

// Ajustar canvas ao redimensionar a janela
window.addEventListener('resize', function() {
const oldWidth = canvas.width;
const oldHeight = canvas.height;

canvas.width = Math.min(window.innerWidth - 40, 600);  
canvas.height = Math.min(window.innerHeight - 40, 800);  
  
// Ajustar posições proporcionalmente  
ball.x = (ball.x / oldWidth) * canvas.width;  
ball.y = (ball.y / oldHeight) * canvas.height;  
ball.initialY = canvas.height - 50;  
  
target.x = (target.x / oldWidth) * canvas.width;

});

// Iniciar o jogo
gameLoop();
"
Observation: Create successful: /app/game.js
