/**
 * swing.js type definition
 */

declare module 'swing' {
  export function Card(config: any): Card;
  export interface Card {
    makeConfig(config: Configure): Configure;
    transform(element: HTMLElement, coordinateX: number, coordinateY: number, rotation: number): void;
    appendToParent(element: HTMLElement): void;
    prependToParent(element: HTMLElement): void;
    throwOutConfidence(xOffset: number, yOffset: number, element: HTMLElement): number;
    isThrowOut(xOffset: number, yOffset: number, element: HTMLElement, throwOutConfidence: number): boolean;
    throwOutDistance(min: number, max: number): number;
    rotation(coordinateX: number, coordinateY: number, element: HTMLElement, maxRotation: number): number;
    on(event: Event, callback: () => void): void;
    destroy(): void;

    THROW_IN: 'in';
    THROW_OUT: 'out';
  }
  export function Stack(config: any): Stack;
  export interface Stack {
    createCard(Element: HTMLElement): Card;
    getCard(Element: HTMLElement): Card;
    destroyCard(card: Card): Card[];
    getConfig(): Configure;
    getSpringSystem(): any;
    on(event: Event, callback: () => void): void;
  }

  export interface Configure {
    isThrowOut: number;
    allowedDirections: Direction[];
    throwOutConfidence: number;
    throwOutDistance: number;
    minThrowOutDistance: number;
    maxThrowOutDistance: number;
    rotation: Card['rotation'];
    maxRotation: number;
    transform: Card['transform'];
  }

  export enum Direction {
    DOWN = 'DOWN',
    INVALID = 'INVALID',
    LEFT = 'LEFT',
    RIGHT = 'RIGHT',
    UP = 'UP',
  }

  export type Event =
    | 'throwout'
    | 'throwoutend'
    | 'throwoutleft'
    | 'throwoutright'
    | 'throwin'
    | 'throwinend'
    | 'dragstart'
    | 'dragmove'
    | 'dragend';
}
