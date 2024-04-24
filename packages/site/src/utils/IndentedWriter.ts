import type { IStringBuilder } from '@rushstack/node-core-library';
import { StringBuilder } from '@rushstack/node-core-library';

/**
 * A utility for writing indented text.
 * @remarks
 *
 * Note that the indentation is inserted at the last possible opportunity.
 * For example, this code...
 *
 * ```ts
 *   writer.write('begin\n');
 *   writer.increaseIndent();
 *   writer.write('one\ntwo\n');
 *   writer.decreaseIndent();
 *   writer.increaseIndent();
 *   writer.decreaseIndent();
 *   writer.write('end');
 * ```
 *
 * ...would produce this output:
 *
 * ```
 *   begin
 *     one
 *     two
 *   end
 * ```
 */
export class IndentedWriter {
  /**
   * The text characters used to create one level of indentation.
   * Two spaces by default.
   */
  public defaultIndentPrefix: string = '  ';

  private readonly _builder: IStringBuilder;

  private _latestChunk: string | undefined;
  private _previousChunk: string | undefined;
  private _atStartOfLine: boolean;

  private readonly _indentStack: string[];
  private _indentText: string;

  private _beforeStack: string[];
  private _isWritingBeforeStack: boolean;

  public constructor(builder?: IStringBuilder) {
    this._builder = builder === undefined ? new StringBuilder() : builder;

    this._latestChunk = undefined;
    this._previousChunk = undefined;
    this._atStartOfLine = true;

    this._indentStack = [];
    this._indentText = '';

    this._beforeStack = [];
    this._isWritingBeforeStack = false;
  }

  /**
   * Retrieves the output that was built so far.
   * @returns The output string.
   */
  public getText(): string {
    return this._builder.toString();
  }

  public toString(): string {
    return this.getText();
  }

  /**
   * Increases the indentation.  Normally the indentation is two spaces,
   * however an arbitrary prefix can optional be specified.  (For example,
   * the prefix could be "// " to indent and comment simultaneously.)
   * Each call to IndentedWriter.increaseIndent() must be followed by a
   * corresponding call to IndentedWriter.decreaseIndent().
   * @param indentPrefix - The string to prepend to each line of indented text.
   */
  public increaseIndent(indentPrefix?: string): void {
    this._indentStack.push(indentPrefix !== undefined ? indentPrefix : this.defaultIndentPrefix);
    this._updateIndentText();
  }

  /**
   * Decreases the indentation, reverting the effect of the corresponding call
   * to IndentedWriter.increaseIndent().
   */
  public decreaseIndent(): void {
    this._indentStack.pop();
    this._updateIndentText();
  }

  /**
   * A shorthand for ensuring that increaseIndent()/decreaseIndent() occur
   * in pairs.
   * @param scope - A callback function that will be invoked with the indentation increased.
   * @param indentPrefix - The string to prepend to each line of indented text.
   *  If not provided, the default indent prefix will be used.
   */
  public indentScope(scope: () => void, indentPrefix?: string): void {
    this.increaseIndent(indentPrefix);
    scope();
    this.decreaseIndent();
  }

  /**
   * Adds a newline if the file pointer is not already at the start of the line (or start of the stream).
   */
  public ensureNewLine(): void {
    const lastCharacter: string = this.peekLastCharacter();
    if (lastCharacter !== '\n' && lastCharacter !== '') {
      this._writeNewLine();
    }
  }

  /**
   * Adds up to two newlines to ensure that there is a blank line above the current line.
   */
  public ensureSkippedLine(): void {
    if (this.peekLastCharacter() !== '\n') {
      this._writeNewLine();
    }

    const secondLastCharacter: string = this.peekSecondLastCharacter();
    if (secondLastCharacter !== '\n' && secondLastCharacter !== '') {
      this._writeNewLine();
    }
  }

  /**
   * Returns the last character that was written, or an empty string if no characters have been written yet.
   * @returns The last character that was written.
   */
  public peekLastCharacter(): string {
    if (this._latestChunk !== undefined) {
      return this._latestChunk.substr(-1, 1);
    }
    return '';
  }

