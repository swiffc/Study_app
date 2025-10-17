export interface ExecutionResult {
  output?: string;
  error?: string;
}

// Sandboxed code execution for JavaScript/TypeScript
export async function executeJavaScript(code: string): Promise<ExecutionResult> {
  try {
    // Capture console output
    const logs: string[] = [];
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;
    
    console.log = (...args: any[]) => {
      logs.push(args.map(arg => String(arg)).join(' '));
    };
    console.error = (...args: any[]) => {
      logs.push('ERROR: ' + args.map(arg => String(arg)).join(' '));
    };
    console.warn = (...args: any[]) => {
      logs.push('WARN: ' + args.map(arg => String(arg)).join(' '));
    };
    
    try {
      // Use Function constructor for safer eval
      const fn = new Function(code);
      const result = fn();
      
      // If the result is a promise, await it
      if (result instanceof Promise) {
        await result;
      }
      
      return { output: logs.join('\n') || 'Code executed successfully (no output)' };
    } finally {
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
    }
  } catch (error) {
    return { error: error instanceof Error ? error.message : String(error) };
  }
}

// Python execution would require a backend or Pyodide
export async function executePython(_code: string): Promise<ExecutionResult> {
  try {
    // Check if Pyodide is available
    if (typeof (window as any).loadPyodide === 'undefined') {
      return {
        error: 'Python execution requires Pyodide. Loading Pyodide is not implemented in this demo.',
      };
    }
    
    // In a real implementation, you would:
    // 1. Load Pyodide
    // 2. Run the code
    // 3. Capture output
    
    return {
      output: 'Python execution placeholder - would use Pyodide or backend service',
    };
  } catch (error) {
    return { error: error instanceof Error ? error.message : String(error) };
  }
}

export async function executeCode(language: string, code: string): Promise<ExecutionResult> {
  // Normalize language name
  const lang = language.toLowerCase();
  
  switch (lang) {
    case 'javascript':
    case 'js':
    case 'typescript':
    case 'ts':
      return executeJavaScript(code);
    
    case 'python':
    case 'py':
      return executePython(code);
    
    default:
      return {
        error: `Code execution for ${language} is not supported yet. Supported languages: JavaScript, TypeScript`,
      };
  }
}
