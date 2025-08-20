#!/bin/bash

# Kubernetes Deployment Script for Swiss Open API Kundenbeziehung
# FAPI 2.0 Compliant Production Deployment

set -e  # Exit on any error

# Configuration
NAMESPACE="swiss-openapi-kundenbeziehung"
KUBECTL="kubectl"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    # Check if kubectl is installed
    if ! command -v $KUBECTL &> /dev/null; then
        log_error "kubectl is not installed or not in PATH"
        exit 1
    fi
    
    # Check if kubectl can connect to cluster
    if ! $KUBECTL cluster-info &> /dev/null; then
        log_error "Cannot connect to Kubernetes cluster. Check your kubeconfig."
        exit 1
    fi
    
    # Check if user has necessary permissions
    if ! $KUBECTL auth can-i create namespaces &> /dev/null; then
        log_warning "May not have permissions to create namespaces. Continuing anyway..."
    fi
    
    log_success "Prerequisites check completed"
}

# Function to create namespace
create_namespace() {
    log_info "Creating namespace: $NAMESPACE"
    
    if $KUBECTL get namespace $NAMESPACE &> /dev/null; then
        log_warning "Namespace $NAMESPACE already exists"
    else
        $KUBECTL apply -f "$SCRIPT_DIR/namespace.yaml"
        log_success "Namespace $NAMESPACE created"
    fi
}

# Function to validate secrets
validate_secrets() {
    log_info "Validating secrets configuration..."
    
    # Check if secrets file exists
    if [ ! -f "$SCRIPT_DIR/secrets/secrets.yaml" ]; then
        log_error "Secrets file not found: $SCRIPT_DIR/secrets/secrets.yaml"
        exit 1
    fi
    
    # Warning about default secrets
    log_warning "IMPORTANT: Ensure you have updated the secrets in secrets/secrets.yaml for production!"
    log_warning "Default secrets are for development only and MUST be changed in production."
    
    echo "Press Enter to continue or Ctrl+C to abort..."
    read
}

# Function to apply configuration
apply_config() {
    log_info "Applying configuration maps..."
    $KUBECTL apply -f "$SCRIPT_DIR/config/"
    log_success "Configuration applied"
}

# Function to apply secrets
apply_secrets() {
    log_info "Applying secrets..."
    $KUBECTL apply -f "$SCRIPT_DIR/secrets/"
    log_success "Secrets applied"
}

# Function to deploy MongoDB
deploy_mongodb() {
    log_info "Deploying MongoDB..."
    $KUBECTL apply -f "$SCRIPT_DIR/deployments/mongodb.yaml"
    
    # Wait for MongoDB to be ready
    log_info "Waiting for MongoDB to be ready..."
    $KUBECTL wait --for=condition=available --timeout=300s deployment/mongodb -n $NAMESPACE
    log_success "MongoDB deployed successfully"
}

# Function to deploy Redis
deploy_redis() {
    log_info "Deploying Redis..."
    $KUBECTL apply -f "$SCRIPT_DIR/deployments/redis.yaml"
    
    # Wait for Redis to be ready
    log_info "Waiting for Redis to be ready..."
    $KUBECTL wait --for=condition=available --timeout=300s deployment/redis -n $NAMESPACE
    log_success "Redis deployed successfully"
}

# Function to deploy API application
deploy_api() {
    log_info "Deploying API application..."
    $KUBECTL apply -f "$SCRIPT_DIR/deployments/api.yaml"
    
    # Wait for API to be ready
    log_info "Waiting for API application to be ready..."
    $KUBECTL wait --for=condition=available --timeout=600s deployment/swiss-openapi-api -n $NAMESPACE
    log_success "API application deployed successfully"
}

# Function to deploy Nginx
deploy_nginx() {
    log_info "Deploying Nginx reverse proxy..."
    $KUBECTL apply -f "$SCRIPT_DIR/deployments/nginx.yaml"
    
    # Wait for Nginx to be ready
    log_info "Waiting for Nginx to be ready..."
    $KUBECTL wait --for=condition=available --timeout=300s deployment/nginx -n $NAMESPACE
    log_success "Nginx deployed successfully"
}

# Function to apply services
apply_services() {
    log_info "Applying services..."
    $KUBECTL apply -f "$SCRIPT_DIR/services/"
    log_success "Services applied"
}

# Function to apply ingress
apply_ingress() {
    log_info "Applying ingress configuration..."
    $KUBECTL apply -f "$SCRIPT_DIR/ingress/"
    log_success "Ingress applied"
}

# Function to check deployment status
check_deployment_status() {
    log_info "Checking deployment status..."
    
    echo ""
    log_info "Deployment status:"
    $KUBECTL get deployments -n $NAMESPACE
    
    echo ""
    log_info "Service status:"
    $KUBECTL get services -n $NAMESPACE
    
    echo ""
    log_info "Pod status:"
    $KUBECTL get pods -n $NAMESPACE
    
    echo ""
    log_info "Ingress status:"
    $KUBECTL get ingress -n $NAMESPACE
}

