import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Top-level React ErrorBoundary preventing uncaught component/chunk exceptions
 * from leaving a blank white screen or causing uncontrolled browser reload loops.
 */
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FBF6ED] text-[#3C2A20] flex items-center justify-center p-6 text-center">
          <div className="max-w-md bg-[#FFFDF8] border border-[#C8AB88] rounded-xl p-8 shadow-md space-y-4">
            <div className="font-cinzel text-xs uppercase tracking-widest text-[#A67C57] font-bold">
              ॥ श्री द्वारकाधीश मंदिर ॥
            </div>
            <h1 className="font-serif-royal text-2xl font-bold text-[#741C24]">
              Portal View Interrupted
            </h1>
            <p className="text-sm text-[#715847] leading-relaxed">
              A temporary display error occurred while loading a temple section. Tap below to restore the view cleanly.
            </p>
            <button
              type="button"
              onClick={() => this.setState({ hasError: false })}
              className="px-5 py-2.5 text-xs font-cinzel font-bold uppercase tracking-wider text-white bg-[#6B4832] hover:bg-[#523725] rounded-xs cursor-pointer"
            >
              Restore View
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
