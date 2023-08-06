#!/bin/bash

set -e
stage=$(echo $@ | cut -d ' ' -f 2)
app=$(echo $@ | cut -d ' ' -f 4)
event_type=$(echo $@ | cut -d ' ' -f 6)
echo " Testing stage: ${stage}"
echo "=>  ${app} - ${event_type} "
(cd cli/; STAGE=${stage} npx ts-node -T e2e-event.ts -t "${stage}.data" -s "com.vht.${app}.${stage}" -e ${event_type} -p '{"TESTING123": "testing"}')