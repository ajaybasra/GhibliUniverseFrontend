#!/usr/bin/env bash
set -euo pipefail

echo "Deploying to $ENVIRONMENT..."
ktmpl ./ops/deployment/template.yaml -f "./ops/deployment/params/$ENVIRONMENT.yaml" --parameter imageTag ${BUILDKITE_COMMIT} | kubectl apply -f -
echo "Deployment completed successfully."
