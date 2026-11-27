import { useEffect, useRef } from 'react';
import type { HTMLAttributes } from 'react';
import { generate } from 'json-custom-view';
import type { GenerateResultType, SettingsType, ValueType } from 'json-custom-view';

export type { GenerateResultType, SettingsType, ValueType };

export interface JsonCustomViewProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** JSON string or already parsed value to render. */
  data: ValueType;
  /** json-custom-view settings. Keep the object stable (for example with `useMemo`) to avoid re-rendering on every render. */
  settings?: SettingsType;
  /** Called after every render with the result of `generate`. */
  onRender?: (result: GenerateResultType) => void;
}

/**
 * Renders `data` with json-custom-view into a `<div>`.
 * The view is rendered again when `data` or `settings` change.
 */
export const JsonCustomView = ({ data, settings, onRender, ...divProps }: JsonCustomViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const onRenderRef = useRef(onRender);
  onRenderRef.current = onRender;

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return undefined;
    }

    container.replaceChildren();
    const result = generate(data, container, settings);
    onRenderRef.current?.(result);

    return () => {
      container.replaceChildren();
    };
  }, [data, settings]);

  return <div ref={containerRef} {...divProps} />;
};

export default JsonCustomView;
