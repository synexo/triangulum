#!/bin/bash
LOG='/home/node/triangulum/logs/tri.log'
DATE=$(date +%s)

case "$1" in
    "push")
        git add --all *
        git commit -m "Commit @ $DATE"
        git push origin master
        ;;
esac

rsync -av /home/node/triangulum/ /home/node/backups/$DATE >/dev/null

./node_modules/forever/bin/forever list | grep 'tri\.js' && ./stop.sh
./node_modules/forever/bin/forever -a -l $LOG -o $LOG -e $LOG start tri.js
tail -f logs/tri.log
