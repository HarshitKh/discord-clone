@echo off
title Start Chat Server
echo ============================
echo    Starting Chat Server
echo ============================

if not exist node_modules (
    echo  Installing dependencies...
    npm install
)

npm start
pause
