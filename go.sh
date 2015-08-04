#!/bin/bash
git add *
git commit -m "Commit @ $(date +%s)"
git push origin master
node ./tri.js
