#!/bin/bash
git add --all *
git commit -m "Commit @ $(date +%s)"
git push origin master
node ./tri.js
