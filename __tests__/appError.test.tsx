import React from 'react';
import {renderHook, act} from '@testing-library/react-hooks';

const mockSetupInterceptors = jest.fn();

jest.mock('@/services/api', () => ({
  setupApiInterceptors: (showError: any, setLoading: any) =>
    mockSetupInterceptors(showError, setLoading),
}));

import {ErrorProvider, useError} from './../src/hooks/appError';

const wrapper: React.FC<{children: React.ReactNode}> = ({children}) => (
  <ErrorProvider>{children}</ErrorProvider>
);

describe('ErrorContext / useError', () => {
  it('should provide default context values', () => {
    const {result} = renderHook(() => useError(), {wrapper});
    const {
      tooltipeError,
      loading,
      showTooltipeError,
      hideTooltipeError,
      setLoading,
    } = result.current;
    expect(tooltipeError).toEqual({message: '', visible: false});
    expect(loading).toBe(false);
    expect(typeof showTooltipeError).toBe('function');
    expect(typeof hideTooltipeError).toBe('function');
    expect(typeof setLoading).toBe('function');
  });

  it('should update error state when showTooltipeError is called', () => {
    const {result} = renderHook(() => useError(), {wrapper});
    act(() => {
      result.current.showTooltipeError({message: 'Test error', visible: true});
    });
    expect(result.current.tooltipeError).toEqual({
      message: 'Test error',
      visible: true,
    });
  });

  it('should reset error state when hideTooltipeError is called', () => {
    const {result} = renderHook(() => useError(), {wrapper});
    act(() => {
      result.current.showTooltipeError({
        message: 'Another error',
        visible: true,
      });
      result.current.hideTooltipeError();
    });
    expect(result.current.tooltipeError).toEqual({message: '', visible: false});
  });

  it('should set loading correctly', () => {
    const {result} = renderHook(() => useError(), {wrapper});
    act(() => {
      result.current.setLoading(true);
    });
    expect(result.current.loading).toBe(true);
  });

  it('should call setupApiInterceptors on mount', () => {
    renderHook(() => useError(), {wrapper});
    expect(mockSetupInterceptors).toHaveBeenCalled();

    const [showErrorFn, setLoadingFn] = mockSetupInterceptors.mock.calls[0];
    expect(typeof showErrorFn).toBe('function');
    expect(typeof setLoadingFn).toBe('function');
  });
});
