import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in CHANNI TRANSPORT web app:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0B0B0B] text-[#FAF7F2] flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md w-full glass-card p-8 rounded-2xl border border-[#C9A96E]/30 space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/30 flex items-center justify-center mx-auto text-[#C9A96E]">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-2xl font-serif text-[#C9A96E]">CHANNI TRANSPORT</h1>
            <p className="text-[#FAF7F2]/80 text-sm">
              We encountered an issue loading this view. Please refresh or call us directly for instant goods booking.
            </p>
            <div className="flex flex-col gap-3 pt-2">
              <a
                href="tel:+917508260068"
                className="w-full py-3 px-4 bg-[#C9A96E] hover:bg-[#E4C88E] text-[#0B0B0B] font-semibold rounded-xl text-center transition-all shadow-lg shadow-[#C9A96E]/20"
              >
                Call Dispatch: +91 75082 60068
              </a>
              <a
                href="tel:+917837146640"
                className="w-full py-3 px-4 border border-[#C9A96E]/40 text-[#C9A96E] hover:bg-[#C9A96E]/10 font-semibold rounded-xl text-center transition-all"
              >
                Call Owner: +91 78371 46640
              </a>
              <button
                onClick={() => window.location.reload()}
                className="text-xs text-[#FAF7F2]/50 underline hover:text-[#FAF7F2] pt-2"
              >
                Reload Web App
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
