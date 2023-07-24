#!/usr/bin/env bash
set -euo pipefail

ktmpl ./templates/template.yaml -f ./templates/default.yaml --parameter imageTag ${BUILDKITE_COMMIT} | kubectl apply -f -