  /**
   * Returns the second to last character that was written, or an empty string if less than one characters
   * have been written yet.
   * @returns The second to last character that was written.
   */
  public peekSecondLastCharacter(): string {
    if (this._latestChunk !== undefined) {
      if (this._latestChunk.length > 1) {
        return this._latestChunk.substr(-2, 1);
      }
      if (this._previousChunk !== undefined) {
        return this._previousChunk.substr(-1, 1);
      }
    }
    return '';
  }

  /**
   * Writes `before` and `after` messages if and only if `mayWrite` writes anything.
   *
   * If `mayWrite` writes "CONTENT", this method will write "<before>CONTENT<after>".
   * If `mayWrite` writes nothing, this method will write nothing.
   * @param before - The message to write before the content.
   * @param after - The message to write after the content.
   * @param mayWrite - The callback that may write content.
   */
  public writeTentative(before: string, after: string, mayWrite: () => void): void {
    this._beforeStack.push(before);

    // If this function writes anything, then _all_ messages in the "before stack" will also be
    // written. This means that the stack will be empty (as when we write a message from the stack,
    // we remove it from the stack).
    mayWrite();

    // If the stack is not empty, it means that `mayWrite` didn't write anything. Pop the last-
    // added message from the stack, we'll never write it. Otherwise, if the stack is empty, then
    // write the "after" message.
    if (this._beforeStack.length > 0) {
      this._beforeStack.pop();
    } else {
      this.write(after);
    }
  }

  /**
   * Writes some text to the internal string buffer, applying indentation according
   * to the current indentation level.  If the string contains multiple newlines,
   * each line will be indented separately.
   * @param message - The text to write.
   */
  public write(message: string): void {
    if (message.length === 0) {
      return;
    }

    if (!this._isWritingBeforeStack) {
      this._writeBeforeStack();
    }

    // If there are no newline characters, then append the string verbatim
    if (!/[\r\n]/.test(message)) {
      this._writeLinePart(message);
      return;
    }

    // Otherwise split the lines and write each one individually
    let first: boolean = true;
    for (const linePart of message.split('\n')) {
      if (!first) {
        this._writeNewLine();
      } else {
        first = false;
      }
      if (linePart) {
        this._writeLinePart(linePart.replace(/[\r]/g, ''));
      }
    }
  }

  /**
   * A shorthand for writing an optional message, followed by a newline.
   * Indentation is applied following the semantics of IndentedWriter.write().
   * @param message - The text to write.
   */
  public writeLine(message: string = ''): void {
    if (message.length > 0) {
      this.write(message);
    } else if (!this._isWritingBeforeStack) {
      this._writeBeforeStack();
    }

    this._writeNewLine();
  }

  /**
   * Writes a string that does not contain any newline characters.
   * @param message - The text to write.
   */
  private _writeLinePart(message: string): void {
    if (message.length > 0) {
      if (this._atStartOfLine && this._indentText.length > 0) {
        this._write(this._indentText);
      }
      this._write(message);
      this._atStartOfLine = false;
    }
  }

  private _writeNewLine(): void {
    if (this._atStartOfLine && this._indentText.length > 0) {
      this._write(this._indentText);
    }

    this._write('\n');
    this._atStartOfLine = true;
  }

  private _write(s: string): void {
    this._previousChunk = this._latestChunk;
    this._latestChunk = s;
    this._builder.append(s);
  }

  /**
   * Writes all messages in our before stack, processing them in FIFO order. This stack is
   * populated by the `writeTentative` method.
   */
  private _writeBeforeStack(): void {
    this._isWritingBeforeStack = true;

    for (const message of this._beforeStack) {
      this.write(message);
    }

    this._isWritingBeforeStack = false;
    this._beforeStack = [];
  }

  private _updateIndentText(): void {
    this._indentText = this._indentStack.join('');
  }
}
