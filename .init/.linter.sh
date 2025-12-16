#!/bin/bash
cd /home/kavia/workspace/code-generation/timesheet-capture-webpage-222887-223129/timesheet_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

