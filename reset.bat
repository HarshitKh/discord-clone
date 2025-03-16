@echo off
title Reset Chat Data
echo ===========================
echo    RESETTING CHAT DATA
echo ===========================

if exist chat.json (
    echo [] > chat.json
    echo ✅ chat.json has been reset.
) else (
    echo ⚠️ chat.json not found! Creating new one...
    echo [] > chat.json
)

if exist accounts.json (
    echo {} > accounts.json
    echo ✅ accounts.json has been reset.
) else (
    echo ⚠️ accounts.json not found! Creating new one...
    echo {} > accounts.json
)

if exist data\data.json (
    echo { "groups": ["Common Group"] } > data\data.json
    echo ✅ data.json has been reset.
) else (
    echo ⚠️ data.json not found! Creating new one...
    mkdir data
    echo { "groups": ["Common Group"] } > data\data.json
)

echo ======================================
echo     ALL CHAT & ACCOUNT DATA RESET 
echo ======================================
pause
