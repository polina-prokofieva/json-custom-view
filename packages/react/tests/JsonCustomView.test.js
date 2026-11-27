import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import { JsonCustomView } from '../src/index';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe('JsonCustomView', () => {
  let container;
  let root;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it('renders the data and passes div props through', () => {
    const onRender = jest.fn();

    act(() => {
      root.render(createElement(JsonCustomView, {
        data: { name: 'Harry', house: 'Gryffindor' },
        className: 'viewer',
        onRender,
      }));
    });

    const viewer = container.querySelector('.viewer');
    expect(viewer).not.toBeNull();
    expect(viewer.textContent).toContain('Harry');
    expect(viewer.textContent).toContain('Gryffindor');
    expect(onRender).toHaveBeenCalledWith({ isRendered: true, errors: [] });
  });

  it('replaces the view when data changes', () => {
    act(() => {
      root.render(createElement(JsonCustomView, { data: { first: 'one' } }));
    });
    act(() => {
      root.render(createElement(JsonCustomView, { data: { second: 'two' } }));
    });

    expect(container.textContent).toContain('two');
    expect(container.textContent).not.toContain('one');
  });

  it('reports errors for invalid JSON', () => {
    const onRender = jest.fn();
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);

    act(() => {
      root.render(createElement(JsonCustomView, { data: '{ not json', onRender }));
    });

    expect(onRender).toHaveBeenCalledTimes(1);
    expect(onRender.mock.calls[0][0].isRendered).toBe(false);
    consoleError.mockRestore();
  });
});