# Function to get application URLs
get_application_urls() {
    log_info "Getting application URLs..."
    
    # Get LoadBalancer IP/hostname
    LB_IP=$(kubectl get service nginx -n $NAMESPACE -o jsonpath='{.status.loadBalancer.ingress[0].ip}' 2>/dev/null || echo "")
    LB_HOSTNAME=$(kubectl get service nginx -n $NAMESPACE -o jsonpath='{.status.loadBalancer.ingress[0].hostname}' 2>/dev/null || echo "")
    
    if [ -n "$LB_IP" ]; then
        log_success "Load Balancer IP: $LB_IP"
    elif [ -n "$LB_HOSTNAME" ]; then
        log_success "Load Balancer Hostname: $LB_HOSTNAME"
    else
        log_warning "Load Balancer not yet assigned external IP/hostname"
    fi
    
    echo ""
    log_info "Application endpoints (once DNS is configured):"
    echo "  • HTTPS API: https://api.kundenbeziehung.ch"
    echo "  • Health Check: https://api.kundenbeziehung.ch/health"
    echo "  • OpenID Discovery: https://api.kundenbeziehung.ch/.well-known/openid-configuration"
    echo "  • OAuth Authorization: https://api.kundenbeziehung.ch/authorize"
    echo "  • OAuth Token: https://api.kundenbeziehung.ch/token"
}

# Function to show post-deployment instructions
show_post_deployment_instructions() {
    echo ""
    log_info "Post-deployment instructions:"
    echo ""
    echo "1. DNS Configuration:"
    echo "   - Point api.kundenbeziehung.ch to your LoadBalancer IP/hostname"
    echo "   - Configure wildcard *.kundenbeziehung.ch if needed"
    echo ""
    echo "2. TLS Certificates:"
    echo "   - Update the TLS certificates in the 'tls-certificates' secret"
    echo "   - Use proper CA certificates for mTLS client verification"
    echo ""
    echo "3. Secrets Update:"
    echo "   - Update all secrets in the 'api-secrets' and 'mongodb-secrets'"
    echo "   - Use strong, randomly generated passwords"
    echo "   - Rotate JWT signing keys"
    echo ""
    echo "4. OAuth Client Registration:"
    echo "   - Register production OAuth clients with proper certificates"
    echo "   - Update client redirect URIs for production domains"
    echo ""
    echo "5. Monitoring Setup:"
    echo "   - Configure monitoring for all services"
    echo "   - Set up alerts for security events and errors"
    echo "   - Monitor certificate expiration"
    echo ""
    echo "6. Security Hardening:"
    echo "   - Review and adjust rate limiting settings"
    echo "   - Configure network policies if available"
    echo "   - Set up log aggregation for security monitoring"
    echo ""
    echo "7. Testing:"
    echo "   - Test OAuth flows with production client certificates"
    echo "   - Verify FAPI 2.0 compliance with security tools"
    echo "   - Perform load testing and security scanning"
}

# Function to show troubleshooting tips
show_troubleshooting() {
    echo ""
    log_info "Troubleshooting commands:"
    echo ""
    echo "Check pod logs:"
    echo "  kubectl logs -f deployment/swiss-openapi-api -n $NAMESPACE"
    echo "  kubectl logs -f deployment/mongodb -n $NAMESPACE"
    echo "  kubectl logs -f deployment/redis -n $NAMESPACE"
    echo "  kubectl logs -f deployment/nginx -n $NAMESPACE"
    echo ""
    echo "Check pod status:"
    echo "  kubectl describe pods -n $NAMESPACE"
    echo ""
    echo "Check service endpoints:"
    echo "  kubectl get endpoints -n $NAMESPACE"
    echo ""
    echo "Test internal connectivity:"
    echo "  kubectl exec -it deployment/swiss-openapi-api -n $NAMESPACE -- curl http://mongodb:27017"
    echo "  kubectl exec -it deployment/swiss-openapi-api -n $NAMESPACE -- redis-cli -h redis ping"
    echo ""
    echo "Check ingress status:"
    echo "  kubectl describe ingress -n $NAMESPACE"
}

# Main deployment function
main() {
    echo "======================================================"
    echo "Swiss Open API Kundenbeziehung - Kubernetes Deployment"
    echo "FAPI 2.0 Compliant Production Setup"
    echo "======================================================"
    echo ""
    
    check_prerequisites
    create_namespace
    validate_secrets
    apply_config
    apply_secrets
    apply_services
    deploy_mongodb
    deploy_redis
    deploy_api
    deploy_nginx
    apply_ingress
    
    echo ""
    log_success "Deployment completed successfully!"
    
    check_deployment_status
    get_application_urls
    show_post_deployment_instructions
    show_troubleshooting
}

# Handle script arguments
case "$1" in
    "deploy")
        main
        ;;
    "status")
        check_deployment_status
        ;;
    "urls")
        get_application_urls
        ;;
    "logs")
        SERVICE=${2:-"swiss-openapi-api"}
        kubectl logs -f deployment/$SERVICE -n $NAMESPACE
        ;;
    "cleanup")
        log_warning "This will delete the entire deployment. Are you sure? (y/N)"
        read -r response
        if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
            log_info "Deleting deployment..."
            kubectl delete namespace $NAMESPACE
            log_success "Deployment deleted"
        else
            log_info "Cleanup cancelled"
        fi
        ;;
    *)
        echo "Usage: $0 {deploy|status|urls|logs [service]|cleanup}"
        echo ""
        echo "Commands:"
        echo "  deploy  - Deploy the full application stack"
        echo "  status  - Check deployment status"
        echo "  urls    - Show application URLs"
        echo "  logs    - Show logs for a service (default: swiss-openapi-api)"
        echo "  cleanup - Delete the entire deployment"
        exit 1
        ;;
esac