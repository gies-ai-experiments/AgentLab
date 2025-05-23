# agentlab_v2

This project demonstrates a multi-stage agent pipeline using the Google Agent Developer Kit (ADK). The pipeline:
1. Brainstorms ideas
2. Validates each idea in parallel
3. Selects the best idea
4. Iterates to improve quality
5. Generates a final self-contained AI prompt

## Prerequisites
- Python 3.8+
- git
- An OpenAI API key (for the `LiteLlm` model)

## Setup
1. Clone this repository and navigate into it:
   ```bash
   git clone <repo-url>
   cd <repo-directory>
   ```
2. Create and activate a virtual environment called `agent_venv`:
   ```bash
   python3 -m venv agent_venv
   source agent_venv/bin/activate    # On Windows use: agent_venv\Scripts\activate
   ```
3. Upgrade pip (optional but recommended):
   ```bash
   pip install --upgrade pip
   ```
4. Install required packages:
   ```bash
   pip install -r requirements.txt
   ```

## Configuration
- Review and edit `agentlab_v2/config.yaml` to adjust parameters:
  - `num_ideas`: Number of ideas to brainstorm per iteration
  - `max_loops`: Number of refinement loops
  - Other thresholds if needed
- Set your OpenAI API key:
  ```bash
  export OPENAI_API_KEY="your_api_key_here"
  ```

## Running the Agent
The ADK CLI provides both a web UI and a CLI runner.

### Web UI
```bash
# Start the interactive web interface
adk web
```
Open your browser at `http://localhost:8080` to interact with the pipeline.

### Command-Line Run
```bash
# Run the agent pipeline in the terminal
adk run
```  

## Troubleshooting
- Ensure the virtual environment is activated when running commands.
- Confirm `adk`, `python`, and `pip` point to the `agent_venv` binaries (`which adk`).
- Install missing dependencies if you encounter import errors.

## References
- ADK documentation: https://github.com/google/agent-developer-kit
# AgentLab

A multi-agent framework for idea generation and product development using Google's Agent Development Kit (ADK) and generative AI models.

## Project Overview

AgentLab is a framework that orchestrates multiple AI agents to collaborate on tasks like idea generation, validation, and product requirement documentation. The project has evolved through multiple versions (v1-v4), with each version adding new capabilities and refinements.

## Features

- Multi-agent orchestration with human-in-the-loop interactions
- Idea generation and validation
- Product Requirements Document (PRD) creation
- Prompt engineering for various applications

## Setup

1. Clone the repository
2. Create a virtual environment:
   ```
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```
3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
4. Set up environment variables:
   - Copy `.env.template` to `.env`
   - Add your API keys to the `.env` file:
     ```
     ANTHROPIC_API_KEY="your_anthropic_api_key_here"
     SERPAPI_API_KEY="your_serpapi_api_key_here"
     ```
   - The Anthropic API key is required for accessing Claude models
   - The SerpAPI key is used for competitor search functionality

## Usage

To run the latest version (v4):

```
python agentlab_v4/agent.py
```

When you run the script, it will:

1. Prompt you for input on what kind of ideas to generate (e.g., "AI productivity tools")
2. Generate several ideas based on your input
3. Validate these ideas
4. Present the ideas to you for selection
5. Create a Product Requirements Document (PRD) for your selected idea
6. Generate prompts that could be used to create apps based on your idea
7. Display the final results, including the selected idea, PRD, and prompts

### Interactive Workflow

The workflow is designed to be interactive with human-in-the-loop decision making:

1. After ideas are generated, you'll be asked to select one or request regeneration
2. After the PRD is created, you'll have the option to accept it or request changes
3. The final output includes the selected idea, a detailed PRD, and prompts for app creation

This interactive approach ensures that the final product aligns with your vision while leveraging AI for the heavy lifting of idea generation and documentation.

## Project Structure

- `agentlab_v1/`: Initial implementation
- `agentlab_v2/`: Enhanced version
- `agentlab_v3/`: Added competitor search functionality
- `agentlab_v4/`: Latest version with improved user interaction flow

## Common Issues and Solutions

### Pydantic Validation Error (Fixed)

Previously, users might have encountered this error when running agent.py:

```
ValueError: "UserSelectionAgent" object has no field "idea_generator"
```

This was caused by a Pydantic validation issue where the `UserSelectionAgent` class was trying to set attributes that weren't defined as fields in the Pydantic model.

**Solution (Already Implemented):**

This issue has been fixed in the current version by properly declaring the fields in the `UserSelectionAgent` class:

```python
class UserSelectionAgent(BaseAgent):
    # --- Field Declarations for Pydantic ---
    idea_generator: LlmAgent
    validator: LlmAgent
    product_manager: LlmAgent
    prompt_engineer: LlmAgent
    
    # Allow arbitrary types since we're storing agent instances
    model_config = {"arbitrary_types_allowed": True}
    
    # Rest of the class...
```

And passing them correctly to the parent class constructor:

```python
super().__init__(
    name=name,
    idea_generator=idea_generator,
    validator=validator,
    product_manager=product_manager,
    prompt_engineer=prompt_engineer,
    sub_agents=sub_agents_list,
)
```

## Dependencies

All required dependencies are listed in requirements.txt, including:

- google-adk: Google's Agent Development Kit
- google-genai: Google's Generative AI library
- pydantic: Data validation library
- PyYAML: YAML parsing library
- anthropic: Client for Claude AI models