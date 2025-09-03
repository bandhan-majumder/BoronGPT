/*
* Helper function to convert the API response to a structured format of steps. Steps are having this properties;
* type - "file" | "shell"
* filePath - "<file_path>" - optional as shell commands does not have file path
* content - "<command_content>"
*/

// enum actionType {
//   file,
//   shell
// }

export enum ProcessState {
  pending,
  completed,
  onGoing
}

interface StepsInterface {
  type: string, // it should be limited to actionType, but for now, it's a string
  content: string,
  filePath?: string // optional
  action: ProcessState // by default every action will be of pending state
}

interface SuccessFulParsedResponseInterface {
  steps: StepsInterface[],
  metadata: {
    totalSteps: number,
  }
}

interface FailedParsedResponseInterface {
  error: any,
  steps: []
}

function parseBoronActions(response: any): SuccessFulParsedResponseInterface | FailedParsedResponseInterface {
  try {
    let parsedData;
    let textContent = '';

    if (response && response.boronActions && Array.isArray(response.boronActions)) {
      parsedData = response;
    }
    else if (response && response.response && typeof response.response === 'string') {
      textContent = response.response;
    }
    else if (typeof response === 'string') {
      textContent = response;
    }
    else {
      throw new Error('Invalid response format: expected string or object with boronActions');
    }

    if (textContent && !parsedData) {
      const startIndex = textContent.indexOf('{');
      if (startIndex === -1) {
        throw new Error('No JSON object found in response');
      }

      let braceCount = 0;
      let endIndex = -1;
      for (let i = startIndex; i < textContent.length; i++) {
        if (textContent[i] === '{') braceCount++;
        if (textContent[i] === '}') {
          braceCount--;
          if (braceCount === 0) {
            endIndex = i;
            break;
          }
        }
      }

      if (endIndex === -1) {
        throw new Error('No matching closing brace found for JSON object');
      }

      const jsonString = textContent.substring(startIndex, endIndex + 1);
      try {
        parsedData = JSON.parse(jsonString);
      } catch (parseError) {
        throw new Error(`Failed to parse extracted JSON: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`);
      }
    }

    if (!parsedData.boronActions || !Array.isArray(parsedData.boronActions)) {
      throw new Error('boronActions is not a valid array in the parsed data');
    }

    const steps = parsedData.boronActions.map((action: any, index: number) => {

      if (!action.type || (action.type !== 'file' && action.type !== 'shell')) {
        throw new Error(`Invalid type at action ${index}: must be 'file' or 'shell'`);
      }

      if (!action.content) {
        throw new Error(`Missing content at action ${index}`);
      }

      const step: any = {
        type: action.type,
        content: typeof action.content === 'object'
          ? JSON.stringify(action.content, null, 2)
          : action.content
      };

      if (action.type === 'file') {
        if (!action.filePath) {
          throw new Error(`Missing filePath for file action at index ${index}`);
        }
        step.filePath = action.filePath;
      }

      return step;
    });

    const result = {
      steps: steps,
      metadata: {
        totalSteps: steps.length,
      }
    };

    return result;

  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'An unknown error occurred',
      steps: [],
    };
  }
}

export async function processResponse(response: any) {
  try {
    const result = parseBoronActions(response);
    return result;
  } catch (error) {
    console.error('Error processing response:', error);
    throw error;
  }
}