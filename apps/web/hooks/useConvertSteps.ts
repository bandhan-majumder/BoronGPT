interface Step {
  type: "file" | "shell";
  code: string;
  runnableCommand: string;
  status: "pending";
  filePath?: string; 
}

interface BoronAction {
  type: "file" | "shell";
  filePath?: string;
  content: any;
}

interface ClaudeMessage {
  id: string;
  type: string;
  role: string;
  model: string;
  content: Array<{
    type: string;
    text: string;
  }>;
  stop_reason: string;
  stop_sequence: any;
  usage: any;
}

function parseMessageToSteps(message: ClaudeMessage): Step[] {
  const steps: Step[] = [];
  
  try {
    const textContent = message.content.find(c => c.type === 'text')?.text || '';
    
    const jsonMatch = textContent.match(/\{[\s\S]*"boronActions"[\s\S]*?\]/);
    
    if (!jsonMatch) {
      console.warn('No boronActions found in the message');
      return steps;
    }
    
    // Find the complete JSON object
    let jsonStr = '';
    let braceCount = 0;
    let startFound = false;
    
    for (let i = 0; i < textContent.length; i++) {
      const char = textContent[i];
      
      if (char === '{' && !startFound) {
        startFound = true;
        jsonStr += char;
        braceCount = 1;
      } else if (startFound) {
        jsonStr += char;
        
        if (char === '{') {
          braceCount++;
        } else if (char === '}') {
          braceCount--;
          
          if (braceCount === 0) {
            break;
          }
        }
      }
    }
    
    if (!jsonStr) {
      console.warn('Could not extract complete JSON from message');
      return steps;
    }
    
    // Parse the JSON
    const parsedData = JSON.parse(jsonStr);
    
    if (!parsedData.boronActions || !Array.isArray(parsedData.boronActions)) {
      console.warn('boronActions not found or not an array');
      return steps;
    }
    
    // Convert each boronAction to a step
    parsedData.boronActions.forEach((action: BoronAction, index: number) => {
      if (action.type === 'file') {
        steps.push({
          type: 'file',
          code: typeof action.content === 'string' 
            ? action.content 
            : JSON.stringify(action.content, null, 2),
          runnableCommand: '',
          status: 'pending',
          filePath: action.filePath
        });
      } else if (action.type === 'shell') {
        steps.push({
          type: 'shell',
          code: '',
          runnableCommand: typeof action.content === 'string' 
            ? action.content 
            : String(action.content),
          status: 'pending'
        });
      }
    });
    
  } catch (error) {
    console.error('Error parsing Claude message:', error);
  }
  
  return steps;
}

export { parseMessageToSteps, type Step, type ClaudeMessage };