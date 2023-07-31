#!/usr/bin/env bash
set -euo pipefail

local_image_name="docker.myob.com/future-makers-academy/${BUILDKITE_PIPELINE_NAME}"
image_suffix=${BUILDKITE_COMMIT}

if [ "$ENVIRONMENT" = "test" ]; then
  # Set the ENVIRONMENT build argument to 'test' when $ENVIRONMENT is 'test'
  echo "Building application for test environment"
  docker build -t "$local_image_name-test:$image_suffix" --build-arg name=test .

  echo "Pushing image to CloudSmith"
  docker push "${local_image_name}-test:$image_suffix"
else
  # Set the ENVIRONMENT build argument to 'production' for any other value of $ENVIRONMENT
  echo "Building application for production environment"
  docker build -t "$local_image_name-prod:$image_suffix" --build-arg name=production .

  echo "Pushing image to CloudSmith"
  docker push "$local_image_name-prod:$image_suffix"
fi
