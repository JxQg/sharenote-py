#!/bin/sh

if [ -z "$(ls -A /sharenote-py/conf 2>/dev/null)" ]; then
    cp -R /defaults/conf/* /sharenote-py/conf/
fi

exec "$@"
