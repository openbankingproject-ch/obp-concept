# Kubernetes Deployment for Swiss Open API Kundenbeziehung

This directory contains Kubernetes manifests for deploying the Swiss Open API Kundenbeziehung implementation in production. The deployment is designed for high availability, security, and FAPI 2.0 compliance.

## Architecture Overview

```
Internet
    ↓
LoadBalancer Service (nginx)
    ↓
Nginx Pods (2 replicas)
    ↓
API Service (swiss-openapi-api)
    ↓
API Pods (3-10 replicas, auto-scaling)
    ↓ ↓ ↓
MongoDB    Redis    
```

## Components

### Core Services
- **API Application**: Node.js application with FAPI 2.0 OAuth implementation
- **MongoDB**: Document database for persistent storage
- **Redis**: In-memory cache for sessions and temporary data
- **Nginx**: Reverse proxy with mTLS and security headers

### Kubernetes Resources
- **Namespace**: Isolated environment for the application
- **Deployments**: Application workloads with health checks
- **Services**: Internal service discovery and load balancing
- **ConfigMaps**: Configuration management
- **Secrets**: Sensitive data management
- **Ingress**: External traffic routing with SSL termination
- **HPA**: Horizontal Pod Autoscaler for dynamic scaling
- **RBAC**: Role-based access control

## Directory Structure

```
k8s/
├── README.md                 # This documentation
├── deploy.sh                 # Deployment script
├── namespace.yaml            # Namespace definition
├── config/
│   └── configmap.yaml       # Application configuration
├── secrets/
│   └── secrets.yaml         # Sensitive configuration (UPDATE FOR PRODUCTION!)
├── deployments/
│   ├── api.yaml             # API application deployment
│   ├── mongodb.yaml         # MongoDB database deployment
│   ├── redis.yaml           # Redis cache deployment
│   └── nginx.yaml           # Nginx proxy deployment
├── services/
│   └── services.yaml        # All service definitions
└── ingress/
    └── ingress.yaml         # Ingress configuration with mTLS
```

## Quick Start

### Prerequisites

1. **Kubernetes Cluster**: Running Kubernetes 1.20+ cluster
2. **kubectl**: Configured to access your cluster
3. **Ingress Controller**: Nginx ingress controller or similar
4. **Storage**: Persistent volume support for MongoDB and Redis
5. **Load Balancer**: Cloud provider load balancer or similar

### Deployment

1. **Clone and Navigate**:
   ```bash
   cd /path/to/api/k8s
   ```

2. **Update Secrets** (CRITICAL):
   ```bash
   # Edit secrets/secrets.yaml and replace ALL default passwords
   vi secrets/secrets.yaml
   
   # Generate strong passwords
   openssl rand -base64 32  # For JWT_SECRET
   openssl rand -base64 24  # For database passwords
   ```

3. **Update TLS Certificates**:
   ```bash
   # Replace with your actual certificates in secrets/secrets.yaml
   # Base64 encode your certificates:
   base64 -w 0 your-certificate.crt
   base64 -w 0 your-private-key.key
   base64 -w 0 your-ca-certificate.crt
   ```

4. **Deploy**:
   ```bash
   ./deploy.sh deploy
   ```

5. **Check Status**:
   ```bash
   ./deploy.sh status
   ```

6. **Get URLs**:
   ```bash
   ./deploy.sh urls
   ```

## Configuration

### Environment-Specific Settings

#### Development
```bash
# Use smaller resource limits
# Single replica deployments
# Relaxed security settings
# Self-signed certificates OK
```

#### Staging
```bash
# Production-like resources
# Multi-replica deployments
# Production security settings
# Staging certificates
```

#### Production
```bash
# Full resource allocation
# High availability setup
# Strict security enforcement
# Production certificates
```

### Resource Requirements

#### Minimum Resources
- **API Pods**: 250m CPU, 512Mi RAM
- **MongoDB**: 250m CPU, 512Mi RAM, 20Gi storage
- **Redis**: 100m CPU, 256Mi RAM, 5Gi storage
- **Nginx**: 100m CPU, 128Mi RAM

#### Recommended Production
- **API Pods**: 1000m CPU, 2Gi RAM (3-10 replicas)
- **MongoDB**: 1000m CPU, 2Gi RAM, 100Gi SSD storage
- **Redis**: 500m CPU, 1Gi RAM, 20Gi SSD storage
- **Nginx**: 500m CPU, 512Mi RAM (2 replicas)

## Security Features

### FAPI 2.0 Compliance
- **mTLS Client Authentication**: Required for token endpoint
- **Certificate Validation**: Client certificate verification
- **DPoP Token Binding**: Proof-of-possession token binding
- **PAR Support**: Pushed Authorization Requests
- **Security Headers**: Comprehensive security headers
- **Rate Limiting**: Endpoint-specific rate limits

### Security Headers
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
- `Content-Security-Policy: default-src 'self'; ...`

### Network Security
- **TLS 1.2/1.3 Only**: Modern TLS configurations
- **Certificate Pinning**: Client certificate validation
- **Network Policies**: Pod-to-pod communication control (if supported)
- **Service Mesh**: Compatible with Istio/Linkerd for additional security

