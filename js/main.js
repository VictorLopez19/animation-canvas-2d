/**
 * Selecciona el elemento canvas del DOM y obtiene su contexto 2D para dibujar.
 */
const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

/**
 * Obtiene las dimensiones actuales de la ventana del navegador.
 */
const window_height = /* 300; */window.innerHeight * 0.65;
const window_width = /* 300; */window.innerWidth <= 500? window.innerWidth * .9 : window.innerWidth * 0.65;

// Ajusta el tamaño del canvas para que coincida con la pantalla
canvas.height = window_height;
canvas.width = window_width;
canvas.style.background = "rgb(224, 224, 224)";

/**
 * Clase que representa un círculo animado dentro del canvas.
 */
class Circle {
  /**
   * Constructor de la clase Circle.
   */
  constructor(x, y, radius, color, text, speed) {
    this.cont = 0;
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.color = color;
    this.text = text;
    this.speed = speed;
    this.dx = 0.5 * this.speed;
    this.dy = 0.5 * this.speed;
  }

  // Devuelve el nombre del círculo con el contador actualizado
  updateName() {
    return this.text + " " + this.cont;
  }

  /**
   * Dibuja el círculo en el canvas.
   */
  draw(context) {
    context.beginPath();
    context.strokeStyle = this.color;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "20px Arial";
    context.fillText(this.updateName(), this.posX, this.posY);
    context.lineWidth = 2;
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    context.stroke();
    context.closePath();
  }

  /**
   * Actualiza la posición del círculo y gestiona la colisión con los bordes del canvas.
   */
  update(context) {
    this.draw(context);

    // Invertir la dirección en caso de colisión con los bordes
    if (this.posX + this.radius > window_width || this.posX - this.radius < 0) {
      this.dx = -this.dx;
      this.cont++;
    }
    if (this.posY + this.radius > window_height || this.posY - this.radius < 0) {
      this.dy = -this.dy;
      this.cont++;
    }

    // Actualizar posición
    this.posX += this.dx;
    this.posY += this.dy;
  }
}

// Margen para evitar que los círculos toquen los bordes del canvas
let borderOffset = 2;

// Generación de valores aleatorios para el círculo en canvasRandom
let randomRadius = Math.floor(Math.random() * 100 + 30);
let randomX = Math.random() * (canvas.width - 2 * (randomRadius + borderOffset)) + randomRadius + borderOffset;
let randomY = Math.random() * (canvas.height - 2 * (randomRadius + borderOffset)) + randomRadius + borderOffset;

// Creación de los círculos con posiciones y velocidades aleatorias
let miCirculo = new Circle(randomX, randomY, randomRadius, "rgb(0, 34, 255)", "Tec", 7);
miCirculo.draw(ctx);

let miCirculo2 = new Circle(randomX, randomY, randomRadius, "rgb(255, 0, 0)", "Tec", 3);
miCirculo2.draw(ctx);

/**
 * Función para actualizar los círculos en el canvas en cada frame de animación.
 */
let updateCircle = function () {
  // Si al menos uno sigue en movimiento, continuar la animación
  if (miCirculo.cont < 10 || miCirculo2.cont < 10) {
    requestAnimationFrame(updateCircle);
  }

  ctx.clearRect(0, 0, window_width, window_height); // Limpia el canvas antes de redibujar

  if (miCirculo.cont < 10) {
    miCirculo.update(ctx);
  } else {
    // Dibujar el círculo en su última posición sin moverlo
    miCirculo.draw(ctx);
  }

  if (miCirculo2.cont < 10) {
    miCirculo2.update(ctx);
  } else {
    // Dibujar el círculo en su última posición sin moverlo
    miCirculo2.draw(ctx);
  }
};

// Inicia la animación
updateCircle();
