#!/bin/bash
case "$1" in
    "push")
        git add --all *
        git commit -m "Commit @ $(date +%s)"
        git push origin master
        ;;
esac
./node_modules/forever/bin/forever start tri.js
