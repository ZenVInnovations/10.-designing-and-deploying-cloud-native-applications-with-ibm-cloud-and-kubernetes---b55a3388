#!/bin/bash

# Login to IBM Cloud
ibmcloud login --apikey "${IBM_API_KEY}" --region us-south

# Target the IBM Cloud Container Registry
ibmcloud cr region-set us-south
ibmcloud cr login

# Build and push the Docker image
docker build -t us.icr.io/${IBM_PROJECT_NAME}/stockviz-backend:latest ./backend
docker push us.icr.io/${IBM_PROJECT_NAME}/stockviz-backend:latest

# Configure kubectl
ibmcloud ks cluster config --cluster ${CLUSTER_NAME}

# Apply Kubernetes configurations
kubectl apply -f backend/kubernetes/deployment.yaml
kubectl apply -f backend/kubernetes/service.yaml
kubectl apply -f backend/kubernetes/ingress.yaml