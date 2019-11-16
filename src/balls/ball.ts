import { Offset } from "../types/offset";
import random from "../utils/random";

interface Options {
  size?: number;
  parentElement: HTMLElement;
  boardWidth: number;
  boardHeight: number;
}

export type BallType = 'left' | 'right' | 'regular';

export default class Ball {
  size: number;
  parentEelement: HTMLElement;
  offset: Offset;
  direction: Offset;
  container: HTMLElement | undefined;
  boardWidth: number;
  boardHeight: number;
  type: BallType | undefined;

  constructor({
    size = 15, parentElement, boardWidth, boardHeight
  }: Options) {
    this.size = size;
    this.parentEelement = parentElement;
    this.direction = { x: 1, y: 1 };
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.offset = {
      x: random(0, this.boardWidth - this.size),
      y: random(0, this.boardHeight - this.size),
    };

  }

  _updateOffset() {
    const { direction, offset } = this;
    if (offset.x < 0 || offset.x > this.boardWidth - this.size) {
      direction.x = -direction.x;
    }
    if (offset.y < 0 || offset.y > this.boardHeight - this.size) {
      direction.y = -direction.y;
    }
    this.offset.x += direction.x;
    this.offset.y += direction.y;
  }

  _getColorClass(type: BallType | undefined) {
    switch (type) {
      case 'left': {
        return 'ball--green';
      }
      case 'right': {
        return 'ball--red';
      }
      default: {
        return undefined;
      }
    }
  }

  dispose() {
    this.container && this.container.remove();
  }

  render(type: BallType) {
    const isFirstRender = this.container === undefined;
    if (isFirstRender) {
      this.container = document.createElement('div');
      this.container.style.width = `${this.size}px`;
      this.container.style.height = `${this.size}px`;
      this.container.classList.add('ball');
    }
    const { x, y } = this.offset;
    this.container!.style.transform = `translate(${x}px, ${y}px)`;
    if (type !== this.type) {
      // remove old class
      const prevClass = this._getColorClass(this.type);
      const newClass = this._getColorClass(type);
      if (prevClass) {
        this.container!.classList.remove(prevClass);
      }
      if (newClass) {
        this.container!.classList.add(newClass);
      }
      this.type = type;
    }
    if (isFirstRender) {
      this.parentEelement.appendChild(this.container!);
    }
  }
}