## Monitoring and Observability

### Health Checks
- **Liveness Probes**: Application health monitoring
- **Readiness Probes**: Traffic routing decisions
- **Startup Probes**: Slow initialization handling

### Metrics and Logging
- **Prometheus Integration**: Metrics scraping endpoints
- **Structured Logging**: JSON log format
- **Audit Logging**: Security event tracking
- **Request Tracing**: Correlation ID headers

### Monitoring Endpoints
- `/health` - Application health status
- `/metrics` - Prometheus metrics (if enabled)
- Nginx access/error logs for traffic analysis

## Scaling and High Availability

### Auto-scaling
- **Horizontal Pod Autoscaler**: CPU/Memory based scaling
- **Vertical Pod Autoscaler**: Resource optimization (optional)
- **Cluster Autoscaler**: Node scaling based on demand

### Load Balancing
- **Service Load Balancing**: Round-robin pod distribution
- **Ingress Load Balancing**: External traffic distribution
- **Session Affinity**: Disabled for stateless design

### Disaster Recovery
- **Multi-AZ Deployment**: Pod distribution across zones
- **Database Backups**: MongoDB backup strategies
- **Configuration Backup**: GitOps approach recommended

## Troubleshooting

### Common Issues

1. **Pods Not Starting**:
   ```bash
   kubectl describe pods -n swiss-openapi-kundenbeziehung
   kubectl logs -f deployment/swiss-openapi-api -n swiss-openapi-kundenbeziehung
   ```

2. **Service Connection Issues**:
   ```bash
   kubectl get endpoints -n swiss-openapi-kundenbeziehung
   kubectl exec -it deployment/swiss-openapi-api -- curl http://mongodb:27017
   ```

3. **Ingress Not Working**:
   ```bash
   kubectl describe ingress -n swiss-openapi-kundenbeziehung
   kubectl logs -f -n ingress-nginx deployment/nginx-ingress-controller
   ```

4. **Certificate Issues**:
   ```bash
   kubectl get secrets -n swiss-openapi-kundenbeziehung
   kubectl describe secret tls-certificates -n swiss-openapi-kundenbeziehung
   ```

### Debug Commands

```bash
# Check deployment status
./deploy.sh status

# View application logs
./deploy.sh logs swiss-openapi-api

# Check MongoDB logs
./deploy.sh logs mongodb

# Check Nginx logs
./deploy.sh logs nginx

# Get into API pod for debugging
kubectl exec -it deployment/swiss-openapi-api -n swiss-openapi-kundenbeziehung -- /bin/bash

# Test internal connectivity
kubectl exec -it deployment/swiss-openapi-api -n swiss-openapi-kundenbeziehung -- curl http://mongodb:27017
kubectl exec -it deployment/swiss-openapi-api -n swiss-openapi-kundenbeziehung -- redis-cli -h redis ping
```

## Production Checklist

### Before Deployment
- [ ] Update all secrets with production values
- [ ] Configure proper TLS certificates
- [ ] Set appropriate resource limits
- [ ] Configure monitoring and alerting
- [ ] Set up backup procedures
- [ ] Review security settings
- [ ] Configure DNS entries

### After Deployment
- [ ] Verify all pods are running
- [ ] Test OAuth flows with production certificates
- [ ] Verify FAPI 2.0 compliance
- [ ] Test auto-scaling behavior
- [ ] Verify backup procedures
- [ ] Set up monitoring dashboards
- [ ] Configure log aggregation
- [ ] Perform security scanning
- [ ] Load testing
- [ ] Document operational procedures

### Security Hardening
- [ ] Enable Pod Security Standards
- [ ] Configure Network Policies
- [ ] Set up RBAC with minimal permissions
- [ ] Enable audit logging
- [ ] Configure secrets encryption at rest
- [ ] Set up certificate rotation
- [ ] Configure intrusion detection
- [ ] Regular security updates

## Maintenance

### Regular Tasks
- **Certificate Rotation**: Monitor and rotate TLS certificates
- **Secret Rotation**: Regularly rotate passwords and keys
- **Security Updates**: Keep all components updated
- **Backup Verification**: Test backup and restore procedures
- **Performance Monitoring**: Monitor and optimize resource usage

### Upgrade Procedures
1. Test in staging environment
2. Create backup of current state
3. Update manifest files
4. Apply changes with rolling update
5. Verify functionality
6. Monitor for issues

## Support and Documentation

### Related Documentation
- [API Documentation](../README.md)
- [OAuth Implementation](../src/routes/oauth.js)
- [Security Features](../src/middleware/security.js)
- [Docker Compose Alternative](../docker-compose.yaml)

### Support Resources
- Kubernetes documentation: https://kubernetes.io/docs/
- FAPI 2.0 specification: https://openid.net/specs/fapi-2_0.html
- Nginx ingress controller: https://kubernetes.github.io/ingress-nginx/

For deployment-specific issues, check the troubleshooting section or review pod logs for detailed error information.