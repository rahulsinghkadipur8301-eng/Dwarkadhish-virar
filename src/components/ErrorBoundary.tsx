import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  isChunkError: boolean;
}

function isDynamicImportError(error: unknown): boolean {
  const msg = error instanceof Error ? error.message : String(error ?? '');
  return (
    msg.includes('Failed to fetch dynamically imported module') ||
    msg.includes('Importing a module script failed') ||
    msg.includes('ChunkLoadError') ||
    msg.includes('Loading chunk')
  );
}

/**
 * Top-level React ErrorBoundary preventing uncaught component/chunk exceptions
 * from leaving a blank white screen or causing uncontrolled browser reload loops.
 */
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false, isChunkError: false };

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { hasError: true, isChunkError: isDynamicImportError(error) };
  }

  private handleRestore = () => {
    if (this.state.isChunkError && typeof window !== 'undefined') {
      window.location.reload();
      return;
    }
    this.setState({ hasError: false, isChunkError: false });
  };

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
              onClick={this.handleRestore}
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

interface SectionErrorBoundaryProps {
  id: string;
  children: React.ReactNode;
}

/**
 * Section-level ErrorBoundary so a transient lazy chunk fetch failure in one
 * below-the-fold section never crashes the entire homepage.
 */
export class SectionErrorBoundary extends React.Component<
  SectionErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false, isChunkError: false };

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { hasError: true, isChunkError: isDynamicImportError(error) };
  }

  private handleRetry = () => {
    if (this.state.isChunkError && typeof window !== 'undefined') {
      window.location.reload();
      return;
    }
    this.setState({ hasError: false, isChunkError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <section
          id={this.props.id}
          className="w-full py-12 px-4 bg-[#FAF4E8] border-b border-[#E5D1B6] flex items-center justify-center text-center"
        >
          <div className="max-w-sm bg-[#FFFDF8] border border-[#C8AB88] rounded-xl p-6 shadow-sm space-y-3">
            <p className="font-serif text-sm text-[#715847]">
              This section paused while connecting. Tap below to reload cleanly.
            </p>
            <button
              type="button"
              onClick={this.handleRetry}
              className="min-h-[40px] px-4 py-2 text-xs font-cinzel font-bold uppercase tracking-wider text-white bg-[#741C24] hover:bg-[#5D151B] rounded-lg cursor-pointer"
            >
              Reload Section
            </button>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
