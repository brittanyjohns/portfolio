#!/bin/bash

set -e

stage=$(echo $@ | cut -d ' ' -f 2)

echo
echo "=== Building UI ==="
echo
yarn run build

echo "UI built successfully!"

echo
echo "=== Copying to S3 ==="
echo
aws s3 cp ./build/ s3://www.brittanyjohns.com/ --recursive

echo "UI copied to S3 successfully!"