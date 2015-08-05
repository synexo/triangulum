#!/bin/bash
LOG='/home/node/triangulum/logs/tri.log'
./node_modules/forever/bin/forever list | grep 'tri\.js' && ./stop.sh
case "$1" in
    "push")
        git add --all *
        git commit -m "Commit @ $(date +%s)"
        git push origin master
        ;;
esac
./node_modules/forever/bin/forever -a -l $LOG -o $LOG -e $LOG start tri.js
