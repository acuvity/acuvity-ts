import _ from 'lodash';

export function indentTail(str: string, tabs = 1): string {
  return _(str)
    .split('\n')
    .map((line: string, idx: number) => {
      if (idx === 0) {
        return line;
      }

      const trimmed = _.trimEnd(line);
      if (!trimmed) {
        return '';
      }

      return `${_.repeat(' ', tabs * 2)}${trimmed}`;
    })
    .join('\n');
}

export function strArray(ss: string[]): string {
  const content = _.join(ss.map((s: string) => `'${s}'`), ', ');

  return `[${content}]`;
}

export const stringify = JSON.stringify;
