#!/bin/bash

serverpath=./server/dist
notsupported=" not supported yet, "
openissue="please open an issue on https://github.com/NERDDISCO/VisionLord/issues"
arch=none
if [ `uname -m` == 'x86_64' ]; then
  arch=64
else
  arch=32
fi

if [ $arch == 32 ]; then
  echo "32bit" $notsupported $openissue
  exit 0
fi

echo "Starting server on localhost"

case "$OSTYPE" in
  solaris*)
    echo "Solaris" $notsupported $openissue
  ;;

  darwin*)
    if [ $arch == 64 ]; then
      $serverpath/macOS_amd64/visionlord-server
    fi
  ;;

  linux*)
    if [ $arch == 64 ]; then
      $serverpath/linux_amd64/visionlord-server
    fi
  ;;

  bsd*)
    echo "BSD" $notsupported $openissue
  ;;

  msys*)
    if [ $arch == 64 ]; then
      $serverpath/windows_amd64/visionlord-server.exe
    fi
  ;;

  *)
    echo "unknown: $OSTYPE," $openissue
  ;;
esac
