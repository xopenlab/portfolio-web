/**
 * Easter egg: Tetris
 * Se activa al hacer doble click en el nombre del hero
 * Expone window.__tetris = { open, close }
 */
(function () {
  'use strict';

  var overlay = null;
  var canvas = null;
  var ctx = null;
  var animFrameId = null;
  var gameInterval = null;
  var isOpen = false;

  // Configuración del juego
  var COLS = 10;
  var ROWS = 20;
  var BLOCK_SIZE = 28;
  var BASE_BLOCK_SIZE = 28;
  var COLORS = [
    null,
    '#FF0D72', // T
    '#0DC2FF', // I
    '#0DFF72', // S
    '#F538FF', // Z
    '#FF8E0D', // L
    '#FFE138', // J
    '#3877FF'  // O
  ];

  // Piezas del Tetris (matrices de rotación)
  var PIECES = [
    // T
    [[0, 1, 0], [1, 1, 1], [0, 0, 0]],
    // I
    [[0, 0, 0, 0], [2, 2, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0]],
    // S
    [[0, 3, 3], [3, 3, 0], [0, 0, 0]],
    // Z
    [[4, 4, 0], [0, 4, 4], [0, 0, 0]],
    // L
    [[0, 0, 5], [5, 5, 5], [0, 0, 0]],
    // J
    [[6, 0, 0], [6, 6, 6], [0, 0, 0]],
    // O
    [[7, 7], [7, 7]]
  ];

  var board = [];
  var currentPiece = null;
  var currentPos = { x: 0, y: 0 };
  var score = 0;
  var gameOver = false;
  var dropCounter = 0;
  var dropInterval = 1000;
  var lastTime = 0;

  /**
   * Crea el tablero vacío
   */
  function createBoard() {
    board = [];
    for (var r = 0; r < ROWS; r++) {
      board.push(new Array(COLS).fill(0));
    }
  }

  /**
   * Rota una matriz 90 grados en sentido horario
   */
  function rotate(matrix) {
    var rows = matrix.length;
    var cols = matrix[0].length;
    var result = [];
    for (var c = 0; c < cols; c++) {
      result.push([]);
      for (var r = rows - 1; r >= 0; r--) {
        result[c].push(matrix[r][c]);
      }
    }
    return result;
  }

  /**
   * Comprueba si la pieza colisiona
   */
  function collides(piece, pos) {
    for (var r = 0; r < piece.length; r++) {
      for (var c = 0; c < piece[r].length; c++) {
        if (piece[r][c] !== 0) {
          var newX = pos.x + c;
          var newY = pos.y + r;
          if (newX < 0 || newX >= COLS || newY >= ROWS) return true;
          if (newY >= 0 && board[newY][newX] !== 0) return true;
        }
      }
    }
    return false;
  }

  /**
   * Fija la pieza en el tablero
   */
  function merge() {
    for (var r = 0; r < currentPiece.length; r++) {
      for (var c = 0; c < currentPiece[r].length; c++) {
        if (currentPiece[r][c] !== 0) {
          var y = currentPos.y + r;
          if (y < 0) {
            gameOver = true;
            return;
          }
          board[y][currentPos.x + c] = currentPiece[r][c];
        }
      }
    }
  }

  /**
   * Elimina líneas completas y suma puntos
   */
  function clearLines() {
    var linesCleared = 0;
    for (var r = ROWS - 1; r >= 0; r--) {
      if (board[r].every(function (cell) { return cell !== 0; })) {
        board.splice(r, 1);
        board.unshift(new Array(COLS).fill(0));
        linesCleared++;
        r++; // Re-comprobar la misma fila
      }
    }
    if (linesCleared > 0) {
      var points = [0, 100, 300, 500, 800];
      score += points[linesCleared] || 800;
    }
  }

  /**
   * Genera una nueva pieza aleatoria
   */
  function spawnPiece() {
    var idx = Math.floor(Math.random() * PIECES.length);
    currentPiece = PIECES[idx].map(function (row) { return row.slice(); });
    currentPos = { x: Math.floor((COLS - currentPiece[0].length) / 2), y: -1 };

    if (collides(currentPiece, currentPos)) {
      gameOver = true;
    }
  }

  /**
   * Mueve la pieza hacia abajo
   */
  function drop() {
    currentPos.y++;
    if (collides(currentPiece, currentPos)) {
      currentPos.y--;
      merge();
      if (!gameOver) {
        clearLines();
        spawnPiece();
      }
    }
  }

  /**
   * Mueve la pieza lateralmente
   */
  function move(dir) {
    currentPos.x += dir;
    if (collides(currentPiece, currentPos)) {
      currentPos.x -= dir;
    }
  }

  /**
   * Rota la pieza actual
   */
  function rotatePiece() {
    var rotated = rotate(currentPiece);
    var prevX = currentPos.x;

    // Wall kick básico
    var offset = 0;
    if (collides(rotated, currentPos)) {
      offset = 1;
      if (collides(rotated, { x: currentPos.x + offset, y: currentPos.y })) {
        offset = -1;
        if (collides(rotated, { x: currentPos.x + offset, y: currentPos.y })) {
          return; // No se puede rotar
        }
      }
    }

    currentPos.x += offset;
    currentPiece = rotated;
  }

  /**
   * Hard drop: baja la pieza hasta el fondo
   */
  function hardDrop() {
    while (!collides(currentPiece, { x: currentPos.x, y: currentPos.y + 1 })) {
      currentPos.y++;
      score += 2;
    }
    merge();
    if (!gameOver) {
      clearLines();
      spawnPiece();
    }
  }

  /**
   * Dibuja el tablero y la pieza actual
   */
  function draw() {
    if (!ctx) return;

    // Fondo del canvas
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dibujar cuadrícula sutil
    ctx.strokeStyle = 'rgba(255,255,255,0.03)';
    ctx.lineWidth = 0.5;
    for (var c = 0; c <= COLS; c++) {
      ctx.beginPath();
      ctx.moveTo(c * BLOCK_SIZE, 0);
      ctx.lineTo(c * BLOCK_SIZE, ROWS * BLOCK_SIZE);
      ctx.stroke();
    }
    for (var r = 0; r <= ROWS; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * BLOCK_SIZE);
      ctx.lineTo(COLS * BLOCK_SIZE, r * BLOCK_SIZE);
      ctx.stroke();
    }

    // Dibujar tablero
    for (var r = 0; r < ROWS; r++) {
      for (var c = 0; c < COLS; c++) {
        if (board[r][c] !== 0) {
          drawBlock(c, r, COLORS[board[r][c]]);
        }
      }
    }

    // Dibujar pieza actual
    if (currentPiece && !gameOver) {
      for (var r = 0; r < currentPiece.length; r++) {
        for (var c = 0; c < currentPiece[r].length; c++) {
          if (currentPiece[r][c] !== 0) {
            drawBlock(currentPos.x + c, currentPos.y + r, COLORS[currentPiece[r][c]]);
          }
        }
      }
    }

    // Puntuación
    ctx.fillStyle = '#fff';
    ctx.font = '14px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('SCORE: ' + score, 8, ROWS * BLOCK_SIZE + 22);

    // Game Over
    if (gameOver) {
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(0, ROWS * BLOCK_SIZE / 2 - 30, COLS * BLOCK_SIZE, 60);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 20px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', (COLS * BLOCK_SIZE) / 2, ROWS * BLOCK_SIZE / 2);
      ctx.font = '12px monospace';
      ctx.fillText('Doble click para reiniciar', (COLS * BLOCK_SIZE) / 2, ROWS * BLOCK_SIZE / 2 + 20);
    }
  }

  /**
   * Dibuja un bloque individual con efecto 3D
   */
  function drawBlock(x, y, color) {
    if (y < 0) return;
    var px = x * BLOCK_SIZE;
    var py = y * BLOCK_SIZE;

    ctx.fillStyle = color;
    ctx.fillRect(px, py, BLOCK_SIZE, BLOCK_SIZE);

    // Borde claro (efecto 3D)
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.fillRect(px, py, BLOCK_SIZE, 2);
    ctx.fillRect(px, py, 2, BLOCK_SIZE);

    // Borde oscuro
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(px + BLOCK_SIZE - 2, py, 2, BLOCK_SIZE);
    ctx.fillRect(px, py + BLOCK_SIZE - 2, BLOCK_SIZE, 2);

    // Contorno
    ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    ctx.lineWidth = 1;
    ctx.strokeRect(px, py, BLOCK_SIZE, BLOCK_SIZE);
  }

  /**
   * Game loop principal
   */
  function update(time) {
    if (!isOpen) return;

    var deltaTime = time - lastTime;
    lastTime = time;

    if (!gameOver) {
      dropCounter += deltaTime;
      if (dropCounter > dropInterval) {
        drop();
        dropCounter = 0;
      }
    }

    draw();
    animFrameId = requestAnimationFrame(update);
  }

  /**
   * Calcula el tamaño de bloque óptimo según el viewport disponible
   * En portrait: canvas + controles táctiles deben caber en alto
   * En landscape: canvas debe caber en alto
   */
  function calcBlockSize() {
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var isLandscape = vw > vh;
    var isTouch = isTouchDevice();

    // Margen para puntuación (30px) + gaps + botón cerrar
    var extraVertical = 30;

    if (isTouch) {
      if (isLandscape) {
        // Landscape: controles al lado, canvas ocupa todo el alto disponible
        var availH = vh - 40; // márgenes superior/inferior
        extraVertical += 0;
      } else {
        // Portrait: canvas + controles apilados (~160px para controles)
        var availH = vh - 200;
      }
    } else {
      // Desktop: texto de controles debajo (~40px)
      var availH = vh - 80;
    }

    var maxByHeight = Math.floor((availH - extraVertical) / ROWS);
    var maxByWidth = Math.floor((vw - 40) / COLS); // 40px margen lateral

    var size = Math.min(maxByHeight, maxByWidth, BASE_BLOCK_SIZE);
    return Math.max(size, 12); // mínimo 12px para que sea jugable
  }

  /**
   * Detecta si el dispositivo es táctil
   */
  function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  /**
   * Crea los botones táctiles para dispositivos móviles
   */
  function createTouchControls(container) {
    var controls = document.createElement('div');
    controls.className = 'tetris-touch-controls';

    // Fila superior: rotar
    var rowTop = document.createElement('div');
    rowTop.className = 'tetris-touch-row';
    rowTop.innerHTML = '<button class="tetris-touch-btn" data-action="rotate" aria-label="Rotar">&#8593;</button>';

    // Fila central: izquierda, hard drop, derecha
    var rowMid = document.createElement('div');
    rowMid.className = 'tetris-touch-row';
    rowMid.innerHTML =
      '<button class="tetris-touch-btn" data-action="left" aria-label="Mover izquierda">&#8592;</button>' +
      '<button class="tetris-touch-btn tetris-touch-btn--drop" data-action="hard-drop" aria-label="Hard drop">&#9660;</button>' +
      '<button class="tetris-touch-btn" data-action="right" aria-label="Mover derecha">&#8594;</button>';

    // Fila inferior: bajar
    var rowBot = document.createElement('div');
    rowBot.className = 'tetris-touch-row';
    rowBot.innerHTML = '<button class="tetris-touch-btn" data-action="down" aria-label="Bajar">&#8595;</button>';

    controls.appendChild(rowTop);
    controls.appendChild(rowMid);
    controls.appendChild(rowBot);
    container.appendChild(controls);

    // Manejar eventos touch con repetición al mantener pulsado
    var repeatTimer = null;
    var repeatInterval = null;

    /**
     * Ejecuta la acción correspondiente al botón
     */
    function execAction(action) {
      if (!isOpen) return;
      if (gameOver) return;
      switch (action) {
        case 'left': move(-1); break;
        case 'right': move(1); break;
        case 'down': drop(); score += 1; break;
        case 'rotate': rotatePiece(); break;
        case 'hard-drop': hardDrop(); break;
      }
    }

    /**
     * Limpia los timers de repetición
     */
    function clearRepeat() {
      clearTimeout(repeatTimer);
      clearInterval(repeatInterval);
      repeatTimer = null;
      repeatInterval = null;
    }

    controls.addEventListener('touchstart', function (e) {
      var btn = e.target.closest('[data-action]');
      if (!btn) return;
      e.preventDefault();
      var action = btn.getAttribute('data-action');
      execAction(action);

      // Repetición para movimiento lateral y bajar
      if (action === 'left' || action === 'right' || action === 'down') {
        clearRepeat();
        repeatTimer = setTimeout(function () {
          repeatInterval = setInterval(function () {
            execAction(action);
          }, 80);
        }, 200);
      }
    }, { passive: false });

    controls.addEventListener('touchend', function (e) {
      e.preventDefault();
      clearRepeat();
    }, { passive: false });

    controls.addEventListener('touchcancel', function () {
      clearRepeat();
    });

    return controls;
  }

  /**
   * Maneja las teclas del juego
   */
  function handleKeydown(e) {
    if (!isOpen || gameOver) return;

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        move(-1);
        break;
      case 'ArrowRight':
        e.preventDefault();
        move(1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        drop();
        score += 1;
        break;
      case 'ArrowUp':
        e.preventDefault();
        rotatePiece();
        break;
      case ' ':
        e.preventDefault();
        hardDrop();
        break;
    }
  }

  /**
   * Maneja ESC para cerrar
   */
  function handleEscape(e) {
    if (e.key === 'Escape' && isOpen) {
      e.preventDefault();
      e.stopImmediatePropagation();
      close();
    }
  }

  /**
   * Adapta el juego al cambiar orientación o tamaño de ventana
   */
  function handleResize() {
    if (!isOpen || !canvas || !overlay) return;

    BLOCK_SIZE = calcBlockSize();
    canvas.width = COLS * BLOCK_SIZE;
    canvas.height = ROWS * BLOCK_SIZE + 30;
    ctx = canvas.getContext('2d');

    // Actualizar clase landscape en el contenedor
    var container = overlay.querySelector('.tetris-container');
    var isLandscape = window.innerWidth > window.innerHeight;
    if (isLandscape && isTouchDevice()) {
      container.classList.add('tetris-container--landscape');
    } else {
      container.classList.remove('tetris-container--landscape');
    }

    draw();
  }

  /**
   * Reinicia el estado del juego
   */
  function resetGame() {
    createBoard();
    score = 0;
    gameOver = false;
    dropCounter = 0;
    lastTime = 0;
    spawnPiece();
  }

  /**
   * Abre el overlay del Tetris
   */
  function open() {
    if (isOpen) return;
    isOpen = true;

    // Crear overlay
    overlay = document.createElement('div');
    overlay.className = 'tetris-overlay';
    overlay.innerHTML =
      '<button class="tetris-close" aria-label="Cerrar Tetris" title="Cerrar (Esc)">&times;</button>' +
      '<div class="tetris-container">' +
        '<canvas id="tetris-canvas"></canvas>' +
        '<p class="tetris-controls">&#8592; &#8594; mover &middot; &#8593; rotar &middot; &#8595; bajar &middot; espacio drop &middot; game over: doble click para reiniciar</p>' +
      '</div>';

    document.body.appendChild(overlay);

    // Calcular tamaño de bloque óptimo según viewport
    BLOCK_SIZE = calcBlockSize();

    // Añadir clase landscape si corresponde
    var isLandscape = window.innerWidth > window.innerHeight;
    if (isLandscape && isTouchDevice()) {
      overlay.querySelector('.tetris-container').classList.add('tetris-container--landscape');
    }

    // Configurar canvas
    canvas = document.getElementById('tetris-canvas');
    canvas.width = COLS * BLOCK_SIZE;
    canvas.height = ROWS * BLOCK_SIZE + 30; // +30 para la puntuación
    ctx = canvas.getContext('2d');

    // Botón cerrar
    overlay.querySelector('.tetris-close').addEventListener('click', close);

    // Cerrar al hacer click fuera del juego
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });

    // Doble click/tap en canvas para reiniciar si game over
    canvas.addEventListener('dblclick', function () {
      if (gameOver) resetGame();
    });

    var lastCanvasTap = 0;
    canvas.addEventListener('touchend', function (e) {
      var now = Date.now();
      if (now - lastCanvasTap < 350 && gameOver) {
        e.preventDefault();
        resetGame();
      }
      lastCanvasTap = now;
    });

    // Crear controles táctiles en móvil
    if (isTouchDevice()) {
      createTouchControls(overlay.querySelector('.tetris-container'));
    }

    // Listeners de teclado
    document.addEventListener('keydown', handleEscape, true);
    document.addEventListener('keydown', handleKeydown);

    // Listener de cambio de orientación/tamaño
    window.addEventListener('resize', handleResize);

    // Bloquear scroll del body
    document.body.style.overflow = 'hidden';

    // Iniciar juego
    resetGame();
    lastTime = performance.now();
    animFrameId = requestAnimationFrame(update);
  }

  /**
   * Cierra el overlay del Tetris
   */
  function close() {
    if (!isOpen) return;
    isOpen = false;

    if (animFrameId) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }

    document.removeEventListener('keydown', handleEscape, true);
    document.removeEventListener('keydown', handleKeydown);
    window.removeEventListener('resize', handleResize);

    if (overlay && overlay.parentNode) {
      overlay.parentNode.removeChild(overlay);
    }

    overlay = null;
    canvas = null;
    ctx = null;

    document.body.style.overflow = '';
  }

  // Exponer API
  window.__tetris = { open: open, close: close };
})();
