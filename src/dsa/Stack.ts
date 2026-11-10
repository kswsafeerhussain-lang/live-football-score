/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GoalPulse - University DSA Project: Stack Data Structure Implementation
 * Topic: Stack Abstract Data Type (ADT) - Last In, First Out (LIFO)
 * 
 * This file implements a generic, manual Stack data structure from first principles.
 * Do not replace with native array shortcuts. All operations enforce strict LIFO semantics.
 */

export interface IStack<T> {
  push(element: T): void;
  pop(): T | undefined;
  peek(): T | undefined;
  isEmpty(): boolean;
  size(): number;
  clear(): void;
  display(): T[];
  toArray(): T[];
}

export interface StackOperationLog {
  id: string;
  operation: 'PUSH' | 'POP' | 'PEEK' | 'CLEAR' | 'IS_EMPTY' | 'SIZE';
  timestamp: string;
  elementSummary?: string;
  returnedValue?: string;
  stackSizeAfter: number;
  timeComplexity: 'O(1)';
  description: string;
}

/**
 * Generic Stack Data Structure Class
 * Enforces Last-In-First-Out (LIFO) behavior.
 */
export class Stack<T> implements IStack<T> {
  // Internal storage for stack elements
  private items: T[];
  // Maximum capacity limit (optional, for bounded stack demonstration)
  private capacity: number;
  // Audit log of all stack operations for academic demonstration
  private operationLogs: StackOperationLog[];

  constructor(capacity: number = 100) {
    this.items = [];
    this.capacity = capacity;
    this.operationLogs = [];
  }

  /**
   * PUSH Operation: Adds an element onto the top of the stack.
   * Time Complexity: O(1) amortized
   * Space Complexity: O(1)
   */
  public push(element: T): void {
    if (this.size() >= this.capacity) {
      throw new Error(`Stack Overflow: Capacity of ${this.capacity} reached.`);
    }

    this.items.push(element);

    this.logOperation({
      operation: 'PUSH',
      elementSummary: this.formatElement(element),
      stackSizeAfter: this.size(),
      timeComplexity: 'O(1)',
      description: `Pushed item onto top of stack. New TOP index: ${this.size() - 1}`
    });
  }

  /**
   * POP Operation: Removes and returns the element at the top of the stack.
   * Enforces LIFO: the most recently pushed element is removed first.
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  public pop(): T | undefined {
    if (this.isEmpty()) {
      this.logOperation({
        operation: 'POP',
        returnedValue: 'undefined (Stack Underflow)',
        stackSizeAfter: 0,
        timeComplexity: 'O(1)',
        description: 'Failed POP: Stack is empty (Stack Underflow)'
      });
      return undefined;
    }

    const removedItem = this.items.pop();

    this.logOperation({
      operation: 'POP',
      returnedValue: this.formatElement(removedItem),
      stackSizeAfter: this.size(),
      timeComplexity: 'O(1)',
      description: `Popped top item from stack (LIFO principle). Remaining size: ${this.size()}`
    });

    return removedItem;
  }

  /**
   * PEEK Operation: Returns the element at the top of the stack without removing it.
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  public peek(): T | undefined {
    if (this.isEmpty()) {
      this.logOperation({
        operation: 'PEEK',
        returnedValue: 'undefined (Stack Empty)',
        stackSizeAfter: 0,
        timeComplexity: 'O(1)',
        description: 'PEEK examined top: Stack is currently empty'
      });
      return undefined;
    }

    const topItem = this.items[this.items.length - 1];

    this.logOperation({
      operation: 'PEEK',
      returnedValue: this.formatElement(topItem),
      stackSizeAfter: this.size(),
      timeComplexity: 'O(1)',
      description: `Inspected TOP item without mutation (index ${this.items.length - 1})`
    });

    return topItem;
  }

  /**
   * isEmpty: Returns true if the stack contains no elements.
   * Time Complexity: O(1)
   */
  public isEmpty(): boolean {
    return this.items.length === 0;
  }

  /**
   * size: Returns the current number of elements on the stack.
   * Time Complexity: O(1)
   */
  public size(): number {
    return this.items.length;
  }

  /**
   * clear: Empties all elements from the stack.
   * Time Complexity: O(1)
   */
  public clear(): void {
    this.items = [];
    this.logOperation({
      operation: 'CLEAR',
      stackSizeAfter: 0,
      timeComplexity: 'O(1)',
      description: 'Stack cleared completely. Reset to size 0.'
    });
  }

  /**
   * display: Returns an array representation of stack elements from TOP to BOTTOM.
   * This is useful for UI inspection where the TOP element must be clearly visible.
   */
  public display(): T[] {
    // Return shallow copy reversed so index 0 is the TOP of the stack
    return [...this.items].reverse();
  }

  /**
   * toArray: Returns elements in internal storage order (index 0 is BOTTOM, last is TOP)
   */
  public toArray(): T[] {
    return [...this.items];
  }

  /**
   * Get audit log history of operations
   */
  public getLogs(): StackOperationLog[] {
    return [...this.operationLogs];
  }

  /**
   * Helper to format generic element for log strings
   */
  private formatElement(elem: T | undefined): string {
    if (elem === undefined || elem === null) return 'null';
    if (typeof elem === 'object') {
      try {
        const anyElem = elem as Record<string, unknown>;
        if (anyElem.title) return String(anyElem.title);
        if (anyElem.description) return String(anyElem.description);
        if (anyElem.type && anyElem.minute) {
          return `${anyElem.type.toString().toUpperCase()} @ ${anyElem.minute}' (${anyElem.player || anyElem.team || ''})`;
        }
        return JSON.stringify(elem).slice(0, 40) + '...';
      } catch {
        return '[Object]';
      }
    }
    return String(elem);
  }

  /**
   * Record operation in execution audit log
   */
  private logOperation(log: Omit<StackOperationLog, 'id' | 'timestamp'>): void {
    const entry: StackOperationLog = {
      id: `op-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toLocaleTimeString(),
      ...log
    };
    // Keep most recent 50 operation logs
    this.operationLogs.unshift(entry);
    if (this.operationLogs.length > 50) {
      this.operationLogs.pop();
    }
  }
}
