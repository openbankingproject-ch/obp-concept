#!/bin/bash

# run-all-demos.sh
# 
# Comprehensive demonstration runner for Open API Kundenbeziehung
# Executes all demo scripts in the recommended order for complete system overview
# 
# Usage:
#   ./run-all-demos.sh [--quick] [--technical] [--help]
#
# Options:
#   --quick      Run quick overview session (15-20 minutes)
#   --technical  Run technical deep dive session (20-30 minutes)
#   --help       Show this help message
#
# Default: Full demonstration session (45-60 minutes)

# Color definitions for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
API_BASE_URL=${API_BASE_URL:-http://localhost:3000}
DEMO_SPEED=${DEMO_SPEED:-normal}
LOG_FILE="demo-execution-$(date +%Y%m%d_%H%M%S).log"

# Demo script definitions
declare -A DEMOS=(
    ["reference"]="reference-process-demo.js"
    ["consent"]="consent-flow-demo.js"
    ["uc1"]="uc1-banking-account-opening-demo.js"
    ["uc2"]="uc2-reidentification-demo.js"
    ["uc3"]="uc3-age-verification-demo.js"
    ["uc4"]="uc4-evv-lifecycle-demo.js"
    ["mvp"]="banking-mvp-demo.js"
    ["verification"]="verification-process-demo.js"
)

declare -A DEMO_NAMES=(
    ["reference"]="Reference Process Demo"
    ["consent"]="Consent Flow Demo"
    ["uc1"]="UC1: Banking Account Opening"
    ["uc2"]="UC2: Re-identification Process"
    ["uc3"]="UC3: Age Verification"
    ["uc4"]="UC4: EVV Lifecycle Management"
    ["mvp"]="Banking MVP Demo"
    ["verification"]="Verification Process Demo"
)

declare -A DEMO_TIMES=(
    ["reference"]=4
    ["consent"]=5
    ["uc1"]=4
    ["uc2"]=4
    ["uc3"]=5
    ["uc4"]=5
    ["mvp"]=3
    ["verification"]=4
)

# Demo execution orders for different session types
FULL_SESSION=("reference" "consent" "uc1" "uc2" "uc3" "uc4" "verification")
QUICK_SESSION=("reference" "uc1" "uc3" "verification")
TECHNICAL_SESSION=("consent" "mvp" "uc2" "uc4" "verification")

# Function to print colored output
print_color() {
    local color=$1
    shift
    echo -e "${color}$*${NC}"
}

# Function to print demo header
print_header() {
    echo
    print_color $CYAN "════════════════════════════════════════════════════════════════"
    print_color $CYAN "  Open API Kundenbeziehung - Comprehensive Demo Execution"
    print_color $CYAN "════════════════════════════════════════════════════════════════"
    echo
}

# Function to show help
show_help() {
    cat << EOF
Open API Kundenbeziehung Demo Runner

USAGE:
    ./run-all-demos.sh [OPTIONS]

OPTIONS:
    --quick      Run quick overview session (15-20 minutes)
                 Demos: Reference Process, UC1, UC3, Verification
    
    --technical  Run technical deep dive session (20-30 minutes)
                 Demos: Consent Flow, Banking MVP, UC2, UC4, Verification
    
    --help       Show this help message

DEFAULT:
    Full demonstration session (45-60 minutes)
    All demos in recommended order

ENVIRONMENT VARIABLES:
    API_BASE_URL    API server URL (default: http://localhost:3000)
    DEMO_SPEED      Demo execution speed: fast|normal|slow (default: normal)
    DEBUG           Enable debug output (default: false)

EXAMPLES:
    ./run-all-demos.sh                    # Full session
    ./run-all-demos.sh --quick            # Quick overview
    ./run-all-demos.sh --technical        # Technical deep dive
    DEBUG=true ./run-all-demos.sh         # Full session with debug

PREREQUISITES:
    - Node.js 16+ installed
    - Required dependencies: npm install axios chalk
    - API server running: cd api && npm start

LOG FILE:
    Execution log will be saved to: demo-execution-YYYYMMDD_HHMMSS.log

EOF
}

# Function to check prerequisites
check_prerequisites() {
    print_color $BLUE "Checking prerequisites..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_color $RED "ERROR: Node.js is not installed"
        print_color $YELLOW "Please install Node.js 16+ from https://nodejs.org/"
        exit 1
    fi
    
    local node_version=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$node_version" -lt 16 ]; then
        print_color $RED "ERROR: Node.js version $node_version is too old"
        print_color $YELLOW "Please upgrade to Node.js 16 or higher"
        exit 1
    fi
    
    print_color $GREEN "✓ Node.js $(node --version) detected"
    
    # Check required dependencies
    local required_deps=("axios" "chalk")
    for dep in "${required_deps[@]}"; do
        if ! node -e "require.resolve('$dep')" &> /dev/null; then
            print_color $RED "ERROR: Missing dependency: $dep"
            print_color $YELLOW "Please install with: npm install $dep"
            exit 1
        fi
    done
    
    print_color $GREEN "✓ Required dependencies available"
    
    # Check demo scripts exist
    local missing_scripts=()
    for script in "${DEMOS[@]}"; do
        if [ ! -f "$script" ]; then
            missing_scripts+=("$script")
        fi
    done
    
    if [ ${#missing_scripts[@]} -gt 0 ]; then
        print_color $RED "ERROR: Missing demo scripts:"
        for script in "${missing_scripts[@]}"; do
            print_color $RED "  - $script"
        done
        exit 1
    fi
    
    print_color $GREEN "✓ All demo scripts found"
}

# Function to check API server
check_api_server() {
    print_color $BLUE "Checking API server availability..."
    
    if curl -s --connect-timeout 5 "$API_BASE_URL/health" > /dev/null 2>&1; then
        print_color $GREEN "✓ API server is running at $API_BASE_URL"
    else
        print_color $RED "ERROR: API server is not available at $API_BASE_URL"
        print_color $YELLOW "Please start the API server:"
        print_color $YELLOW "  cd api && npm start"
        print_color $YELLOW ""
        print_color $YELLOW "Or set a different API_BASE_URL:"
        print_color $YELLOW "  export API_BASE_URL=http://your-server:port"
        exit 1
    fi
}

# Function to run a single demo
run_demo() {
    local demo_key=$1
    local script=${DEMOS[$demo_key]}
    local name=${DEMO_NAMES[$demo_key]}
    local estimated_time=${DEMO_TIMES[$demo_key]}
    
    if [ -z "$script" ]; then
        print_color $RED "ERROR: Unknown demo: $demo_key"
        return 1
    fi
    
    echo
    print_color $CYAN "────────────────────────────────────────────────────────────────"
    print_color $CYAN "  Starting: $name"
    print_color $CYAN "  Script: $script"
    print_color $CYAN "  Estimated Duration: ${estimated_time} minutes"
    print_color $CYAN "────────────────────────────────────────────────────────────────"
    
    local start_time=$(date +%s)
    
    # Run the demo script
    if DEBUG=${DEBUG:-false} API_BASE_URL="$API_BASE_URL" node "$script" 2>&1 | tee -a "$LOG_FILE"; then
        local end_time=$(date +%s)
        local duration=$((end_time - start_time))
        local minutes=$((duration / 60))
        local seconds=$((duration % 60))
        
        print_color $GREEN "✓ $name completed successfully"
        print_color $CYAN "  Duration: ${minutes}m ${seconds}s"
        
        if [ "$DEMO_SPEED" != "fast" ]; then
            print_color $YELLOW "Press Enter to continue to next demo, or Ctrl+C to exit..."
            read -r
        fi
        
        return 0
    else
        print_color $RED "✗ $name failed"
        print_color $YELLOW "Check the log file for details: $LOG_FILE"
        return 1
    fi
}

# Function to run demo session
run_session() {
    local session_type=$1
    local demos_array=()
    local session_name=""
    local estimated_total=0
    
    case $session_type in
        "quick")
            demos_array=("${QUICK_SESSION[@]}")
            session_name="Quick Overview Session"
            estimated_total=16
            ;;
        "technical")
            demos_array=("${TECHNICAL_SESSION[@]}")
            session_name="Technical Deep Dive Session"
            estimated_total=25
            ;;
        "full"|*)
            demos_array=("${FULL_SESSION[@]}")
            session_name="Full Demonstration Session"
            estimated_total=34
            ;;
    esac
    
    print_color $CYAN "Starting: $session_name"
    print_color $CYAN "Estimated Total Duration: ${estimated_total} minutes"
    print_color $CYAN "Number of Demos: ${#demos_array[@]}"
    echo
    
    local demo_count=0
    local failed_demos=()
    local session_start_time=$(date +%s)
    
    for demo_key in "${demos_array[@]}"; do
        demo_count=$((demo_count + 1))
        print_color $BLUE "Demo $demo_count of ${#demos_array[@]}"
        
        if run_demo "$demo_key"; then
            print_color $GREEN "Demo $demo_count completed successfully"
        else
            print_color $RED "Demo $demo_count failed"
            failed_demos+=("${DEMO_NAMES[$demo_key]}")
        fi
    done
    
    local session_end_time=$(date +%s)
    local total_duration=$((session_end_time - session_start_time))
    local total_minutes=$((total_duration / 60))
    local total_seconds=$((total_duration % 60))
    
    echo
    print_color $CYAN "════════════════════════════════════════════════════════════════"
    print_color $CYAN "  $session_name Complete"
    print_color $CYAN "════════════════════════════════════════════════════════════════"
    
    print_color $GREEN "✓ Session completed in ${total_minutes}m ${total_seconds}s"
    print_color $CYAN "✓ Demos executed: ${#demos_array[@]}"
    print_color $CYAN "✓ Log file: $LOG_FILE"
    
    if [ ${#failed_demos[@]} -eq 0 ]; then
        print_color $GREEN "✓ All demos completed successfully!"
    else
        print_color $YELLOW "⚠ Some demos failed:"
        for failed in "${failed_demos[@]}"; do
            print_color $RED "  - $failed"
        done
        print_color $YELLOW "Check the log file for details: $LOG_FILE"
    fi
    
    print_color $CYAN ""
    print_color $CYAN "Framework Status: http://localhost:3000/health"
    print_color $CYAN "API Documentation: http://localhost:3000/docs"
    print_color $CYAN ""
}

# Main execution
main() {
    local session_type="full"
    
    # Parse command line arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            --quick)
                session_type="quick"
                shift
                ;;
            --technical)
                session_type="technical"
                shift
                ;;
            --help)
                show_help
                exit 0
                ;;
            *)
                print_color $RED "Unknown option: $1"
                print_color $YELLOW "Use --help for usage information"
                exit 1
                ;;
        esac
    done
    
    # Start execution
    print_header
    
    # Log execution start
    echo "Demo execution started at $(date)" > "$LOG_FILE"
    echo "Session type: $session_type" >> "$LOG_FILE"
    echo "API Base URL: $API_BASE_URL" >> "$LOG_FILE"
    echo "Demo Speed: $DEMO_SPEED" >> "$LOG_FILE"
    echo "─────────────────────────────────────────" >> "$LOG_FILE"
    
    # Run prerequisite checks
    check_prerequisites
    check_api_server
    
    print_color $GREEN "All prerequisites satisfied!"
    echo
    
    if [ "$DEMO_SPEED" != "fast" ]; then
        print_color $YELLOW "Press Enter to start the demonstration session, or Ctrl+C to exit..."
        read -r
    fi
    
    # Run the selected session
    run_session "$session_type"
    
    # Log execution end
    echo "─────────────────────────────────────────" >> "$LOG_FILE"
    echo "Demo execution completed at $(date)" >> "$LOG_FILE"
}

# Trap Ctrl+C and cleanup
trap 'print_color $YELLOW "\nDemo execution interrupted by user"; exit 130' INT

# Execute main function with all arguments
main "$@"