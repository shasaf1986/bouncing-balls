import Ball, { BallType } from "./ball";
import interval from "../utils/interval";
import Header from "./header";

interface Options {
  width: number;
  height: number;
  parentElement: HTMLElement;
}

export default class Balls {
  private width: number;
  private height: number;
  private parentElement: HTMLElement;
  private container?: HTMLElement;
  private header?: Header;
  private balls: Ball[];
  private disposeInterval?: () => void;

  constructor(options: Options) {
    this.width = options.width;
    this.height = options.height;
    this.parentElement = options.parentElement;
    this.balls = [];
  }

  updateBalls = (count: number) => {
    if (count > this.balls.length) {
      for (let i = this.balls.length; i < count; i++) {
        const ball = new Ball({
          parentElement: this.container!,
          // minus border
          boardWidth: this.width - 2,
            // minus border
          boardHeight: this.height - 2,
        });
        this.balls.push(ball);
      }
    } else if (count < this.balls.length) {
      const ballsToRemove = this.balls.splice(count);
      ballsToRemove.forEach((ball) => {
        ball.dispose();
      });
    }
  };

  render() {
    this.container = document.createElement('div');
    this.container.style.width = `${this.width}px`;
    this.container.style.height = `${this.height}px`;
    this.container.classList.add('game');
    this.parentElement.appendChild(this.container);
    this.header = new Header({
      parentElement: this.container,
      onChange: this.updateBalls,
    });
    this.header.render();
    this.disposeInterval = interval(this.renderBalls, 5);
  }

  dispose() {
    // TODO: not complete
    this.disposeInterval && this.disposeInterval();
    this.disposeInterval = undefined;
  }

  renderBalls = () => {
    let leftBall: Ball | undefined;
    let rightBall: Ball | undefined;
    this.balls.forEach((ball) => {
      ball._updateOffset();
      // WA: do it private
      if (!leftBall || ball.offset.x < leftBall.offset.x) {
        leftBall = ball;
      }
      if (!rightBall || ball.offset.x > rightBall.offset.x) {
        rightBall = ball;
      }
    });

    this.balls.forEach((ball) => {
      let ballType: BallType = 'regular';
      if (ball === leftBall) {
        ballType = 'left';
      }
      else if (ball === rightBall) {
        ballType = 'right';
      }

      ball.render(ballType);
    });
  };

}
