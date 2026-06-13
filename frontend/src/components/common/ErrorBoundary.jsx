import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught rendering failure:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    // Safe redirection back to secure base URL routing context
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="aether-card p-6 bg-white border border-red-200 rounded-xl shadow-[0_4px_6px_-1px_rgba(239,68,68,0.05)] text-left max-w-lg mx-auto my-12 select-none">
          <div className="flex items-start space-x-3.5">
            {/* Glowing pulsing status marker indicator */}
            <span className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0 animate-pulse"></span>
            <div className="flex-1 min-w-0">
              <h3 className="text-xs font-sans font-bold tracking-wider text-void-950 uppercase">
                System Fault Intercepted
              </h3>
              <p className="text-xs text-void-700/60 font-sans mt-2 leading-relaxed">
                An unexpected state mutation or rendering lifecycle breakdown occurred inside this localized viewport container. 
                The primary navigation bar, dark sidebar widget, and background services remain fully operational.
              </p>
              
              {this.state.error && (
                <div className="mt-3.5 p-3 bg-canvas-50 border border-canvas-200 rounded-lg max-w-full">
                  <pre className="text-[10px] font-mono text-void-850 overflow-x-auto whitespace-pre-wrap break-all leading-normal">
                    {this.state.error.stack || this.state.error.toString()}
                  </pre>
                </div>
              )}
              
              <div className="mt-5 select-none">
                <button
                  onClick={this.handleReset}
                  className="px-4 py-2 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-xs font-semibold shadow-md transition-all cursor-pointer"
                >
                  Reset Viewport
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
